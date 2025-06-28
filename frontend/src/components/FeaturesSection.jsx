import { FaUpload, FaCode, FaUsers, FaRocket } from 'react-icons/fa';

const FeaturesSection = () => (
  <section className="features-section" id="features">
    <div className="container">
      <h2 className="section-title">Why Choose ResumeCraft?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <FaUpload className="feature-icon" />
          <h3>Easy Upload</h3>
          <p>Upload your existing resume in PDF or DOCX format and let our system parse it automatically.</p>
        </div>
        <div className="feature-card">
          <FaCode className="feature-icon" />
          <h3>AI Enhancement</h3>
          <p>Our advanced AI technology enhances your content with professional language and industry-specific keywords.</p>
        </div>
        <div className="feature-card">
          <FaUsers className="feature-icon" />
          <h3>Professional Templates</h3>
          <p>Choose from a variety of professional templates designed to impress recruiters and hiring managers.</p>
        </div>
        <div className="feature-card">
          <FaRocket className="feature-icon" />
          <h3>Instant Download</h3>
          <p>Download your enhanced resume instantly in multiple formats ready for job applications.</p>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturesSection; 