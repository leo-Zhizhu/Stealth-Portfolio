import './Stats.css';

export function Stats() {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '42' },
    { label: 'Happy Clients', value: '28' },
    { label: 'Open Source Commits', value: '1.2k' },
  ];

  return (
    <section className="stats-section">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card">
          <h3>{stat.value}</h3>
          <p>{stat.label}</p>
        </div>
      ))}
    </section>
  );
}
