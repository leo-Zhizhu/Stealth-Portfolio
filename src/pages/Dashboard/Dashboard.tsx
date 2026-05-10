import { Hero } from './sections/Hero/Hero';
import { Bento } from './sections/Bento/Bento';
import { Stats } from './sections/Stats/Stats';
import './Dashboard.css';

export function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Overview</h1>
        <p>Welcome to the portfolio dashboard. High information density framework.</p>
      </header>
      
      <div className="dashboard-content">
        <Hero />
        <Stats />
        <Bento />
      </div>
    </div>
  );
}
