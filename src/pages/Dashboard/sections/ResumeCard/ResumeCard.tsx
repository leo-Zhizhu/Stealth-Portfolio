import { useState } from 'react';
import { Eye, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeFile from '../../../../assets/resume.pdf';
import './ResumeCard.css';

export function ResumeCard({ variants }: { variants: any }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <motion.div 
        variants={variants}
        onClick={() => setIsPreviewOpen(true)}
        className="stat-card resume-card"
      >
        <div className="resume-content">
          <h3>RESUME</h3>
          <p>
            View Resume
            <Eye size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
          </p>
        </div>
      </motion.div>

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
