import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Download, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Stats.css';
import resumeFile from '../../../../assets/resume.pdf';

export function Stats() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { label: 'View Resume', value: 'RESUME', type: 'resume' },
    { label: 'Academic History', value: 'EDUCATION', type: 'education' },
    { label: 'Happy Clients', value: '28' },
    { label: 'Open Source Commits', value: '1.2k' },
  ];

  return (
    <>
      <section className="stats-section">
        {stats.map((stat, i) => (
          stat.type === 'resume' ? (
            <div 
              key={i} 
              onClick={() => setIsPreviewOpen(true)}
              className="stat-card resume-card"
            >
              <div className="resume-content">
                <h3>{stat.value}</h3>
                <p>
                  {stat.label}
                  <Eye size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                </p>
              </div>
            </div>
          ) : stat.type === 'education' ? (
            <div 
              key={i} 
              onClick={() => navigate('/education')}
              className="stat-card education-card"
            >
              <div className="education-content">
                <h3>{stat.value}</h3>
                <p>
                  {stat.label}
                  <GraduationCap size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                </p>
              </div>
            </div>
          ) : (
            <div key={i} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          )
        ))}
      </section>


      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            className="resume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreviewOpen(false)}
          >
            <motion.div 
              className="resume-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>Resume Preview</h2>
                <div className="modal-actions">
                  <a href={resumeFile} download="Resume.pdf" className="modal-download-btn">
                    <Download size={18} />
                    Download
                  </a>
                  <button className="modal-close-btn" onClick={() => setIsPreviewOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <iframe 
                  src={`${resumeFile}#toolbar=0&navpanes=0`} 
                  title="Resume Preview"
                  className="resume-iframe"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
