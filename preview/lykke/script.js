(function () {
  'use strict';

  // --- Mobile nav ---
  const nav = document.getElementById('mobile-nav');
  const backdrop = document.querySelector('.backdrop');
  const toggles = document.querySelectorAll('[data-menu-toggle]');
  const closers = document.querySelectorAll('[data-menu-close]');

  function openMenu() {
    if (!nav) return;
    nav.classList.add('open');
    backdrop && backdrop.classList.add('open');
    toggles.forEach(t => t.setAttribute('aria-expanded', 'true'));
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove('open');
    backdrop && backdrop.classList.remove('open');
    toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
  }
  toggles.forEach(t => t.addEventListener('click', openMenu));
  closers.forEach(c => c.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

  // --- Smooth anchor scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
