// Highlight the current section's tab in the nav as the user scrolls.
(function () {
  const sections = document.querySelectorAll('main section[data-target]');
  const navLinks = document.querySelectorAll('.nav-tabs a, .mobile-menu nav a');

  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.remove('is-active'));
    document
      .querySelectorAll(`.nav-tabs a[href="#${id}"], .mobile-menu nav a[href="#${id}"]`)
      .forEach((link) => link.classList.add('is-active'));
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

// Hamburger menu (mobile nav).
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close after picking a link.
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click.
  document.addEventListener('click', (event) => {
    if (!menu.classList.contains('is-open')) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });

  // Close on Escape.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  // Close automatically if the viewport grows past the mobile breakpoint.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
})();

// Media modal — opens workflow/certificate images full-size when a
// card's thumbnail or "View" button is clicked.
(function () {
  const modal = document.getElementById('media-modal');
  if (!modal) return;

  const imgEl = document.getElementById('media-modal-img');
  const titleEl = document.getElementById('media-modal-title');
  const descEl = document.getElementById('media-modal-desc');
  const closeControls = modal.querySelectorAll('[data-modal-close]');
  let lastFocused = null;

  const openModal = (card) => {
    const img = card.querySelector('img');
    const titleSource = card.querySelector('h3');
    const descSource = card.querySelector('p');

    imgEl.src = img ? img.currentSrc || img.src : '';
    imgEl.alt = img ? img.alt : '';
    titleEl.textContent = titleSource ? titleSource.textContent : '';
    descEl.textContent = descSource ? descSource.textContent : '';

    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.media-modal-close').focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    imgEl.src = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  };

  document.querySelectorAll('.workflow-card, .cert-card').forEach((card) => {
    const trigger = () => openModal(card);

    const thumb = card.querySelector('.workflow-thumb, .cert-thumb');
    if (thumb) {
      thumb.addEventListener('click', trigger);
      thumb.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          trigger();
        }
      });
    }

    const viewBtn = card.querySelector('.view-trigger');
    if (viewBtn) viewBtn.addEventListener('click', trigger);
  });

  closeControls.forEach((el) => el.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();