/* ============================================================
   APP — Navegación, modales, notas
   ============================================================ */

(() => {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const LS_NAME = 'seprio_propuesta_visitor_name';

  /* ----------- State ----------- */
  const slides = $$('.slide');
  const total = slides.length;
  let current = 0;
  const visited = new Set([0]);

  /* ----------- Read-more data ----------- */
  let readMoreData = {};
  try {
    const raw = $('#readmore-data')?.textContent || '{}';
    readMoreData = JSON.parse(raw);
  } catch (e) {
    console.error('readmore data parse', e);
  }

  /* ----------- Progress dots ----------- */
  const progressEl = $('#progress');
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('data-idx', String(i));
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Diapositiva ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    progressEl.appendChild(dot);
  }
  const dots = $$('.progress .dot');

  /* ----------- Mobile: floating toggle button (text ↔ art) ----------- */
  slides.forEach(slide => {
    if (slide.classList.contains('cover')) return;
    if (slide.querySelector('.mobile-toggle')) return;
    const btn = document.createElement('button');
    btn.className = 'mobile-toggle';
    btn.setAttribute('data-action', 'toggle-art');
    btn.setAttribute('type', 'button');
    btn.innerHTML = '<span class="label-art">↗ Ver diagrama</span><span class="label-text">← Volver al texto</span>';
    slide.appendChild(btn);
  });

  /* ----------- Navigation ----------- */
  function goTo(idx) {
    if (idx < 0 || idx >= total) return;
    if (idx === current) return;
    slides[current].classList.remove('active');
    slides[current].classList.remove('show-art');
    slides[current].classList.toggle('prev', idx > current);
    current = idx;
    slides[current].classList.add('active');
    slides[current].classList.remove('prev');
    slides[current].classList.remove('show-art');
    visited.add(current);
    updateChrome();
  }

  function next() { if (current < total - 1) goTo(current + 1); }
  function prev() { if (current > 0) goTo(current - 1); }

  function updateChrome() {
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.classList.toggle('visited', visited.has(i) && i !== current);
    });
    $('#cur-num').textContent = String(current + 1).padStart(2, '0');
    $('#total-num').textContent = String(total).padStart(2, '0');
    $('#prev-btn').disabled = current === 0;
    $('#next-btn').disabled = current === total - 1;
  }

  /* ----------- Keyboard ----------- */
  document.addEventListener('keydown', (e) => {
    if (anyModalOpen()) {
      if (e.key === 'Escape') closeAllModals();
      return;
    }
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault(); next();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault(); prev();
    } else if (e.key === 'Home') {
      e.preventDefault(); goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault(); goTo(total - 1);
    }
  });

  /* ----------- Mouse wheel on desktop ----------- */
  let wheelTimer = null;
  document.addEventListener('wheel', (e) => {
    if (window.innerWidth <= 880) return;
    if (anyModalOpen()) return;
    if (wheelTimer) return;
    if (Math.abs(e.deltaY) < 30 && Math.abs(e.deltaX) < 30) return;
    if (e.deltaY > 0 || e.deltaX > 0) next();
    else if (e.deltaY < 0 || e.deltaX < 0) prev();
    wheelTimer = setTimeout(() => { wheelTimer = null; }, 600);
  }, { passive: true });

  /* ----------- Touch swipe on mobile (left/right) ----------- */
  // Mobile uses normal vertical scroll within slide; horizontal swipe navigates.
  let touchStartX = 0, touchStartY = 0, touchActive = false;
  document.addEventListener('touchstart', (e) => {
    if (anyModalOpen()) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchActive = true;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (!touchActive) return;
    touchActive = false;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  /* ----------- Buttons ----------- */
  $('#next-btn').addEventListener('click', next);
  $('#prev-btn').addEventListener('click', prev);

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-action]');
    if (!t) return;
    const action = t.getAttribute('data-action');
    if (action === 'next') next();
    else if (action === 'prev') prev();
    else if (action === 'first') goTo(0);
    else if (action === 'read-more') openReadMore();
    else if (action === 'add-note') openNotes();
    else if (action === 'toggle-art') slides[current].classList.toggle('show-art');
  });

  /* ----------- Modals ----------- */
  function anyModalOpen() {
    return $$('.modal-overlay.open').length > 0;
  }
  function closeAllModals() {
    $$('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
  $$('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-close');
      $('#' + id)?.classList.remove('open');
    });
  });
  $$('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', (e) => {
      if (e.target === ov) ov.classList.remove('open');
    });
  });

  function openReadMore() {
    const slide = slides[current];
    const id = slide.getAttribute('data-slide-id');
    const title = slide.getAttribute('data-slide-title') || 'Detalle';
    const data = readMoreData[id] || { title, html: '<p>Contenido en preparación.</p>' };
    $('#readmore-eyebrow').textContent = `${String(current + 1).padStart(2, '0')} · Módulo Comunicaciones`;
    $('#readmore-title').textContent = data.title || title;
    $('#readmore-body').innerHTML = data.html;
    $('#readmore-modal').classList.add('open');
  }

  /* ----------- Notas ----------- */
  const notesModal = $('#notes-modal');
  const nameField = $('#name-field');
  const nameInput = $('#note-name');
  const textInput = $('#note-text');
  const ctxEl = $('#notes-context');
  const statusEl = $('#notes-status');
  const submitBtn = $('#notes-submit');
  const pillWho = $('#notes-pill-who');

  function getName() {
    return localStorage.getItem(LS_NAME) || '';
  }
  function setName(name) {
    if (name && name.trim()) localStorage.setItem(LS_NAME, name.trim());
  }

  function refreshNameField() {
    const name = getName();
    if (name) {
      nameField.style.display = 'none';
      pillWho.textContent = `· ${name.split(' ')[0]}`;
    } else {
      nameField.style.display = '';
      pillWho.textContent = '';
    }
  }

  function setStatus(text, kind = 'idle') {
    statusEl.textContent = text;
    statusEl.className = `notes-status ${kind}`;
  }

  function openNotes() {
    const slide = slides[current];
    const title = slide.getAttribute('data-slide-title') || 'Cover';
    ctxEl.textContent = `Contexto: slide ${String(current + 1).padStart(2, '0')} · ${title}`;
    refreshNameField();
    textInput.value = '';
    setStatus('Listo', 'idle');
    notesModal.classList.add('open');
    setTimeout(() => {
      if (getName()) textInput.focus();
      else nameInput.focus();
    }, 280);
  }

  $('#notes-pill').addEventListener('click', openNotes);

  submitBtn.addEventListener('click', async () => {
    const name = (getName() || nameInput.value || '').trim();
    const text = textInput.value.trim();
    if (!name) { setStatus('Falta tu nombre', 'err'); nameInput.focus(); return; }
    if (!text) { setStatus('Escribí una nota', 'err'); textInput.focus(); return; }
    setStatus('Enviando…', 'idle');
    submitBtn.disabled = true;
    const slide = slides[current];
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, text,
          slideId: slide.getAttribute('data-slide-id'),
          slideTitle: slide.getAttribute('data-slide-title')
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setName(name);
      refreshNameField();
      setStatus('✓ Nota enviada · gracias', 'ok');
      textInput.value = '';
      setTimeout(() => notesModal.classList.remove('open'), 1100);
    } catch (err) {
      console.error('notes submit', err);
      setStatus('Error al enviar', 'err');
    } finally {
      submitBtn.disabled = false;
    }
  });

  /* ----------- Init ----------- */
  refreshNameField();
  updateChrome();

  // Smooth-render diagrams already done by diagrams.js
})();
