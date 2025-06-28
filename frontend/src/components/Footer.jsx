import { FaGithub, FaLinkedin, FaEnvelope, FaCode } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ResumeCraft</h3>
          <p>Professional resume editing made simple and effective.</p>
        </div>
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="https://github.com/kishoreanandr" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/kishoreanandr" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
            <a href="https://leetcode.com/u/kishoreanand21/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaCode />
            </a>
            <a href="mailto:kishoreanand.r@gmail.com" className="social-link">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ResumeCraft. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer; 