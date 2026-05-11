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
      className="featured-project-card folder-layout"
      onClick={handleProjectClick}
    >
      <div 
        className="folder-back"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${currentProject.backgroundMap})` 
        }}
      ></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="folder-inner-content"
        >
          <div className="project-image-wrapper">
            <img src={currentProject.image} alt={currentProject.title} className="project-peek-image" />
          </div>
          
          <div className="folder-front">
            <div className="folder-tab"></div>
            <div className="folder-glass-cover">
              <div className="folder-text-content">
                <div className="folder-header">
                  <h3>FEATURED PROJECT</h3>
                  <div className="project-counter">
                    {currentIndex + 1} / {projects.length}
                  </div>
                </div>
                
                <div className="folder-main-info">
                  <h2>{currentProject.title}</h2>
                  <p className="subtitle">{currentProject.subtitle}</p>
                  <div className="folder-tags">
                    {currentProject.tags.map(tag => (
                      <span key={tag} className="folder-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="slider-dots folder-dots">
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
