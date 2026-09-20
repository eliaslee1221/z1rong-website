import './style.css';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '關閉' : '選單';
}

menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

let previousScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  header.classList.toggle('is-hidden', currentScroll > previousScroll && currentScroll > 160 && !document.body.classList.contains('menu-open'));
  header.classList.toggle('is-scrolled', currentScroll > 24);
  previousScroll = currentScroll;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.split-text').forEach((element) => {
  const text = element.textContent;
  element.textContent = '';
  [...text].forEach((character, index) => {
    const clip = document.createElement('span');
    const glyph = document.createElement('span');
    clip.className = 'char-clip';
    glyph.className = 'char';
    glyph.style.setProperty('--char-index', index);
    glyph.textContent = character === ' ' ? '\u00a0' : character;
    clip.append(glyph);
    element.append(clip);
  });
  requestAnimationFrame(() => element.classList.add('is-visible'));
});

if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let currentX = pointerX;
  let currentY = pointerY;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    glow.classList.add('is-active');
  }, { passive: true });

  const animateGlow = () => {
    currentX += (pointerX - currentX) * 0.12;
    currentY += (pointerY - currentY) * 0.12;
    glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();

  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * 0.16;
      const y = (event.clientY - box.top - box.height / 2) * 0.16;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });

  document.querySelectorAll('.project-card').forEach((card) => {
    const visual = card.querySelector('.project-visual');
    card.addEventListener('pointermove', (event) => {
      const box = card.getBoundingClientRect();
      const rotateX = ((event.clientY - box.top) / box.height - 0.5) * -2.5;
      const rotateY = ((event.clientX - box.left) / box.width - 0.5) * 2.5;
      visual.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('pointerleave', () => { visual.style.transform = ''; });
  });
}

const updateClock = () => {
  const time = new Intl.DateTimeFormat('zh-TW', {
    timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', hour12: false
  }).format(new Date());
  document.querySelectorAll('[data-local-time]').forEach((element) => { element.textContent = time; });
};
updateClock();
setInterval(updateClock, 60_000);
document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

document.querySelectorAll('a, button, .project-card').forEach((element) => {
  element.addEventListener('pointerdown', () => element.classList.add('is-pressed'));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => {
    element.addEventListener(type, () => element.classList.remove('is-pressed'));
  });
});

