const navItems = document.querySelectorAll('.nav-item[data-view]');
const currentView = document.querySelector('#current-view');
const searchInput = document.querySelector('#search-input');
const toast = document.querySelector('#toast');
const modalBackdrop = document.querySelector('#modal-backdrop');
const addClassButton = document.querySelector('#add-class-button');
const modalClose = document.querySelector('#modal-close');
const createClassButton = document.querySelector('#create-class');
const pageContent = document.querySelector('.page-content');
const overviewMarkup = pageContent.innerHTML;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

const viewTemplates = {
  Classes: {
    title: 'Classes',
    subtitle: 'Manage every class, room, and timetable in one place.',
    action: 'Add new class',
    content: '<div class="module-grid"><article class="module-card"><span class="module-icon coral">M</span><div><strong>Mathematics · Grade 9</strong><small>Room 204 · 28 students</small></div><b>Today, 08:30</b></article><article class="module-card"><span class="module-icon blue">B</span><div><strong>Biology Lab · Grade 11</strong><small>Science Lab · 22 students</small></div><b>Today, 11:30</b></article><article class="module-card"><span class="module-icon yellow">H</span><div><strong>World History · Grade 10</strong><small>Room 108 · 24 students</small></div><b>Today, 10:00</b></article></div>'
  },
  Students: {
    title: 'Students',
    subtitle: 'Keep track of learners, progress, and class participation.',
    action: 'Add student',
    content: '<div class="module-table"><div class="table-row table-head"><span>Student</span><span>Class</span><span>Attendance</span><span>Status</span></div><div class="table-row"><strong>Sarah Chen</strong><span>Mathematics · Grade 9</span><b class="positive">98%</b><em class="status-chip green-chip">Active</em></div><div class="table-row"><strong>Jordan Williams</strong><span>Biology Lab · Grade 11</span><b class="positive">96%</b><em class="status-chip green-chip">Active</em></div><div class="table-row"><strong>Emma Davis</strong><span>English · Grade 8</span><b>91%</b><em class="status-chip yellow-chip">Review</em></div></div>'
  },
  Attendance: {
    title: 'Attendance',
    subtitle: 'Review presence and absences across all classrooms.',
    action: 'Mark attendance',
    content: '<div class="module-grid"><article class="module-card attendance-module"><div><span class="module-kicker">Today</span><strong>94.8%</strong><small>Average attendance</small></div><div class="attendance-ring">94<span>%</span></div></article><article class="module-card"><span class="module-icon green">✓</span><div><strong>Present today</strong><small>1,183 students checked in</small></div><b class="positive">+2.4%</b></article><article class="module-card"><span class="module-icon coral">!</span><div><strong>Needs follow-up</strong><small>65 absences need review</small></div><b class="neutral">6 classes</b></article></div>'
  },
  Calendar: {
    title: 'Calendar',
    subtitle: 'Your classes, events, and important school dates.',
    action: 'Add event',
    content: '<div class="calendar-board"><div class="calendar-head"><strong>October 2024</strong><button class="select-button">This month <span>⌄</span></button></div><div class="calendar-days"><b>Mon</b><b>Tue</b><b>Wed</b><b>Thu</b><b>Fri</b></div><div class="calendar-events"><div><span>08:30</span><strong>Mathematics · Grade 9</strong><em>Room 204</em></div><div><span>10:00</span><strong>World History · Grade 10</strong><em>Room 108</em></div><div><span>13:30</span><strong>English Literature · Grade 8</strong><em>Room 301</em></div></div></div>'
  },
  Messages: {
    title: 'Messages',
    subtitle: 'Stay connected with teachers, students, and families.',
    action: 'New message',
    content: '<div class="module-table message-table"><div class="table-row"><span class="module-icon coral">JT</span><div><strong>Jordan Thompson</strong><small>Could you review the new assignment?</small></div><b>10 min ago</b></div><div class="table-row"><span class="module-icon blue">9B</span><div><strong>Grade 9B · Parents</strong><small>12 new replies in this group</small></div><b>1 hr ago</b></div><div class="table-row"><span class="module-icon green">SC</span><div><strong>Sarah Chen</strong><small>Thank you for the feedback.</small></div><b>Yesterday</b></div></div>'
  },
  Reports: {
    title: 'Reports',
    subtitle: 'Understand progress with clear, useful school insights.',
    action: 'Export report',
    content: '<div class="module-grid"><article class="module-card report-card"><span class="module-kicker">Attendance report</span><strong>94.8%</strong><small>Up 2.4% from last week</small><div class="report-line"><i style="width:82%"></i></div></article><article class="module-card report-card"><span class="module-kicker">Average class score</span><strong>81.7%</strong><small>Across 24 active classes</small><div class="report-line blue-line"><i style="width:74%"></i></div></article><article class="module-card report-card"><span class="module-kicker">Tasks reviewed</span><strong>76%</strong><small>18 tasks remaining</small><div class="report-line yellow-line"><i style="width:61%"></i></div></article></div>'
  }
};

