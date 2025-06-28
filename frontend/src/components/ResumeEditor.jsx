import { useState } from 'react';
import axios from 'axios';
import { FaUpload, FaUserEdit, FaDownload, FaArrowLeft } from 'react-icons/fa';
import Stepper from './Stepper';
import styles from '../styles/ResumeEditor.module.css';

const defaultResume = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  linkedin: 'linkedin.com/in/johndoe',
  summary: 'Experienced developer with a passion for building impactful software.',
  experience: [
    { company: 'Company A', role: 'Developer', years: '2019-2022' },
  ],
  experienceSummary: 'Worked on various projects, collaborating with teams to deliver high-quality software.',
  education: [
    { school: 'University X', degree: 'B.Sc. Computer Science', years: '2015-2019' },
  ],
  educationSummary: 'Studied core computer science concepts and participated in extracurricular activities.',
  projects: [
    { name: 'E-commerce Platform', description: 'Built a full-stack e-commerce solution', tech: 'React, Node.js, MongoDB', link: 'github.com/johndoe/ecommerce' },
  ],
  certifications: [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023' },
  ],
  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'Spanish', proficiency: 'Intermediate' },
  ],
  skills: ['JavaScript', 'React', 'Python'],
  references: [
    { name: 'Jane Smith', title: 'Senior Developer', company: 'Tech Corp', email: 'jane.smith@techcorp.com' },
  ],
};

const steps = [
  { label: 'Upload', icon: <FaUpload /> },
  { label: 'Edit', icon: <FaUserEdit /> },
];

