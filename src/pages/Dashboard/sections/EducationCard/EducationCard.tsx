import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import './EducationCard.css';

export function EducationCard({ variants }: { variants: any }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={variants}
      onClick={() => navigate('/education')}
      className="stat-card education-card"
    >
      <div className="education-content">
        <h3>EDUCATION</h3>
        <p>
          Academic History
          <GraduationCap size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
        </p>
      </div>
    </motion.div>
  );
}
