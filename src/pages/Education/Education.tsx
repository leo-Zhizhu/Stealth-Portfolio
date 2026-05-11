import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, BookOpen, ArrowLeft } from 'lucide-react';
import './Education.css';

import cornellEmblem from '../../assets/education/cornell.png';
import qibaoEmblem from '../../assets/education/qibaodwight.png';

export function Education() {
  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  }, []);

  const educationData = [
    {
      school: 'Cornell University',
      emblem: cornellEmblem,
      degree: 'College of Arts and Sciences',
      major: 'Double Major in Computer Science and Mathematics',
      gpa: '4.0 GPA',
      courses: [
        'Object-Oriented Programming & Data structure',
        'Math foundations of CS',
        'Linear Algebra',
        'Applicable Algebra',
        'Multi-variable Calculus'
      ],
      type: 'university'
    },
    {
      school: 'Qibao Dwight High School',
      emblem: qibaoEmblem,
      degree: 'IB Diploma Programme (IBDP)',
      score: '45/45 Predicted Score | 42/45 Final Score',
      details: 'High Level (HL) Courses: Mathematics, Computer Science, and English',
      award: 'Chairman Scholarship (Highest Scholarship)',
      type: 'highschool'
    }
  ];

  return (
    <div className="education-container">
      <div className="education-background-map"></div>
      <Link to="/dashboard" style={{ textDecoration: 'none' }}>
        <motion.div
          className="back-btn"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </motion.div>
      </Link>

      <motion.div 
        className="education-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1><GraduationCap size={32} /> Education</h1>
        <p>My academic journey and scholastic achievements.</p>
      </motion.div>

      <div className="education-list">
        {educationData.map((edu, index) => (
          <motion.div 
            key={index}
            className="education-card"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="edu-card-header">
              <div className="edu-logo-wrapper">
                <img src={edu.emblem} alt={edu.school} className="edu-logo" />
              </div>
              <div className="edu-school-info">
                <h2>{edu.school}</h2>
                <div className="edu-degree">
                  <BookOpen size={16} />
                  <span>{edu.degree}</span>
                </div>
              </div>
            </div>

            <div className="edu-card-content">
              {edu.type === 'university' ? (
                <>
                  <div className="edu-major">
                    <strong>{edu.major}</strong>
                  </div>
                  <div className="edu-gpa">
                    <Award size={16} color="#ffd700" />
                    <span>{edu.gpa}</span>
                  </div>
                  <div className="edu-courses">
                    <h3>Relevant Coursework:</h3>
                    <div className="course-tags">
                      {edu.courses?.map((course, i) => (
                        <span key={i} className="course-tag">{course}</span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="edu-score">
                    <strong>{edu.score}</strong>
                  </div>
                  <div className="edu-details">
                    <p>{edu.details}</p>
                  </div>
                  <div className="edu-scholarship">
                    <Award size={16} color="#ffd700" />
                    <span>{edu.award}</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
