import { FaFileAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ mobileNavOpen, setMobileNavOpen, handleNavClick }) => (
  <nav className="navbar">
    <div className="nav-container">
      <div className="nav-logo">
        <FaFileAlt className="logo-icon" />
        <span className="logo-text">ResumeCraft</span>
      </div>
      <div className="nav-links desktop-nav">
        <a href="#home" className="nav-link" onClick={e => handleNavClick(e, 'home')}>Home</a>
        <a href="#features" className="nav-link" onClick={e => handleNavClick(e, 'features')}>Features</a>
        <a href="#about" className="nav-link" onClick={e => handleNavClick(e, 'about')}>About</a>
        <a href="#contact" className="nav-link" onClick={e => handleNavClick(e, 'contact')}>Contact</a>
      </div>
      <button className="hamburger" aria-label="Open navigation" onClick={() => setMobileNavOpen(v => !v)}>
        {mobileNavOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
    <div className={`mobile-nav-drawer${mobileNavOpen ? ' open' : ''}`}> 
      <a href="#home" className="nav-link" onClick={e => handleNavClick(e, 'home')}>Home</a>
      <a href="#features" className="nav-link" onClick={e => handleNavClick(e, 'features')}>Features</a>
      <a href="#about" className="nav-link" onClick={e => handleNavClick(e, 'about')}>About</a>
      <a href="#contact" className="nav-link" onClick={e => handleNavClick(e, 'contact')}>Contact</a>
    </div>
  </nav>
);

export default Navbar; 