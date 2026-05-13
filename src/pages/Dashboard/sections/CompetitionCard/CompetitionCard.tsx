import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import frcCoverImg from '../../../../assets/competition/FRC cover.jpg';
import './CompetitionCard.css';

export function CompetitionCard({ variants }: { variants: any }) {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={variants} 
      className="stat-card competition-card"
      onClick={() => navigate('/competitions')}
      style={{ cursor: 'pointer' }}
    >
      <div 
        className="comp-bg-overlay"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url("${frcCoverImg}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      
      <div className="comp-card-content">
        <div className="comp-header">
          <h3>COMPETITIONS</h3>
        </div>
      </div>
    </motion.div>
  );
}
