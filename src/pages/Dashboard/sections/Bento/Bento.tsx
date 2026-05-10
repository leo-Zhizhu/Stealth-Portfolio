import './Bento.css';

export function Bento() {
  return (
    <section className="bento-grid">
      <div className="bento-item bento-large featured-project">
        <div className="bento-content">
          <h3>Featured Project</h3>
          <p>An overview of the most recent and impactful project, taking up a larger grid space.</p>
        </div>
      </div>
      
      <div className="bento-item skills">
        <div className="bento-content">
          <h3>Tech Stack</h3>
          <div className="tags">
            <span>React</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>Vite</span>
          </div>
        </div>
      </div>
      
      <div className="bento-item bento-tall experience">
        <div className="bento-content">
          <h3>Experience</h3>
          <ul className="timeline-placeholder">
            <li>Senior Developer @ TechCorp</li>
            <li>Frontend Eng @ StartupInc</li>
            <li>Junior Dev @ WebStudio</li>
          </ul>
        </div>
      </div>
      
      <div className="bento-item contact-card">
        <div className="bento-content">
          <h3>Let's Connect</h3>
          <p>Open for new opportunities.</p>
          <a href="#" className="link-btn">Email Me</a>
        </div>
      </div>
      
      <div className="bento-item bento-wide current-focus">
        <div className="bento-content">
          <h3>Current Focus</h3>
          <p>Learning Rust and WebAssembly for high-performance web applications.</p>
        </div>
      </div>
    </section>
  );
}
