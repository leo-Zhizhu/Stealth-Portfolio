import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './Competitions.css';

export function Competitions() {
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, []);

  return (
    <div className="competitions-container">
      <div className="competitions-background-overlay"></div>
      
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <motion.div
          className="back-btn"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </motion.div>
      </Link>
      <motion.div 
        className="competitions-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Competitions</h1>
        <p>A showcase of competitive excellence and technical challenges.</p>
      </motion.div>
    </div>
  );
}
