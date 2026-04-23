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

  // --- Gallery thumbs (product page) ---
  const mainImage = document.getElementById('mainImage');
  const thumbs = document.querySelectorAll('[data-thumb]');
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      if (!mainImage) return;
      mainImage.src = t.src;
      thumbs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  // --- Quantity options (product page) ---
  const options = document.querySelectorAll('.qty-option');
  const currentPrice = document.getElementById('currentPrice');
  const stickyPrice = document.getElementById('stickyPrice');
  options.forEach(btn => {
    btn.addEventListener('click', () => {
      options.forEach(o => { o.classList.remove('selected'); o.setAttribute('aria-checked', 'false'); });
      btn.classList.add('selected');
      btn.setAttribute('aria-checked', 'true');
      const price = btn.dataset.price;
      if (price && currentPrice) currentPrice.textContent = price + ' kr.';
      if (price && stickyPrice) stickyPrice.textContent = price + ' kr.';
    });
  });

  // --- Pack stepper ---
  const packInput = document.getElementById('packCount');
  document.querySelectorAll('[data-step]').forEach(b => {
    b.addEventListener('click', () => {
      if (!packInput) return;
      const step = parseInt(b.dataset.step, 10) || 0;
      const current = parseInt(packInput.value, 10) || 1;
      const next = Math.max(1, Math.min(10, current + step));
      packInput.value = next;
    });
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      const panel = trigger.nextElementSibling;
      if (panel) panel.setAttribute('data-open', String(!expanded));
    });
  });

  // --- Demo add-to-cart feedback ---
  const addBtns = document.querySelectorAll('#addToCart, #stickyAdd');
  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      btn.textContent = '✓ Lagt i kurv';
      btn.disabled = true;
      const countEl = document.querySelector('.basket-btn .count');
      if (countEl) countEl.textContent = String((parseInt(countEl.textContent, 10) || 0) + 1);
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 1600);
    });
  });
})();
