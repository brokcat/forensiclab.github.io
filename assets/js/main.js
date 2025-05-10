// ForensicLab Gamified Platform - Main JS
// Theme toggle, gamification logic, navigation interactivité

document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (toggleBtn) toggleBtn.innerHTML = theme === 'dark' ? '🌙' : '☀️';
  }
  // Init theme
  const saved = localStorage.getItem('theme');
  setTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  // Gamification demo (XP, badges)
  function updateProgress(xp) {
    const bar = document.querySelector('.progress-bar-inner');
    if (bar) bar.style.width = Math.min(100, xp) + '%';
    // Ajoute des badges selon le XP
    const badges = document.getElementById('badges');
    if (badges) {
      badges.innerHTML = '';
      if (xp >= 10) badges.innerHTML += '<span class="badge">Débutant 🔰</span>';
      if (xp >= 40) badges.innerHTML += '<span class="badge">Enquêteur 🕵️‍♂️</span>';
      if (xp >= 80) badges.innerHTML += '<span class="badge">Expert 👑</span>';
    }
  }
  // Simule une progression (à relier à la vraie progression plus tard)
  let xp = 40;
  updateProgress(xp);

  // Navigation active
  document.querySelectorAll('nav a').forEach(link => {
    if (window.location.pathname.endsWith(link.getAttribute('href'))) {
      link.classList.add('active');
    }
  });
});
