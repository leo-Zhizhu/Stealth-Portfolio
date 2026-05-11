import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Download, X, Eye, Mail, Phone, ExternalLink, Code, Briefcase } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import './Stats.css';
import resumeFile from '../../../../assets/resume.pdf';
import bannerImg from '../../../../assets/background/banner1.jpg';
import banner2Img from '../../../../assets/background/banner2.jpg';

const GithubIcon = ({ size = 24 }: { size?: number }) => (

  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Stats() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const navigate = useNavigate();

  const experiences = [
    { role: 'ML Engineer Intern', company: 'Bonsai Robotics', date: 'June 2026 - Sept 2026' },
    { role: 'Software Engineer', company: 'Ginlix AI', date: 'Nov 2025 - Present' },
    { role: 'Software Subteam Member', company: 'CUAUV', date: 'Oct 2025 - Present' },
    { role: 'Software Mentor', company: 'FRC 8015', date: 'Sept 2024 - Aug 2025' },
    { role: 'Team Captain & Lead Programmer', company: 'FRC 8015', date: 'May 2023 - Sept 2024' },
  ];

  const stats = [
    { label: 'View Resume', value: 'RESUME', type: 'resume' },
    { label: 'Academic History', value: 'EDUCATION', type: 'education' },
    { label: 'Connection', type: 'connection' },
    { label: 'Professional Path', value: 'EXPERIENCES', type: 'experience' },
    { label: 'Featured Project', value: 'FEATURED PROJECT', type: 'featured-project' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <>
      <motion.section 
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, i) => (
          stat.type === 'resume' ? (
            <motion.div 
              key={i} 
              variants={itemVariants}
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
            </motion.div>
          ) : stat.type === 'education' ? (
            <motion.div 
              key={i} 
              variants={itemVariants}
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
            </motion.div>
          ) : stat.type === 'connection' ? (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="stat-card connection-card"
              style={{ 
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <h3>{stat.value || 'CONNECT'}</h3>
              <div className="connection-list-vertical">
                <a href="mailto:zhizhu0730@gmail.com" className="conn-item">
                  <div className="conn-icon"><Mail size={18} /></div>
                  <span>zhizhu0730@gmail.com</span>
                </a>
                <a href="tel:6073794513" className="conn-item">
                  <div className="conn-icon"><Phone size={18} /></div>
                  <span>+1 (607) 379-4513</span>
                </a>
                <a href="https://www.linkedin.com/in/zhu-zhi-506499376/" target="_blank" rel="noopener noreferrer" className="conn-item">
                  <div className="conn-icon"><LinkedinIcon size={18} /></div>
                  <span>LinkedIn Profile</span>
                </a>
                <a href="https://github.com/leo-Zhizhu" target="_blank" rel="noopener noreferrer" className="conn-item">
                  <div className="conn-icon"><GithubIcon size={18} /></div>
                  <span>@leo-Zhizhu</span>
                </a>
              </div>
            </motion.div>
          ) : stat.type === 'experience' ? (
            <motion.div key={i} variants={itemVariants} className="stat-card experience-card">
              <div 
                className="exp-bg-overlay"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${banner2Img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <h3>{stat.value}</h3>
              <div className="timeline">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <div className="exp-role">{exp.role}</div>
                      <div className="exp-company">
                        <Briefcase size={12} style={{ marginRight: '4px' }} />
                        {exp.company}
                      </div>
                      <div className="exp-date">{exp.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p>{stat.label}</p>
            </motion.div>
          ) : stat.type === 'featured-project' ? (
            <motion.div 
              key={i} 
              variants={itemVariants} 
              className="stat-card featured-project-card"
            >
              <div className="featured-project-content">
                <h3>{stat.value}</h3>
                <p>An overview of the most recent and impactful project, taking up a larger grid space.</p>
                <div className="featured-project-tag">LATEST WORK</div>
              </div>
            </motion.div>
          ) : (
            <motion.div key={i} variants={itemVariants} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          )
        ))}
      </motion.section>







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
