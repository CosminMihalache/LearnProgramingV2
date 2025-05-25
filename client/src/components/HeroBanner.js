import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <img 
        src="/images/ai-education-banner.webp" 
        alt="AI Education Banner"
        className="hero-image"
      />
      <div className="hero-content">
        <h1>Build the future with us – Free Learning in Programming and Artificial Intelligence</h1>
        <p>Master modern programming skills with our comprehensive courses</p>
      </div>
    </div>
  );
};

export default HeroBanner; 