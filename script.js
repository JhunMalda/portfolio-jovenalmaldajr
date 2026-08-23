// Highlight the current section's tab in the nav as the user scrolls.
(function () {
  const sections = document.querySelectorAll('main section[data-target]');
  const navLinks = document.querySelectorAll('.nav-tabs a');

  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) =>
    document.querySelector(`.nav-tabs a[href="#${id}"]`);

  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.remove('is-active'));
    const active = linkFor(id);
    if (active) active.classList.add('is-active');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.dataset.target);
        }
      });
    },
    {
      // Trigger when a section occupies the upper-middle of the viewport,
      // so the nav updates a little before the section fully arrives.
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

// Theme toggle (light/dark), persisted to localStorage.
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const applyLabel = (theme) => {
    const next = theme === 'light' ? 'dark' : 'light';
    toggle.setAttribute('aria-label', `Switch to ${next} mode`);
    toggle.setAttribute('aria-pressed', String(theme === 'light'));
  };

  // Reflect whatever theme the inline head script already applied.
  applyLabel(root.getAttribute('data-theme') || 'dark');

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    applyLabel(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* localStorage unavailable — theme just won't persist across visits */
    }
  });
})();
