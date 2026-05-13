import { motion } from 'framer-motion';
import { ResumeCard } from '../ResumeCard/ResumeCard';
import { EducationCard } from '../EducationCard/EducationCard';
import { ConnectCard } from '../ConnectCard/ConnectCard';
import { ExperienceCard } from '../ExperienceCard/ExperienceCard';
import { FeaturedProject } from '../FeaturedProject/FeaturedProject';
import { CompetitionCard } from '../CompetitionCard/CompetitionCard';
import './BentoGrid.css';

export function BentoGrid() {
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
    <motion.section 
      className="bento-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ResumeCard variants={itemVariants} />
      <EducationCard variants={itemVariants} />
      <ConnectCard variants={itemVariants} />
      <ExperienceCard variants={itemVariants} />
      <FeaturedProject variants={itemVariants} />
      <CompetitionCard variants={itemVariants} />
    </motion.section>
  );
}
