import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './QuantumVision.css';

export function QuantumVision() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-detail-page quantum-vision"
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
          <h1>Quantum Vision</h1>
          <p className="lead">AI-powered medical imaging diagnostics</p>
          <div className="project-meta">
            <div className="meta-item">
              <span className="label">Role</span>
              <span className="value">ML Researcher</span>
            </div>
            <div className="meta-item">
              <span className="label">Timeline</span>
              <span className="value">2023 - 2024</span>
            </div>
            <div className="meta-item">
              <span className="label">Tech Stack</span>
              <span className="value">PyTorch, AWS, TypeScript</span>
            </div>
          </div>
        </motion.div>
        <div className="hero-image-container">
          <img src="/assets/projects/quantumvision.png" alt="Quantum Vision Preview" />
        </div>
      </div>

      <div className="project-body">
        <section className="overview">
          <h2>Overview</h2>
          <p>
            Quantum Vision utilizes deep learning to assist radiologists in identifying early signs 
            of neurological conditions. The platform provides automated segmentation and risk 
            assessment tools to improve diagnostic accuracy.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
