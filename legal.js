/* Shared language toggle for the legal pages.
   Uses the same localStorage key as the main site so the choice carries over. */
(() => {
  'use strict';
  const root = document.documentElement;
  const LS_KEY = 'upp_lang';
  const buttons = document.querySelectorAll('[data-setlang]');

  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'hi' ? 'hi-IN' : 'en-IN');
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.setlang === lang)));
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
  }

  let initial = 'en';
  try {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === 'hi' || saved === 'en') initial = saved;
    else if ((navigator.language || '').toLowerCase().startsWith('hi')) initial = 'hi';
  } catch (e) {}
  applyLang(initial);

  buttons.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.setlang)));

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