function renderView(view) {
  if (view === 'Overview') {
    pageContent.innerHTML = overviewMarkup;
    return;
  }
  const template = viewTemplates[view];
  if (!template) return;
  pageContent.innerHTML = `<section class="module-view"><div class="module-heading"><div><p class="eyebrow">Workspace module</p><h1>${template.title}</h1><p class="subheading">${template.subtitle}</p></div><button class="primary-button module-action"><span>＋</span> ${template.action}</button></div>${template.content}</section>`;
}

function navigateToView(view) {
  const target = [...navItems].find((item) => item.dataset.view === view);
  if (target) {
    navItems.forEach((navItem) => navItem.classList.remove('active'));
    target.classList.add('active');
  }
  currentView.textContent = view;
  renderView(view);
  showToast(`${view} view selected`);
}

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    navigateToView(item.dataset.view);
  });
});

pageContent.addEventListener('click', (event) => {
  const statCard = event.target.closest('.stat-card');
  if (statCard) {
    const cardIndex = [...pageContent.querySelectorAll('.stat-card')].indexOf(statCard);
    navigateToView(cardDestinations[cardIndex]);
    return;
  }
  const scheduleItem = event.target.closest('.schedule-item');
  if (scheduleItem) {
    showToast(`Opening ${scheduleItem.querySelector('.schedule-detail strong').textContent}`);
    return;
  }
  const activityItem = event.target.closest('.activity-item');
  if (activityItem) {
    showToast(`Opening activity: ${activityItem.querySelector('strong').textContent}`);
    return;
  }
  const performanceItem = event.target.closest('.performance-list > div');
  if (performanceItem) {
    showToast(`${performanceItem.querySelector('strong').textContent} performance opened`);
    return;
  }
  if (event.target.closest('#add-class-button')) {
    toggleModal(true);
    return;
  }
  if (event.target.closest('.schedule-panel .text-button')) {
    navigateToView('Calendar');
    return;
  }
  if (event.target.closest('.activity-panel .text-button')) {
    showToast('Showing all recent activity');
    return;
  }
  if (event.target.closest('.more-button')) {
    showToast('Schedule options opened');
    return;
  }
  if (event.target.closest('.module-action')) {
    showToast(`${currentView.textContent} action opened`);
  }
  if (event.target.closest('.back-overview')) {
    navigateToView('Overview');
  }
});

document.querySelector('.notification-button').addEventListener('click', () => {
  showToast('Notifications are all caught up.');
});

document.querySelectorAll('.select-button').forEach((button) => {
  button.addEventListener('click', () => {
    const options = ['This week', 'Last week', 'This month'];
    const current = button.firstChild.textContent.trim();
    const next = options[(options.indexOf(current) + 1) % options.length];
    button.firstChild.textContent = `${next} `;
    showToast(`Showing ${next.toLowerCase()} data`);
  });
});

const cardDestinations = ['Students', 'Classes', 'Attendance', 'Reports'];
document.querySelectorAll('.stat-card').forEach((card, index) => {
  card.addEventListener('click', () => navigateToView(cardDestinations[index]));
});

document.querySelectorAll('.schedule-item').forEach((item) => {
  item.addEventListener('click', () => {
    const className = item.querySelector('.schedule-detail strong').textContent;
    showToast(`Opening ${className}`);
  });
});

document.querySelectorAll('.activity-item').forEach((item) => {
  item.addEventListener('click', () => {
    showToast(`Opening activity: ${item.querySelector('strong').textContent}`);
  });
});

document.querySelectorAll('.performance-list > div').forEach((item) => {
  item.addEventListener('click', () => {
    showToast(`${item.querySelector('strong').textContent} performance opened`);
  });
});

document.querySelector('.schedule-panel .text-button').addEventListener('click', () => navigateToView('Calendar'));
document.querySelector('.activity-panel .text-button').addEventListener('click', () => showToast('Showing all recent activity'));
document.querySelector('.more-button').addEventListener('click', () => showToast('Schedule options opened'));
document.querySelector('.upgrade-card button').addEventListener('click', () => showToast('Pro plan details opened'));
document.querySelector('.workspace-switcher').addEventListener('click', () => showToast('Workspace switcher opened'));
document.querySelector('.profile-row .icon-button').addEventListener('click', () => showToast('Profile menu opened'));
document.querySelector('.top-avatar').addEventListener('click', () => showToast('Profile menu opened'));
document.querySelector('.sidebar-bottom .nav-item').addEventListener('click', () => showToast('Settings opened'));

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim();
  if (query.length > 2) showToast(`Searching for “${query}”`);
});

function toggleModal(isOpen) {
  modalBackdrop.classList.toggle('open', isOpen);
  if (isOpen) modalBackdrop.querySelector('input').focus();
}

addClassButton.addEventListener('click', () => toggleModal(true));
modalClose.addEventListener('click', () => toggleModal(false));
modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) toggleModal(false);
});
createClassButton.addEventListener('click', () => {
  toggleModal(false);
  showToast('New class created successfully.');
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') toggleModal(false);
});