const ResumeEditor = () => {
  const [resume, setResume] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // ...handlers (upload, edit, enhance, save, download, etc.)
  // (Copy logic from App.jsx, but use styles from ResumeEditor.module.css)

  // Mock upload handler
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
      setUploadError('Only .pdf or .docx files are supported (mocked).');
      return;
    }
    setUploadError('');
    setResume(defaultResume);
    setStep(1);
    setSaved(false);
    setDownloaded(false);
  };

  const handleFieldChange = (field, value) => {
    setResume({ ...resume, [field]: value });
  };

  const handleListChange = (section, idx, key, value) => {
    const updated = resume[section].map((item, i) =>
      i === idx ? { ...item, [key]: value } : item
    );
    setResume({ ...resume, [section]: updated });
  };

  const handleSkillChange = (idx, value) => {
    const updated = resume.skills.map((s, i) => (i === idx ? value : s));
    setResume({ ...resume, skills: updated });
  };

  const addEntry = (section, emptyObj) => {
    setResume({ ...resume, [section]: [...resume[section], emptyObj] });
  };

  const removeEntry = (section, idx) => {
    setResume({ ...resume, [section]: resume[section].filter((_, i) => i !== idx) });
  };

  const enhanceSection = async (section) => {
    let content;
    if (section === 'skills') content = resume.skills.join(', ');
    else content = resume[section];
    try {
      const res = await axios.post('http://127.0.0.1:8000/ai-enhance', { section, content });
      let improved = res.data.improved_content;
      if (section === 'skills') {
        improved = improved.replace('[Enhanced] ', '').split(',').map(s => s.trim());
      }
      setResume({ ...resume, [section]: improved });
    } catch (error) {
      let mockImproved = `[Enhanced] ${content}`;
      if (section === 'skills') {
        mockImproved = `[Enhanced] ${content}, Teamwork, Problem Solving`.split(',').map(s => s.trim());
      } else if (section === 'summary') {
        mockImproved = `Highly skilled and motivated software developer with a proven track record of building impactful software solutions. Proficient in modern web technologies and agile methodologies, dedicated to delivering high-quality, scalable applications.`;
      } else if (section === 'experienceSummary') {
        mockImproved = `Led diverse projects, collaborating effectively with cross-functional teams to design, develop, and deploy high-quality, scalable software solutions. Consistently met and exceeded project goals by applying strong technical expertise and problem-solving skills.`;
      } else if (section === 'educationSummary') {
        mockImproved = `Acquired a robust foundation in core computer science principles, excelling in theoretical and practical applications. Actively participated in various extracurricular activities, enhancing leadership and collaborative skills while maintaining academic excellence.`;
      } else if (section === 'name') {
        mockImproved = content;
      }
      setResume({ ...resume, [section]: mockImproved });
    }
  };

  const saveResume = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/save-resume', { resume });
      if (response.data.status === 'success') {
        setSaveMsg('Resume saved successfully!');
        setSaved(true);
      } else {
        setSaveMsg('Failed to save resume.');
      }
    } catch (error) {
      console.error('Save error:', error);
      if (error.code === 'ERR_NETWORK') {
        setSaveMsg('Backend server not running. Please start the server.');
      } else if (error.response) {
        setSaveMsg(`Server error: ${error.response.status}`);
      } else {
        setSaveMsg('Failed to save resume. Please try again.');
      }
    }
    setSaving(false);
  };

  const downloadResume = () => {
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.json';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const goBack = () => {
    setStep(0);
    setResume(null);
    setSaved(false);
    setDownloaded(false);
    setSaveMsg('');
    setUploadError('');
  };

  return (
    <section className={styles.appSection}>
      <div className="container">
        <h2 className="section-title">Resume Editor</h2>
        <div className={styles.mainBg}>
          <Stepper steps={steps} step={step} saved={saved} />
          {step === 0 && (
            <div className={styles.startCard}>
              <div className={styles.startGraphic}>
                <div className={styles.circleMain}></div>
                <div className={styles.circleAccent}></div>
                <div className={styles.circleDot}></div>
              </div>
              <h2>Welcome to Resume Editor</h2>
              <p className={styles.subtitle}>Upload your resume to get started</p>
              <label htmlFor="upload-btn" className={styles.uploadLabel}>
                <FaUpload className={styles.uploadIcon} /> Choose File
              </label>
              <input id="upload-btn" type="file" accept=".pdf,.docx" onChange={handleUpload} style={{ display: 'none' }} />
              {uploadError && <div className={styles.uploadError}>{uploadError}</div>}
            </div>
          )}
          {step === 1 && resume && (
            <>
              <div className={styles.backButtonContainer}>
                <button className={styles.backBtn} onClick={goBack}>
                  <FaArrowLeft style={{ marginRight: '8px' }} />
                  Back to Upload
                </button>
              </div>
              <div className={styles.topSectionCard}>
                <label>Name</label>
                <div className={styles.inputWithButton}>
                  <input type="text" value={resume.name} onChange={e => handleFieldChange('name', e.target.value)} />
                  <button className={styles.enhanceBtn} onClick={() => enhanceSection('name')}>Enhance with AI</button>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className={styles.topSectionCard}>
                <label>Contact Information</label>
                <div className={styles.entry}>
                  <input placeholder="Email" value={resume.email} onChange={e => handleFieldChange('email', e.target.value)} />
                  <input placeholder="Phone" value={resume.phone} onChange={e => handleFieldChange('phone', e.target.value)} />
                </div>
                <div className={styles.entry}>
                  <input placeholder="Location" value={resume.location} onChange={e => handleFieldChange('location', e.target.value)} />
                  <input placeholder="LinkedIn" value={resume.linkedin} onChange={e => handleFieldChange('linkedin', e.target.value)} />
                </div>
              </div>
              
              <div className={styles.topSectionCard}>
                <label>Summary</label>
                <div className={styles.textareaWithButton}>
                  <textarea value={resume.summary} onChange={e => handleFieldChange('summary', e.target.value)} />
                  <button className={styles.enhanceBtn} onClick={() => enhanceSection('summary')}>Enhance with AI</button>
                </div>
              </div>
              <div className={styles.topSectionCard}>
                <label>Experience</label>
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className={styles.entry}>
                    <input placeholder="Company" value={exp.company} onChange={e => handleListChange('experience', idx, 'company', e.target.value)} />
                    <input placeholder="Role" value={exp.role} onChange={e => handleListChange('experience', idx, 'role', e.target.value)} />
                    <input placeholder="Years" value={exp.years} onChange={e => handleListChange('experience', idx, 'years', e.target.value)} />
                    <button onClick={() => removeEntry('experience', idx)}>-</button>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => addEntry('experience', { company: '', role: '', years: '' })}>Add Experience</button>
                <div className={styles.sectionSummary}>
                  <label>What you did in your experience (overall):</label>
                  <div className={styles.textareaWithButton}>
                    <textarea
                      value={resume.experienceSummary}
                      onChange={e => handleFieldChange('experienceSummary', e.target.value)}
                      placeholder="Describe your overall experience, achievements, or responsibilities."
                    />
                    <button className={styles.enhanceBtn} onClick={() => enhanceSection('experienceSummary')}>Enhance with AI</button>
                  </div>
                </div>
              </div>
              <div className={styles.topSectionCard}>
                <label>Education</label>
                {resume.education.map((edu, idx) => (
                  <div key={idx} className={styles.entry}>
                    <input placeholder="School" value={edu.school} onChange={e => handleListChange('education', idx, 'school', e.target.value)} />
                    <input placeholder="Degree" value={edu.degree} onChange={e => handleListChange('education', idx, 'degree', e.target.value)} />
                    <input placeholder="Years" value={edu.years} onChange={e => handleListChange('education', idx, 'years', e.target.value)} />
                    <button onClick={() => removeEntry('education', idx)}>-</button>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => addEntry('education', { school: '', degree: '', years: '' })}>Add Education</button>
                <div className={styles.sectionSummary}>
                  <label>What you did in your education (overall):</label>
                  <div className={styles.textareaWithButton}>
                    <textarea
                      value={resume.educationSummary}
                      onChange={e => handleFieldChange('educationSummary', e.target.value)}
                      placeholder="Describe your overall education, focus, or achievements."
                    />
                    <button className={styles.enhanceBtn} onClick={() => enhanceSection('educationSummary')}>Enhance with AI</button>
                  </div>
                </div>
              </div>
              <div className={styles.topSectionCard}>
                <label>Skills</label>
                {resume.skills.map((skill, idx) => (
                  <div key={idx} className={styles.entry}>
                    <input value={skill} onChange={e => handleSkillChange(idx, e.target.value)} />
                    <button onClick={() => removeEntry('skills', idx)}>-</button>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => addEntry('skills', '')}>Add Skill</button>
                <button className={styles.enhanceBtn} style={{marginLeft: '10px'}} onClick={() => enhanceSection('skills')}>Enhance with AI</button>
              </div>
              
              {/* Projects Section */}
              <div className={styles.topSectionCard}>
                <label>Projects</label>
                {resume.projects.map((project, idx) => (
                  <div key={idx} className={styles.entry}>
                    <input placeholder="Project Name" value={project.name} onChange={e => handleListChange('projects', idx, 'name', e.target.value)} />
                    <input placeholder="Description" value={project.description} onChange={e => handleListChange('projects', idx, 'description', e.target.value)} />
                    <input placeholder="Technologies" value={project.tech} onChange={e => handleListChange('projects', idx, 'tech', e.target.value)} />
                    <input placeholder="Link" value={project.link} onChange={e => handleListChange('projects', idx, 'link', e.target.value)} />
                    <button onClick={() => removeEntry('projects', idx)}>-</button>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => addEntry('projects', { name: '', description: '', tech: '', link: '' })}>Add Project</button>
              </div>
              
              {/* Certifications Section */}
              <div className={styles.topSectionCard}>
                <label>Certifications</label>
                {resume.certifications.map((cert, idx) => (
                  <div key={idx} className={styles.entry}>
                    <input placeholder="Certification Name" value={cert.name} onChange={e => handleListChange('certifications', idx, 'name', e.target.value)} />
                    <input placeholder="Issuing Organization" value={cert.issuer} onChange={e => handleListChange('certifications', idx, 'issuer', e.target.value)} />
                    <input placeholder="Year" value={cert.year} onChange={e => handleListChange('certifications', idx, 'year', e.target.value)} />
                    <button onClick={() => removeEntry('certifications', idx)}>-</button>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => addEntry('certifications', { name: '', issuer: '', year: '' })}>Add Certification</button>
              </div>
              
              {/* Languages Section */}
              <div className={styles.topSectionCard}>
                <label>Languages</label>
                {resume.languages.map((lang, idx) => (
                  <div key={idx} className={styles.entry}>
                    <input placeholder="Language" value={lang.language} onChange={e => handleListChange('languages', idx, 'language', e.target.value)} />
                    <input placeholder="Proficiency" value={lang.proficiency} onChange={e => handleListChange('languages', idx, 'proficiency', e.target.value)} />
                    <button onClick={() => removeEntry('languages', idx)}>-</button>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => addEntry('languages', { language: '', proficiency: '' })}>Add Language</button>
              </div>
              
              {/* References Section */}
              <div className={styles.topSectionCard}>
                <label>References</label>
                {resume.references.map((ref, idx) => (
                  <div key={idx} className={styles.entry}>
                    <input placeholder="Name" value={ref.name} onChange={e => handleListChange('references', idx, 'name', e.target.value)} />
                    <input placeholder="Title" value={ref.title} onChange={e => handleListChange('references', idx, 'title', e.target.value)} />
                    <input placeholder="Company" value={ref.company} onChange={e => handleListChange('references', idx, 'company', e.target.value)} />
                    <input placeholder="Email" value={ref.email} onChange={e => handleListChange('references', idx, 'email', e.target.value)} />
                    <button onClick={() => removeEntry('references', idx)}>-</button>
                  </div>
                ))}
                <button className={styles.addBtn} onClick={() => addEntry('references', { name: '', title: '', company: '', email: '' })}>Add Reference</button>
              </div>
              
              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={saveResume} disabled={saving}>Save Resume</button>
                {saveMsg && <span className={styles.saveMessage}>{saveMsg}</span>}
                {saved && (
                  <button className={styles.downloadBtn} onClick={downloadResume}>
                    <FaDownload style={{ marginRight: '8px' }} />
                    Download as JSON
                  </button>
                )}
                {downloaded && <span className={styles.downloadMessage}>Downloaded!</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeEditor; 