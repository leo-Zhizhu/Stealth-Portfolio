import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mouse } from 'lucide-react';
import { Hero } from './sections/Hero/Hero';
import { Bento } from './sections/Bento/Bento';
import { Stats } from './sections/Stats/Stats';
import './Dashboard.css';

export function Dashboard({ 
  isFirstLoad, 
  setIsFirstLoad 
}: { 
  isFirstLoad: boolean;
  setIsFirstLoad: (val: boolean) => void;
}) {
  const [showScrollHint, setShowScrollHint] = useState(false);

  /* 
  useEffect(() => {
    // Show hint after a short delay if user hasn't scrolled
    const timer = setTimeout(() => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent && mainContent.scrollTop < 50) {
        setShowScrollHint(true);
      }
    }, 3000);

    const handleScroll = () => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent && mainContent.scrollTop > 50) {
        setShowScrollHint(false);
      }
    };

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      clearTimeout(timer);
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  */

  return (
    <div className="dashboard-container">
      <div className="dashboard-background-map"></div>
      <div className="dashboard-content">
        <Hero isFirstLoad={isFirstLoad} onAnimationComplete={() => setIsFirstLoad(false)} />
        <Stats />
        <Bento />
      </div>

      {/* 
      <AnimatePresence>
        {showScrollHint && (
          <motion.div 
            className="scroll-hint"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="scroll-hint-icon">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Mouse size={24} strokeWidth={1.5} />
              </motion.div>
            </div>
            <span>Scroll down</span>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </div>

  );
}
