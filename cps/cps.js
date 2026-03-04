const studentProjects = [
  {
    semester: 'Primavera 2026',
    title: 'Luis Cortés Muñoz y Emanuel Iturbe Rebolledo',
    url: 'https://luiscortesmunoz.github.io/Practicas_Sistemas_Ciberfisicos/',
    buttonText: 'Abrir portafolio',
    enabled: true
  },
  {
    semester: 'Primavera 2026',
    title: 'Ana Camila Sánchez Guevara y Alexander Eduardo Moncada Rivas',
    url: 'https://camilasg25.github.io/Projects_page/',
    buttonText: 'Abrir portafolio',
    enabled: true
  },
  {
    semester: 'Primavera 2026',
    title: 'Renata Darany Badillo Cabrera y Martha Esther Valdes Cruz',
    url: '',
    buttonText: 'Próximamente',
    enabled: false
  },
  {
    semester: 'Otoño 2025',
    title: 'Sebastian Mendez Villegas, Daniela Renee Colin Tinoco y Haili Ailin Avila Ramirez',
    url: 'https://sebas30073007.github.io/Sistemas_Ciberfisicos_Proyecto/',
    buttonText: 'Abrir portafolio',
    enabled: true
  }
];

let scheduleWeeks = [];

function renderStudents() {
  const container = document.getElementById('studentsContainer');
  if (!container) return;

  container.innerHTML = studentProjects.map(project => `
    <div class="col-md-6 col-xl-4">
      <div class="student-card h-100">
        <div class="card-body d-flex flex-column">
          <span class="student-semester">${project.semester}</span>
          <h4 class="flex-grow-1">${project.title}</h4>
          ${project.enabled
            ? `<a class="btn btn-primary mt-auto" href="${project.url}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right me-2"></i>${project.buttonText}</a>`
            : `<button class="btn btn-outline-secondary mt-auto" type="button" disabled><i class="bi bi-hourglass-split me-2"></i>${project.buttonText}</button>`}
        </div>
      </div>
    </div>
  `).join('');
}

function sessionMatches(week, session, filter) {
  if (!filter) return true;
  const haystack = `${week.title} ${week.range} ${session.date} ${session.block} ${session.topic} ${session.activity}`.toLowerCase();
  return haystack.includes(filter);
}

function renderSchedule(filterText = '') {
  const scheduleContainer = document.getElementById('scheduleContainer');
  const empty = document.getElementById('scheduleEmpty');
  if (!scheduleContainer || !empty) return;

  const filter = filterText.trim().toLowerCase();

  const filteredWeeks = scheduleWeeks
    .map(week => ({
      ...week,
      sessions: week.sessions.filter(session => sessionMatches(week, session, filter))
    }))
    .filter(week => week.sessions.length > 0);

  if (!filteredWeeks.length) {
    scheduleContainer.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  scheduleContainer.innerHTML = filteredWeeks.map(week => `
    <article class="week-card">
      <div class="week-header">
        <div class="week-title-wrap">
          <span class="week-index">${week.week}</span>
          <div>
            <h3 class="week-title">${week.title}</h3>
            <div class="week-range">${week.range}</div>
          </div>
        </div>
      </div>

      <div class="row g-3">
        ${week.sessions.map(session => `
          <div class="col-md-6 col-xl-4">
            <div class="session-item">
              <div class="session-date">${session.date}</div>
              <div class="session-title">${session.topic}</div>
              <div class="session-meta">
                <span class="badge bg-primary bg-gradient rounded-pill">${session.block}</span>
                <span class="badge bg-light text-dark border rounded-pill">Semana ${week.week}</span>
              </div>
              <p class="session-description">${session.activity}</p>
              ${session.enabled
                ? `<a class="btn btn-sm btn-primary" href="${session.lessonUrl}" target="_blank" rel="noopener"><i class="bi bi-journal-bookmark me-2"></i>${session.lessonText}</a>`
                : `<button class="btn btn-sm btn-outline-secondary" type="button" disabled><i class="bi bi-link-45deg me-2"></i>${session.lessonText}</button>`}
            </div>
          </div>
        `).join('')}
      </div>
    </article>
  `).join('');
}

async function loadSchedule() {
  const loading = document.getElementById('scheduleLoading');

  try {
    const response = await fetch('./cronograma.json');
    if (!response.ok) {
      throw new Error(`No se pudo cargar cronograma.json (${response.status})`);
    }

    scheduleWeeks = await response.json();
    if (loading) loading.style.display = 'none';
    renderSchedule();
  } catch (error) {
    console.error(error);
    if (loading) {
      loading.className = 'schedule-empty';
      loading.style.display = 'block';
      loading.textContent = 'No se pudo cargar el cronograma. Verifica que el archivo cronograma.json esté en la carpeta cps.';
    }
  }
}

function initScheduleSearch() {
  const searchInput = document.getElementById('scheduleSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', event => {
    renderSchedule(event.target.value);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderStudents();
  initScheduleSearch();
  loadSchedule();
});
