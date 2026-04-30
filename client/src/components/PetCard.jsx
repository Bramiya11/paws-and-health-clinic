const SPECIES_EMOJI = {
  Perro: '🐕',
  Gato: '🐈',
  Conejo: '🐇',
  Ave: '🦜',
};

function PetCard({ pet, appointmentCount = 0 }) {
  const { name, species, breed, owner_name } = pet;
  const emoji = SPECIES_EMOJI[species] ?? '🐾';

  return (
    <article className="card pet-card">
      <div className="pet-avatar">{emoji}</div>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-subtitle">{species} · {breed}</p>
        <p className="pet-owner">Dueño: {owner_name}</p>
        <div className="pet-stat">
          <span className="stat-value">{appointmentCount}</span>
          <span className="stat-label">cita{appointmentCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </article>
  );
}

export default PetCard;
