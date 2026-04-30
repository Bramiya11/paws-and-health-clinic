function StatItem({ value, label, icon }) {
  return (
    <div className="stat-item">
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function StatsBar({ appointments }) {
  const total = appointments.length;
  const completed = appointments.filter((a) => a.status === 'completed').length;
  const scheduled = appointments.filter((a) => a.status === 'scheduled').length;
  const pets = new Set(appointments.map((a) => a.pet_name)).size;

  return (
    <section className="stats-bar">
      <StatItem value={total} label="Citas totales" icon="📋" />
      <StatItem value={scheduled} label="Programadas" icon="🗓️" />
      <StatItem value={completed} label="Completadas" icon="✅" />
      <StatItem value={pets} label="Mascotas" icon="🐾" />
    </section>
  );
}

export default StatsBar;
