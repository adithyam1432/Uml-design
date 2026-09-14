const navItems = document.querySelectorAll('.nav-item[data-view]');
const currentView = document.querySelector('#current-view');
const searchInput = document.querySelector('#search-input');
const toast = document.querySelector('#toast');
const modalBackdrop = document.querySelector('#modal-backdrop');
const pageContent = document.querySelector('.page-content');
const overviewMarkup = pageContent.innerHTML;

let toastTimer;

function showToast(message) {
  if(!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

const viewTemplates = {
  Classes: {
    title: 'Classes',
    subtitle: 'Manage every class, room, and timetable in one place.',
    action: 'Add new class',
    content: '<div class="module-grid"><article class="module-card"><span class="module-icon coral">M</span><div><strong>Mathematics · Grade 9</strong><small>Room 204 · 28 students</small></div><b>08:30</b></article><article class="module-card"><span class="module-icon blue">B</span><div><strong>Biology Lab · Grade 11</strong><small>Science Lab · 22 students</small></div><b>11:30</b></article><article class="module-card"><span class="module-icon yellow">H</span><div><strong>World History · Grade 10</strong><small>Room 108 · 24 students</small></div><b>10:00</b></article></div>'
  },
  Students: {
    title: 'Students',
    subtitle: 'Keep track of learners, progress, and participation.',
    action: 'Add student',
    content: '<div class="module-table"><div class="table-row table-head"><span>Student</span><span>Class</span><span>Attendance</span><span>Status</span></div><div class="table-row"><strong>Sarah Chen</strong><span>Mathematics · Grade 9</span><b class="positive">98%</b><em class="status-chip green-chip">Active</em></div><div class="table-row"><strong>Jordan Williams</strong><span>Biology Lab · Grade 11</span><b class="positive">96%</b><em class="status-chip green-chip">Active</em></div><div class="table-row"><strong>Emma Davis</strong><span>English · Grade 8</span><b>91%</b><em class="status-chip yellow-chip">Review</em></div></div>'
  },
  Attendance: {
    title: 'Attendance',
    subtitle: 'Review presence and absences across all classrooms.',
    action: 'Mark attendance',
    content: '<div class="module-grid"><article class="module-card attendance-module"><div><span class="module-kicker">Today</span><strong>94.8%</strong><small>Average attendance</small></div><div class="attendance-ring">94%</div></article><article class="module-card"><span class="module-icon green">✓</span><div><strong>Present today</strong><small>1,183 students</small></div><b class="positive">+2.4%</b></article><article class="module-card"><span class="module-icon coral">!</span><div><strong>Needs follow-up</strong><small>65 absences</small></div><b>6 classes</b></article></div>'
  },
  Calendar: {
    title: 'Calendar',
    subtitle: 'Your classes, events, and important school dates.',
    action: 'Add event',
    content: '<div class="calendar-board"><div class="calendar-head"><strong>October 2024</strong><button class="select-button">This month ⌄</button></div><div class="calendar-days"><b>Mon</b><b>Tue</b><b>Wed</b><b>Thu</b><b>Fri</b></div><div class="calendar-events"><div><span>08:30</span><strong>Mathematics · Grade 9</strong><em>Room 204</em></div><div><span>10:00</span><strong>World History · Grade 10</strong><em>Room 108</em></div><div><span>13:30</span><strong>English Literature · Grade 8</strong><em>Room 301</em></div></div></div>'
  },
  Messages: {
    title: 'Messages',
    subtitle: 'Stay connected with teachers, students, and families.',
    action: 'New message',
    content: '<div class="module-table message-table"><div class="table-row"><span class="module-icon coral">JT</span><div><strong>Jordan Thompson</strong><small>Could you review the new assignment?</small></div><b>10m ago</b></div><div class="table-row"><span class="module-icon blue">9B</span><div><strong>Grade 9B · Parents</strong><small>12 new replies</small></div><b>1h ago</b></div><div class="table-row"><span class="module-icon green">SC</span><div><strong>Sarah Chen</strong><small>Thank you for the feedback.</small></div><b>Yesterday</b></div></div>'
  },
  Reports: {
    title: 'Reports',
    subtitle: 'Understand progress with clear, useful school insights.',
    action: 'Export report',
    content: '<div class="module-grid"><article class="module-card report-card"><span class="module-kicker">Attendance report</span><strong>94.8%</strong><small>Up 2.4% from last week</small><div class="report-line"><i style="width:82%"></i></div></article><article class="module-card report-card"><span class="module-kicker">Average score</span><strong>81.7%</strong><small>Across 24 classes</small><div class="report-line blue-line"><i style="width:74%"></i></div></article><article class="module-card report-card"><span class="module-kicker">Tasks reviewed</span><strong>76%</strong><small>18 tasks left</small><div class="report-line yellow-line"><i style="width:61%"></i></div></article></div>'
  }
};

const cardDestinations = ['Students', 'Classes', 'Attendance', 'Reports'];

function renderView(view) {
  if (view === 'Overview') {
    pageContent.innerHTML = overviewMarkup;
    return;
  }
  const t = viewTemplates[view];
  if (!t) return;
  pageContent.innerHTML = `<section class="module-view"><div class="module-heading"><div><p class="eyebrow">Workspace module</p><h1>${t.title}</h1><p class="subheading">${t.subtitle}</p></div><button class="primary-button module-action"><span>＋</span> ${t.action}</button></div>${t.content}</section>`;
}

function navigateToView(view) {
  document.querySelectorAll('.nav-item[data-view]').forEach(n => n.classList.remove('active'));
  const target = document.querySelector(`.nav-item[data-view="${view}"]`);
  if (target) target.classList.add('active');
  if(currentView) currentView.textContent = view;
  renderView(view);
  showToast(`${view} view`);
  window.scrollTo({top:0, behavior:'smooth'});
}

function toggleModal(open) {
  if(!modalBackdrop) return;
  modalBackdrop.classList.toggle('open', open);
  if(open) modalBackdrop.querySelector('input')?.focus();
}

document.addEventListener('click', (e) => {
  const nav = e.target.closest('.nav-item[data-view]');
  if(nav){ navigateToView(nav.dataset.view); return; }

  if(e.target.closest('#add-class-button') || e.target.closest('.module-action')){
    toggleModal(true); return;
  }
  if(e.target.closest('#modal-close') || e.target === modalBackdrop){
    toggleModal(false); return;
  }
  if(e.target.closest('#create-class')){
    toggleModal(false);
    showToast('New class created successfully');
    return;
  }
  if(e.target.closest('.notification-button')){ showToast('Notifications are all caught up'); return; }
  if(e.target.closest('.upgrade-card button')){ showToast('Pro plan - Coming soon'); return; }
  if(e.target.closest('.workspace-switcher')){ showToast('Workspace switcher'); return; }
  if(e.target.closest('.top-avatar') || e.target.closest('.profile-row.icon-button')){ showToast('Profile menu'); return; }
  if(e.target.closest('.sidebar-bottom.nav-item')){ showToast('Settings'); return; }

  const stat = e.target.closest('.stat-card');
  if(stat){
    const allStats = [...document.querySelectorAll('.stat-card')];
    const idx = allStats.indexOf(stat);
    if(cardDestinations[idx]) navigateToView(cardDestinations[idx]);
    return;
  }
  if(e.target.closest('.schedule-item')){
    const name = e.target.closest('.schedule-item').querySelector('strong')?.textContent || 'Class';
    showToast(`Opening ${name}`); return;
  }
  if(e.target.closest('.text-button')){
    if(e.target.closest('.schedule-panel')) navigateToView('Calendar');
    else showToast('Showing all activity');
    return;
  }
});

document.addEventListener('input', (e) => {
  if(e.target.id === 'search-input' && e.target.value.trim().length > 2){
    showToast(`Searching for "${e.target.value.trim()}"`);
  }
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') toggleModal(false);
});
