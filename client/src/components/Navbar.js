import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Association for Education and Artificial Intelligence</Link>
      </div>
      
      <button className="burger-menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/courses" className="nav-link courses-button" onClick={() => setIsOpen(false)}>Courses</Link>
        <Link to="/ai-lab" className="nav-link ai-lab-button" onClick={() => setIsOpen(false)}>AI Lab</Link>
      </div>
    </nav>
  );
};

export default Navbar;