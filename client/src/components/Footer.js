import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Association for Education and Artificial Intelligence - dedicated to free education in programming and AI.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/volunteer">Become a Volunteer</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Email: contact@aeia.ro</li>
            <li>Tel: +40 XXX XXX XXX</li>
            <li>Bucharest, Romania</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Association for Education and Artificial Intelligence. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 