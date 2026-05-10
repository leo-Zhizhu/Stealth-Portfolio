import './Hero.css';

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2>Creative Developer & Designer</h2>
        <p>Building beautiful, modular, and high-performance web experiences.</p>
        <div className="hero-actions">
          <button className="primary-btn">View Work</button>
          <button className="secondary-btn">Contact Me</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="abstract-shape"></div>
      </div>
    </section>
  );
}
