import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import banner2Img from '../../../../assets/background/banner2.jpg';
import './ExperienceCard.css';

const experiences = [
  { role: 'ML Engineer Intern', company: 'Bonsai Robotics', date: 'June 2026 - Sept 2026' },
  { role: 'Software Engineer', company: 'Ginlix AI', date: 'Nov 2025 - Present' },
  { role: 'Software Subteam Member', company: 'CUAUV', date: 'Oct 2025 - Present' },
  { role: 'Software Mentor', company: 'FRC 8015', date: 'Sept 2024 - Aug 2025' },
  { role: 'Team Captain & Lead Programmer', company: 'FRC 8015', date: 'May 2023 - Sept 2024' },
];

export function ExperienceCard({ variants }: { variants: any }) {
  return (
    <motion.div variants={variants} className="stat-card experience-card">
      <div 
        className="exp-bg-overlay"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${banner2Img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <h3>EXPERIENCES</h3>
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
      <p>Professional Path</p>
    </motion.div>
  );
}
