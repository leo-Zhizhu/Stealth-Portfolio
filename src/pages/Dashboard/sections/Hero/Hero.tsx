import { useRef, useEffect, useState } from 'react';
import './Hero.css';

function useTypewriter(text: string, speed: number = 30, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayedText, text, speed, started]);

  return displayedText;
}

export function Hero({ isFirstLoad, onAnimationComplete }: { isFirstLoad: boolean; onAnimationComplete: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [showGame, setShowGame] = useState(!isFirstLoad);

  const nameText = "Zhu (Leo) Zhi";
  const taglineText = "Software Engineer | Machine Learning Engineer | Robotics Engineer";
  const descriptionText = "I build industrial-level software systems with high performance and reliability. I honor gracious professionalism, and the most important thing is that I get things done and learn new things every day. Currently open to internship offers, hackathons, collaborations, and coffee chats.";

  const name = useTypewriter(nameText, isFirstLoad ? 30 : 0, 0);
  const tagline = useTypewriter(taglineText, isFirstLoad ? 15 : 0, 0);
  const description = useTypewriter(descriptionText, isFirstLoad ? 8 : 0, 0);


  useEffect(() => {
    if (!isFirstLoad) {
      setShowGame(true);
      return;
    }
    if (description.length === descriptionText.length && descriptionText.length > 0) {
      const timer = setTimeout(() => {
        setShowGame(true);
        onAnimationComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [description, descriptionText.length, isFirstLoad, onAnimationComplete]);


  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'hero-mouse-move' && sectionRef.current && iframeRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const iframeRect = iframeRef.current.getBoundingClientRect();
        
        const x = (event.data.clientX + iframeRect.left) - sectionRect.left;
        const y = (event.data.clientY + iframeRect.top) - sectionRect.top;
        
        sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
        sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
      sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const techStack = [
    "Java","Python", "C++", "React", "TypeScript", 
    "PostgreSQL", "AWS", "Docker", "Node.js", "Elasticsearch", "Spring Boot",
    "Git", "Redis", "Linux", "PID", "CI/CD", "Pytorch", "TensorFlow"
  ];

  return (
    <section 
      className="hero-section" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <div className="hero-fog"></div>
      <div className="hero-content">
        <h2>
          {name}
          <span style={{ opacity: 0 }}>{nameText.slice(name.length)}</span>
        </h2>
        <p className="hero-tagline">
          {tagline}
          <span style={{ opacity: 0 }}>{taglineText.slice(tagline.length)}</span>
        </p>
        <p className="hero-description">
          {description}
          <span style={{ opacity: 0 }}>{descriptionText.slice(description.length)}</span>
        </p>
        
        <div className={`hero-tech-stack ${showGame ? 'visible' : ''}`}>
          {techStack.map((tech, index) => (
            <span key={index} className="tech-tag" style={{ transitionDelay: `${index * 50}ms` }}>
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className={`hero-particle ${showGame ? 'visible' : ''}`}>
        <iframe 
          ref={iframeRef}
          src="/molecule_game.html" 
          title="Molecule Game" 
          frameBorder="0" 
          scrolling="no" 
        />
      </div>
    </section>
  );
}
