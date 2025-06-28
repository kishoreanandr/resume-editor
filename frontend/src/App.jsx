import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import ResumeEditor from './components/ResumeEditor'
import './App.css'

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  // Smooth scroll handler for nav
  const handleNavClick = (e, target) => {
    e.preventDefault();
    setMobileNavOpen(false);
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const closeMenu = () => setMobileNavOpen(false)
    window.addEventListener('resize', closeMenu)
    window.addEventListener('scroll', closeMenu)
    return () => {
      window.removeEventListener('resize', closeMenu)
      window.removeEventListener('scroll', closeMenu)
    }
  }, [])

  return (
    <div className="website-container">
      <Navbar mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} handleNavClick={handleNavClick} />
      <HeroSection />
      <FeaturesSection />
      <ResumeEditor />
      <AboutSection />
      <Footer />
    </div>
  )
}

export default App