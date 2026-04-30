import { useState } from 'react';
import Header from './components/Header';
import AppointmentCard from './components/AppointmentCard';
import PetCard from './components/PetCard';
import StatsBar from './components/StatsBar';
import './App.css';

const APPOINTMENTS = [
  {
    id: 1,
    pet_name: 'Firulais',
    owner_name: 'Carlos López',
    service: 'Consulta General',
    date: '2025-06-10',
    status: 'completed',
    weight: 12.5,
    temperature: 38.5,
    diagnosis: 'Paciente sano, vacunas al día.',
  },
  {
    id: 2,
    pet_name: 'Michi',
    owner_name: 'Ana García',
    service: 'Vacunación',
    date: '2025-06-12',
    status: 'scheduled',
    weight: null,
    temperature: null,
    diagnosis: null,
  },
  {
    id: 3,
    pet_name: 'Rocky',
    owner_name: 'Pedro Martínez',
    service: 'Cirugía',
    date: '2025-06-08',
    status: 'completed',
    weight: 25.0,
    temperature: 39.1,
    diagnosis: 'Extracción de cuerpo extraño. Recuperación exitosa.',
  },
  {
    id: 4,
    pet_name: 'Luna',
    owner_name: 'María Torres',
    service: 'Control de peso',
    date: '2025-06-15',
    status: 'scheduled',
    weight: null,
    temperature: null,
    diagnosis: null,
  },
  {
    id: 5,
    pet_name: 'Toby',
    owner_name: 'Juan Ramírez',
    service: 'Desparasitación',
    date: '2025-06-05',
    status: 'completed',
    weight: 8.3,
    temperature: 38.7,
    diagnosis: 'Tratamiento antiparasitario aplicado correctamente.',
  },
];

const PETS = [
  { id: 1, name: 'Firulais', species: 'Perro', breed: 'Labrador',       owner_name: 'Carlos López' },
  { id: 2, name: 'Michi',    species: 'Gato',  breed: 'Siamés',         owner_name: 'Ana García' },
  { id: 3, name: 'Rocky',    species: 'Perro', breed: 'Pastor Alemán',  owner_name: 'Pedro Martínez' },
  { id: 4, name: 'Luna',     species: 'Gato',  breed: 'Persa',          owner_name: 'María Torres' },
  { id: 5, name: 'Toby',     species: 'Perro', breed: 'Beagle',         owner_name: 'Juan Ramírez' },
];

function App() {
  const [view, setView] = useState('dashboard');
  const [filter, setFilter] = useState('all');

  const filteredAppointments =
    filter === 'all' ? APPOINTMENTS : APPOINTMENTS.filter((a) => a.status === filter);

  const appointmentCountFor = (petName) =>
    APPOINTMENTS.filter((a) => a.pet_name === petName).length;

  return (
    <>
      <Header onNavigate={setView} currentView={view} />

      <main className="main-content">
        {view === 'dashboard' && (
          <>
            <section className="section">
              <h2 className="section-title">Resumen</h2>
              <StatsBar appointments={APPOINTMENTS} />
            </section>

            <section className="section">
              <div className="section-header">
                <h2 className="section-title">Próximas citas</h2>
                <button className="btn-link" onClick={() => setView('appointments')}>
                  Ver todas →
                </button>
              </div>
              <div className="cards-grid">
                {APPOINTMENTS.filter((a) => a.status === 'scheduled').map((appt) => (
                  <AppointmentCard key={appt.id} appointment={appt} />
                ))}
              </div>
            </section>
          </>
        )}

        {view === 'appointments' && (
          <section className="section">
            <h2 className="section-title">Citas</h2>
            <div className="filter-bar">
              {['all', 'scheduled', 'completed'].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f === 'all' ? 'Todas' : f === 'scheduled' ? 'Programadas' : 'Completadas'}
                </button>
              ))}
            </div>
            <div className="cards-grid">
              {filteredAppointments.map((appt) => (
                <AppointmentCard key={appt.id} appointment={appt} />
              ))}
            </div>
          </section>
        )}

        {view === 'pets' && (
          <section className="section">
            <h2 className="section-title">Mascotas registradas</h2>
            <div className="cards-grid">
              {PETS.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  appointmentCount={appointmentCountFor(pet.name)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
