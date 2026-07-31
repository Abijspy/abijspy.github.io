/* Shared theme and lightweight interaction setup for every page. */
(() => {
  const themeKey = 'abijspy_theme';
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');

  const applyTheme = (theme) => {
    const isLight = theme === 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('light', isLight);

    if (icon) {
      const iconStyle = icon.classList.contains('fa-solid') ? 'fa-solid' : 'fa-regular';
      icon.className = `${iconStyle} ${isLight ? 'fa-sun' : 'fa-moon'}`;
    }

    localStorage.setItem(themeKey, theme);
  };

  const savedTheme = localStorage.getItem(themeKey);
  applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  toggle?.addEventListener('click', () => {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  });

  document.querySelectorAll('.apple-nav, .profile-card, .skill, .project-card, .card, .img-card, .video-wrap')
    .forEach((element) => element.classList.add('mouse-glow-card'));
})();
