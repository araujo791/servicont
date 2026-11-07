const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menu'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('open', open); });
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.querySelector('#contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const subject = `Solicitação de proposta — ${data.get('nome')}`;
  const body = `Nome: ${data.get('nome')}\nE-mail: ${data.get('email')}\nTelefone: ${data.get('telefone')}\n\n${data.get('mensagem')}`;
  window.location.href = `mailto:wolnei@servicont.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'Conclua o envio no seu aplicativo de e-mail. Se ele não abrir, entre em contato pelo telefone 41 - 3023 - 2005.';
});

// Carrossel sem dependências; o primeiro destaque permanece disponível sem JavaScript.
const carousel = document.querySelector('.hero-carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.hero-slide')];
  const controls = carousel.querySelector('.carousel-controls');
  const dots = [...carousel.querySelectorAll('.slide-dot')];
  const rotation = carousel.querySelector('.rotation-toggle');
  const status = carousel.querySelector('.slide-status');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let playing = !motion.matches;
  let hovering = false;
  let focused = false;
  let inView = true;
  let timer;
  let touchStart;

  function schedule() {
    window.clearTimeout(timer);
    const focusBlocks = focused && document.activeElement !== rotation;
    if (playing && !hovering && !focusBlocks && inView && !document.hidden) {
      timer = window.setTimeout(() => showSlide(current + 1), 7000);
    }
  }

  function updatePlayback() {
    rotation.setAttribute('aria-label', playing ? 'Pausar slides automáticos' : 'Iniciar slides automáticos');
    rotation.querySelector('span').textContent = playing ? 'Ⅱ' : '▶';
    schedule();
  }

  function showSlide(index, manual = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.classList.toggle('is-active', i === current);
    });
    dots.forEach((dot, i) => {
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (manual) {
      playing = false;
      status.textContent = slides[current].getAttribute('aria-label');
    }
    updatePlayback();
  }

  controls.hidden = false;
  carousel.classList.add('is-enhanced');
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i, true)));
  carousel.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => showSlide(current + Number(button.dataset.direction), true));
  });
  rotation.addEventListener('click', () => {
    playing = !playing;
    updatePlayback();
  });
  controls.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    showSlide(current + (event.key === 'ArrowRight' ? 1 : -1), true);
    dots[current].focus();
  });
  carousel.addEventListener('mouseenter', () => { hovering = true; schedule(); });
  carousel.addEventListener('mouseleave', () => { hovering = false; schedule(); });
  carousel.addEventListener('focusin', event => {
    focused = true;
    window.clearTimeout(timer);
    if (event.target !== rotation) { playing = false; updatePlayback(); }
  });
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) { focused = false; schedule(); }
  });
  const stage = carousel.querySelector('.slide-stage');
  stage.addEventListener('touchstart', event => {
    const touch = event.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(current + (dx < 0 ? 1 : -1), true);
    touchStart = null;
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { playing = false; updatePlayback(); });
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      schedule();
    }, { threshold: 0.15 });
    visibility.observe(carousel);
  }
  updatePlayback();
}

// As animações de entrada são opcionais; o conteúdo nunca depende delas.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.section-heading, .service-overview, .service-list li, .notarial-visual, .notarial-copy, .history-heading, .history-copy, .contact-copy, .form-panel').forEach((element, i) => {
    element.classList.add('will-reveal');
    element.style.setProperty('--reveal-delay', `${(i % 3) * 70}ms`);
    reveal.observe(element);
  });
}

const header = document.querySelector('.site-header');
const progress = document.querySelector('.reading-progress');
let scrollScheduled = false;
function updateScroll() {
  const length = document.documentElement.scrollHeight - window.innerHeight;
  const fraction = length > 0 ? Math.min(1, Math.max(0, window.scrollY / length)) : 0;
  progress.style.transform = `scaleX(${fraction})`;
  header.classList.toggle('is-scrolled', window.scrollY > 15);
  scrollScheduled = false;
}
function scheduleScroll() {
  if (!scrollScheduled) { scrollScheduled = true; window.requestAnimationFrame(updateScroll); }
}
window.addEventListener('scroll', scheduleScroll, { passive: true });
window.addEventListener('resize', scheduleScroll);
updateScroll();
