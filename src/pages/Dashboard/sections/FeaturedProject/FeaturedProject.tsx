import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../../../data/projects';
import './FeaturedProject.css';

export function FeaturedProject({ variants }: { variants: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const currentProject = projects[currentIndex];

  const handleProjectClick = () => {
    navigate(currentProject.path);
  };

  return (
    <motion.div 
      variants={variants} 
      className="stat-card featured-project-card"
      onClick={handleProjectClick}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="featured-project-container"
        >
          <div 
            className="featured-project-bg" 
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${currentProject.image})` 
            }} 
          />
          <div className="featured-project-content">
            <div className="featured-project-header">
              <h3>FEATURED PROJECT</h3>
              <div className="featured-project-tag" style={{ backgroundColor: currentProject.color }}>
                {currentIndex + 1} / {projects.length}
              </div>
            </div>
            
            <div className="featured-project-info">
              <h2>{currentProject.title}</h2>
              <p className="subtitle">{currentProject.subtitle}</p>
              <div className="tags">
                {currentProject.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="slider-dots">
        {projects.map((_, index) => (
          <div 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
