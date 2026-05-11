import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './NebulaFlow.css';

export function NebulaFlow() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-detail-page nebula-flow"
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
          <h1>Nebula Flow</h1>
          <p className="lead">Distributed stream processing engine</p>
          <div className="project-meta">
            <div className="meta-item">
              <span className="label">Role</span>
              <span className="value">Backend Engineer</span>
            </div>
            <div className="meta-item">
              <span className="label">Timeline</span>
              <span className="value">2024 - 2025</span>
            </div>
            <div className="meta-item">
              <span className="label">Tech Stack</span>
              <span className="value">Go, Kubernetes, Redis</span>
            </div>
          </div>
        </motion.div>
        <div className="hero-image-container">
          <img src="/assets/projects/nebulaflow.png" alt="Nebula Flow Preview" />
        </div>
      </div>

      <div className="project-body">
        <section className="overview">
          <h2>Overview</h2>
          <p>
            Nebula Flow is a high-performance stream processing engine designed for real-time data analytics. 
            It enables seamless data ingestion and transformation across distributed clusters, 
            ensuring high availability and fault tolerance.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
