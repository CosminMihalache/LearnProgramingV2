import React from 'react';
import './AILabPage.css';

const AILabPage = () => {
  return (
    <div className="ailab-page">
      <div className="ailab-hero">
        <h1>AI Lab Research & Development</h1>
        <p>Exploring the frontiers of artificial intelligence to create transformative solutions</p>
      </div>

      <section className="ailab-section">
        <h2>Our Research Focus</h2>
        <div className="research-areas">
          <div className="research-card">
            <h3>Natural Language Processing</h3>
            <p>Advancing communication between humans and machines through sophisticated language understanding and generation.</p>
            <ul>
              <li>Sentiment analysis for social impact</li>
              <li>Multilingual translation systems</li>
              <li>Educational content generation</li>
            </ul>
          </div>

          <div className="research-card">
            <h3>Computer Vision</h3>
            <p>Teaching machines to interpret and understand the visual world to solve real-world problems.</p>
            <ul>
              <li>Environmental monitoring systems</li>
              <li>Accessibility tools for the visually impaired</li>
              <li>Educational image recognition</li>
            </ul>
          </div>

          <div className="research-card">
            <h3>Ethical AI</h3>
            <p>Ensuring AI development prioritizes human values, fairness, and transparency.</p>
            <ul>
              <li>Bias detection and mitigation frameworks</li>
              <li>Privacy-preserving machine learning</li>
              <li>Open-source model governance</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="ailab-section dark">
        <h2>Innovation Projects</h2>
        <div className="projects-grid">
          <div className="project-item">
            <h3>AIEdu Assistant</h3>
            <p>An intelligent tutoring system that adapts to individual learning styles and provides personalized education paths.</p>
            <div className="project-status">Status: Beta Testing</div>
          </div>

          <div className="project-item">
            <h3>Code Companion</h3>
            <p>AI-powered programming assistant that helps beginners learn to code through contextual suggestions and real-time feedback.</p>
            <div className="project-status">Status: Development</div>
          </div>

          <div className="project-item">
            <h3>Community Knowledge Graph</h3>
            <p>A collaborative intelligence system that connects educational resources and community expertise.</p>
            <div className="project-status">Status: Research Phase</div>
          </div>

          <div className="project-item">
            <h3>Accessible AI Toolkit</h3>
            <p>Open-source tools designed to make AI development accessible to underrepresented communities.</p>
            <div className="project-status">Status: Active Release</div>
          </div>
        </div>
      </section>

      <section className="ailab-section">
        <h2>Collaborate With Us</h2>
        <div className="collaboration-options">
          <div className="collab-card">
            <h3>Research Partnerships</h3>
            <p>We're open to collaborations with academic institutions, non-profits, and industry partners who share our vision for responsible AI innovation.</p>
            <button className="collab-button">Contact Research Team</button>
          </div>

          <div className="collab-card">
            <h3>Open Source Contributions</h3>
            <p>Many of our projects are open source. Join our community of contributors and help shape the future of AI technology.</p>
            <button className="collab-button">Explore GitHub</button>
          </div>

          <div className="collab-card">
            <h3>Student Internships</h3>
            <p>We offer internship opportunities for students passionate about AI and its applications in education and social good.</p>
            <button className="collab-button">Apply Now</button>
          </div>
        </div>
      </section>

      <section className="ailab-section vision">
        <h2>Our Vision for AI</h2>
        <blockquote>
          "We believe in developing AI that empowers people, expands human potential, and creates educational opportunities for everyone, regardless of background or circumstance."
        </blockquote>
        <p>At our AI Lab, we're committed to research that has meaningful social impact. We prioritize projects that bridge the digital divide, enhance educational access, and create tools that serve humanity's greatest needs.</p>
      </section>
    </div>
  );
};

export default AILabPage;
