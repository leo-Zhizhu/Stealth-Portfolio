import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import bannerImg from '../../../../assets/background/banner1.jpg';
import './ConnectCard.css';

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

export function ConnectCard({ variants }: { variants: any }) {
  return (
    <motion.div 
      variants={variants}
      className="stat-card connection-card"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <h3>CONNECT</h3>
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
  );
}
