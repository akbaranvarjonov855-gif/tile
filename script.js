/**
 * F.M. Master Tiles — sayt skripti
 *
 * 1. Tepa qismdagi kafel katakchalarini yaratadi.
 * 2. Sahifa pastga aylantirilganda bo'limlarni silliq ko'rsatadi.
 */

'use strict';

/* ---------- 1. Hero: kafel katakchalari ---------- */

const GRID_COLUMNS = 6;
const GRID_ROWS = 7;

function createHeroTiles() {
  const grid = document.getElementById('hero-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  for (let index = 0; index < GRID_COLUMNS * GRID_ROWS; index++) {
    const column = index % GRID_COLUMNS;
    const row = Math.floor(index / GRID_COLUMNS);

    const tile = document.createElement('i');
    // Animatsiya kechikishi: katakchalar diagonal bo'ylab ketma-ket ochiladi
    tile.style.setProperty('--order', column + row);
    fragment.appendChild(tile);
  }

  grid.appendChild(fragment);
}

/* ---------- 2. Bo'limlarni aylantirganda ko'rsatish ---------- */

function setupRevealOnScroll() {
  const sections = document.querySelectorAll('.reveal');

  // Eski brauzerlarda animatsiyasiz hammasini darrov ko'rsatamiz
  if (!('IntersectionObserver' in window)) {
    sections.forEach((section) => section.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // bir marta ishlaydi
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Ishga tushirish ---------- */

createHeroTiles();
setupRevealOnScroll();