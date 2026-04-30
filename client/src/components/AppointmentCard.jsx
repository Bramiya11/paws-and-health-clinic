const STATUS_LABELS = {
  scheduled: { label: 'Programada', className: 'status-scheduled' },
  completed: { label: 'Completada', className: 'status-completed' },
  cancelled: { label: 'Cancelada', className: 'status-cancelled' },
};

function AppointmentCard({ appointment }) {
  const { pet_name, owner_name, service, date, status, diagnosis, weight, temperature } = appointment;
  const statusInfo = STATUS_LABELS[status] ?? { label: status, className: '' };

  return (
    <article className="card appointment-card">
      <div className="card-header">
        <div>
          <h3 className="card-title">{pet_name}</h3>
          <p className="card-subtitle">Dueño: {owner_name}</p>
        </div>
        <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span className="info-label">Servicio</span>
          <span>{service}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Fecha</span>
          <span>{new Date(date).toLocaleDateString('es-CO', { dateStyle: 'medium' })}</span>
        </div>
        {weight && (
          <div className="info-row">
            <span className="info-label">Peso</span>
            <span>{weight} kg</span>
          </div>
        )}
        {temperature && (
          <div className="info-row">
            <span className="info-label">Temperatura</span>
            <span>{temperature} °C</span>
          </div>
        )}
        {diagnosis && (
          <div className="info-row diagnosis">
            <span className="info-label">Diagnóstico</span>
            <span>{diagnosis}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default AppointmentCard;
