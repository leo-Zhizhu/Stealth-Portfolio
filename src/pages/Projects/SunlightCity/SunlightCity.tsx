import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SunlightCity.css';

export function SunlightCity() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-detail-page sunlight-city"
    >
      <div className="project-hero">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hero-content"
        >
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1>Sunlight City</h1>
          <p className="lead">Large scale dynamic simulation & data processing pipeline</p>
          <div className="project-meta">
            <div className="meta-item">
              <span className="label">Role</span>
              <span className="value">Lead Architect</span>
            </div>
            <div className="meta-item">
              <span className="label">Timeline</span>
              <span className="value">2025 - Present</span>
            </div>
            <div className="meta-item">
              <span className="label">Tech Stack</span>
              <span className="value">C++, Python, CUDA, React</span>
            </div>
          </div>
        </motion.div>
        <div className="hero-image-container">
          <img src="/assets/projects/sunlightcity.png" alt="Sunlight City Preview" />
        </div>
      </div>

      <div className="project-body">
        <section className="overview">
          <h2>Overview</h2>
          <p>
            Sunlight City is a state-of-the-art urban simulation platform designed to address the complexities 
            of modern smart cities. By leveraging high-performance computing and real-time data processing, 
            the system provides urban planners with actionable insights into energy consumption, traffic 
            patterns, and environmental impact.
          </p>
        </section>

        <section className="key-features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Dynamic Simulation</h3>
              <p>Real-time physics-based simulation of urban environments with support for millions of active agents.</p>
            </div>
            <div className="feature-card">
              <h3>Data Pipeline</h3>
              <p>A robust ETL pipeline capable of processing gigabytes of sensor data per second with sub-millisecond latency.</p>
            </div>
            <div className="feature-card">
              <h3>GPU Acceleration</h3>
              <p>Custom CUDA kernels for massive parallelization of spatial queries and environmental modeling.</p>
            </div>
          </div>
        </section>

        <section className="visuals">
          <div className="visual-placeholder">
            {/* Additional project images or interactive demos would go here */}
            <p>Interactive Visualization Interface coming soon...</p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
