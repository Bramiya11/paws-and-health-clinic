const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'appointments', label: 'Citas' },
  { id: 'pets', label: 'Mascotas' },
];

function Header({ onNavigate, currentView }) {
  return (
    <header className="header">
      <div className="header-brand">
        <span className="header-icon">🐾</span>
        <h1>Paws &amp; Health Clinic</h1>
      </div>
      <nav className="header-nav">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-btn ${currentView === id ? 'active' : ''}`}
            onClick={() => onNavigate(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
