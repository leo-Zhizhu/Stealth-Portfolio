import { motion } from 'framer-motion';
import './FeaturedProject.css';

export function FeaturedProject({ variants }: { variants: any }) {
  return (
    <motion.div 
      variants={variants} 
      className="stat-card featured-project-card"
    >
      <div className="featured-project-content">
        <h3>FEATURED PROJECT</h3>
        <p>An overview of the most recent and impactful project, taking up a larger grid space.</p>
        <div className="featured-project-tag">LATEST WORK</div>
      </div>
    </motion.div>
  );
}
