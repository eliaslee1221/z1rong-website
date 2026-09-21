import './style.css';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const body = document.body;
const loader = document.querySelector('[data-loader]');
const progress = document.querySelector('[data-progress]');
const pinnedCard = document.querySelector('.hero-portrait');
const pinnedCardInner = pinnedCard?.querySelector('.scroll-card');
const aboutSection = document.querySelector('#about');
const abilityCards = [...document.querySelectorAll('.ability')];
const desktopNav = document.querySelector('.desktop-nav');
const navIndicator = desktopNav?.querySelector('.nav-indicator');
const navLinks = [...(desktopNav?.querySelectorAll('a[href^="#"]') || [])];
const navSections = navLinks.map((link) => document.querySelector(link.hash));

body.classList.add('is-loading');

document.querySelectorAll('.split-line').forEach((line) => {
  const label = line.textContent;
  line.textContent = '';
  [...label].forEach((character, index) => {
    const wrap = document.createElement('span');
    const glyph = document.createElement('span');
    wrap.className = 'char-wrap';
    glyph.className = 'char';
    glyph.style.setProperty('--i', index);
    glyph.textContent = character === ' ' ? '\u00a0' : character;
    wrap.append(glyph);
    line.append(wrap);
  });
});

const finishLoading = () => {
  if (loader?.classList.contains('is-done')) return;
  body.classList.remove('is-loading');
  body.classList.add('loaded');
  loader?.classList.add('is-done');
  window.setTimeout(() => loader?.remove(), 1100);
};

if (reducedMotion) finishLoading();
else {
  const greeting = document.querySelector('[data-greeting]');
  const greetings = ['HELLO', 'CIAO', 'HOLA', 'SALUT', '你好', 'ПРИВЕТ', 'HALLO', 'OLÁ', 'SELAM', 'مرحبا'];
  let greetingIndex = 0;
  const greetingTimer = window.setInterval(() => {
    greetingIndex += 1;
    if (greeting) greeting.textContent = greetings[greetingIndex % greetings.length];
    if (greetingIndex >= greetings.length - 1) window.clearInterval(greetingTimer);
  }, 135);
  window.addEventListener('load', () => window.setTimeout(finishLoading, 1850), { once: true });
}
window.setTimeout(finishLoading, 3200);

let lastScroll = window.scrollY;
const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
const mix = (from, to, amount) => from + (to - from) * clamp(amount);

const positionNavIndicator = (left, width, activeLink) => {
  if (!desktopNav || !navIndicator || !activeLink) return;
  navLinks.forEach((link) => link.classList.toggle('is-active', link === activeLink));
  navIndicator.style.width = `${width}px`;
  navIndicator.style.transform = `translate3d(${left}px,0,0)`;
};

const updateNavIndicator = (current) => {
  let activeIndex = 0;
  navSections.forEach((section, index) => { if (section && section.offsetTop <= current + 2) activeIndex = index; });
  const currentLink = navLinks[activeIndex];
  const nextLink = navLinks[activeIndex + 1];
  const currentSection = navSections[activeIndex];
  const nextSection = navSections[activeIndex + 1];
  if (!currentLink) return;
  if (!nextLink || !currentSection || !nextSection) {
    positionNavIndicator(currentLink.offsetLeft, currentLink.offsetWidth, currentLink);
    return;
  }
  const progress = clamp((current - currentSection.offsetTop) / Math.max(1, nextSection.offsetTop - currentSection.offsetTop));
  const left = mix(currentLink.offsetLeft, nextLink.offsetLeft, progress);
  const width = mix(currentLink.offsetWidth, nextLink.offsetWidth, progress);
  positionNavIndicator(left, width, progress < .5 ? currentLink : nextLink);
};

const updateAbilityStack = () => {
  if (window.innerWidth <= 900) {
    abilityCards.forEach((card) => card.classList.remove('is-buried', 'is-under'));
    return;
  }
  let activeIndex = -1;
  abilityCards.forEach((card, index) => {
    const stickyTop = Number.parseFloat(getComputedStyle(card).top) || 0;
    if (card.getBoundingClientRect().top <= stickyTop + 2) activeIndex = index;
  });
  abilityCards.forEach((card, index) => {
    card.classList.toggle('is-buried', activeIndex >= 2 && index < activeIndex - 1);
    card.classList.toggle('is-under', activeIndex >= 1 && index === activeIndex - 1);
  });
};

const updatePinnedCard = (current) => {
  if (!pinnedCard || !pinnedCardInner) return;
  if (window.innerWidth <= 900 || reducedMotion) {
    pinnedCard.style.opacity = '1';
    pinnedCard.style.transform = '';
    pinnedCardInner.style.transform = '';
    return;
  }
  const end = Math.max(window.innerHeight * 2.8, (aboutSection?.offsetTop || 5200) - window.innerHeight * .35);
  const p = clamp(current / end);
  const travel = Math.min(340, window.innerWidth * .18);
  const x = mix(0, travel, p / .2);
  const y = mix(0, 70, p / .2);
  const z = p < .2 ? mix(0, 8, p / .2) : mix(8, 0, (p - .2) / .25);
  let rotateY = 0;
  if (p >= .2 && p < .45) rotateY = mix(0, 180, (p - .2) / .25);
  else if (p >= .45 && p < .8) rotateY = 180;
  else if (p >= .8) rotateY = mix(180, 360, (p - .8) / .2);
  let scale = 1;
  if (p >= .45 && p < .65) scale = mix(1, 1.18, (p - .45) / .2);
  else if (p >= .65 && p < .8) scale = mix(1.18, 1, (p - .65) / .15);
  const aboutTop = aboutSection?.offsetTop || end + window.innerHeight;
  const fadeStart = aboutTop - window.innerHeight * .08;
  const fadeEnd = aboutTop + window.innerHeight * .48;
  pinnedCard.style.opacity = String(1 - clamp((current - fadeStart) / (fadeEnd - fadeStart)));
  pinnedCard.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,0) rotateZ(${z}deg) scale(${scale})`;
  pinnedCardInner.style.transform = `rotateY(${rotateY}deg)`;
};

let visualScroll = window.scrollY;
let targetScroll = window.scrollY;
let scrollFrame = 0;
const renderScrollMotion = () => {
  const easing = reducedMotion ? 1 : .14;
  visualScroll += (targetScroll - visualScroll) * easing;
  if (Math.abs(targetScroll - visualScroll) < .12) visualScroll = targetScroll;
  updatePinnedCard(visualScroll);
  updateNavIndicator(visualScroll);
  if (visualScroll !== targetScroll) scrollFrame = window.requestAnimationFrame(renderScrollMotion);
  else scrollFrame = 0;
};
const requestScrollMotion = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(renderScrollMotion);
};

const handleScroll = () => {
  const current = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  targetScroll = current;
  progress.style.transform = `scaleX(${max > 0 ? current / max : 0})`;
  updateAbilityStack();
  requestScrollMotion();
  lastScroll = current;
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();
window.addEventListener('resize', () => {
  visualScroll = targetScroll = window.scrollY;
  updatePinnedCard(visualScroll);
  updateNavIndicator(visualScroll);
  updateAbilityStack();
});
window.addEventListener('load', () => updateNavIndicator(window.scrollY), { once: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -7% 0px' });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const updateClock = () => {
  const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  document.querySelectorAll('[data-local-time]').forEach((element) => { element.textContent = time; });
};
updateClock();
window.setInterval(updateClock, 60_000);
document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });

if (!reducedMotion && finePointer) {
  const cursor = document.querySelector('.cursor');
  const cursorLabel = cursor.querySelector('span');
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let cursorX = pointerX;
  let cursorY = pointerY;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursor.classList.add('is-visible');
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));

  const moveCursor = () => {
    cursorX += (pointerX - cursorX) * .18;
    cursorY += (pointerY - cursorY) * .18;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(moveCursor);
  };
  moveCursor();

  document.querySelectorAll('[data-cursor]').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      cursorLabel.textContent = element.dataset.cursor;
      cursor.classList.add('is-label');
    });
    element.addEventListener('pointerleave', () => cursor.classList.remove('is-label'));
  });

  document.querySelectorAll('.magnetic').forEach((element) => {
    element.addEventListener('pointermove', (event) => {
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left - box.width / 2) * .09;
      const y = (event.clientY - box.top - box.height / 2) * .09;
      element.style.transform = `translate3d(${x}px,${y}px,0)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });

  const portrait = document.querySelector('[data-parallax]');
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 1.3;
    const y = (event.clientY / window.innerHeight - .5) * .9;
    portrait.style.marginLeft = `${x}rem`;
    portrait.style.marginTop = `${y}rem`;
  }, { passive: true });
}

class HeroModel {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.time = 0;
    this.pointer = { x: 0, y: 0 };
    this.resize = this.resize.bind(this);
    this.draw = this.draw.bind(this);
    window.addEventListener('resize', this.resize);
    canvas.closest('.hero-model')?.addEventListener('pointermove', (event) => {
      const box = canvas.getBoundingClientRect();
      this.pointer.x = (event.clientX - box.left) / box.width - .5;
      this.pointer.y = (event.clientY - box.top) / box.height - .5;
    }, { passive: true });
    this.resize();
    this.draw();
  }

  resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = Math.round(this.width * ratio);
    this.canvas.height = Math.round(this.height * ratio);
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  project(x, y, z) {
    const angle = this.time * .00035 + this.pointer.x * .6;
    const tilt = -.72 + this.pointer.y * .32;
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    const x1 = x * ca + z * sa;
    const z1 = -x * sa + z * ca;
    const y1 = y * ct - z1 * st;
    const depth = y * st + z1 * ct;
    const perspective = 4.8 / (4.8 - depth);
    const scale = Math.min(this.width, this.height) * .23;
    return { x: this.width * .5 + x1 * scale * perspective, y: this.height * .46 - y1 * scale * perspective };
  }

  curve(fixed, swap) {
    const points = [];
    for (let i = 0; i <= 30; i += 1) {
      const value = -1.8 + (3.6 * i) / 30;
      const x = swap ? fixed : value;
      const y = swap ? value : fixed;
      points.push(this.project(x, y, (x * x - y * y) * .34));
    }
    return points;
  }

  draw(timestamp = 0) {
    this.time = timestamp;
    const ctx = this.context;
    ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < 13; i += 1) {
      const fixed = -1.8 + (3.6 * i) / 12;
      [[false, 'rgba(239,135,0,.62)'], [true, 'rgba(239,239,239,.28)']].forEach(([swap, color]) => {
        const points = this.curve(fixed, swap);
        ctx.beginPath();
        points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.abs(fixed) < .01 ? 1.35 : .7;
        ctx.stroke();
      });
    }
    if (!reducedMotion) requestAnimationFrame(this.draw);
  }
}

const heroModelCanvas = document.querySelector('#hero-model-canvas');
if (heroModelCanvas) new HeroModel(heroModelCanvas);

class SaddleSurface {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.section = canvas.closest('.surface-lab');
    this.readout = document.querySelector('[data-rotation]');
    this.width = 0;
    this.height = 0;
    this.rotationX = -.92;
    this.rotationY = -.25;
    this.rotationZ = -.16;
    this.targetX = -.92;
    this.targetY = -.25;
    this.targetZ = -.16;
    this.scrollRotation = 0;
    this.dragging = false;
    this.lastPointer = { x: 0, y: 0 };
    this.frame = 0;
    this.resize = this.resize.bind(this);
    this.draw = this.draw.bind(this);
    this.updateScroll = this.updateScroll.bind(this);
    this.bind();
    this.resize();
    this.updateScroll();
    this.draw();
  }

  bind() {
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.updateScroll, { passive: true });
    this.canvas.addEventListener('pointerdown', (event) => {
      this.dragging = true;
      this.lastPointer = { x: event.clientX, y: event.clientY };
      this.canvas.setPointerCapture(event.pointerId);
    });
    this.canvas.addEventListener('pointermove', (event) => {
      if (this.dragging) {
        this.targetY += (event.clientX - this.lastPointer.x) * .008;
        this.targetX += (event.clientY - this.lastPointer.y) * .008;
        this.targetX = Math.max(-1.55, Math.min(-.18, this.targetX));
        this.lastPointer = { x: event.clientX, y: event.clientY };
      } else if (finePointer) {
        const box = this.canvas.getBoundingClientRect();
        this.targetZ = -.16 + ((event.clientX - box.left) / box.width - .5) * .22;
        this.targetX = -.92 + ((event.clientY - box.top) / box.height - .5) * .18;
      }
    }, { passive: true });
    const release = (event) => {
      this.dragging = false;
      if (this.canvas.hasPointerCapture?.(event.pointerId)) this.canvas.releasePointerCapture(event.pointerId);
    };
    this.canvas.addEventListener('pointerup', release);
    this.canvas.addEventListener('pointercancel', release);
  }

  resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = Math.round(this.width * ratio);
    this.canvas.height = Math.round(this.height * ratio);
    this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  updateScroll() {
    const box = this.section.getBoundingClientRect();
    const travel = this.section.offsetHeight - window.innerHeight;
    const sectionProgress = travel > 0 ? Math.max(0, Math.min(1, -box.top / travel)) : 0;
    this.scrollRotation = sectionProgress * Math.PI * 1.35;
  }

  project(x, y, z) {
    const cz = Math.cos(this.rotationZ);
    const sz = Math.sin(this.rotationZ);
    let x1 = x * cz - y * sz;
    let y1 = x * sz + y * cz;
    const cx = Math.cos(this.rotationX);
    const sx = Math.sin(this.rotationX);
    const y2 = y1 * cx - z * sx;
    let z2 = y1 * sx + z * cx;
    const angleY = this.rotationY + this.scrollRotation;
    const cy = Math.cos(angleY);
    const sy = Math.sin(angleY);
    const x3 = x1 * cy + z2 * sy;
    const z3 = -x1 * sy + z2 * cy;
    const perspective = 7 / (7 - z3);
    const scale = Math.min(this.width, this.height) * .17;
    return { x: this.width * .5 + x3 * scale * perspective, y: this.height * .53 - y2 * scale * perspective, depth: z3 };
  }

  curve(fixed, swap) {
    const points = [];
    const segments = 52;
    for (let i = 0; i <= segments; i += 1) {
      const value = -2.35 + (4.7 * i) / segments;
      const x = swap ? fixed : value;
      const y = swap ? value : fixed;
      const z = (x * x - y * y) * .42;
      points.push(this.project(x, y, z));
    }
    return points;
  }

  stroke(points, color, width = 1) {
    const ctx = this.context;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  renderSurface() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.width, this.height);
    const gradient = ctx.createRadialGradient(this.width * .5, this.height * .5, 10, this.width * .5, this.height * .5, Math.max(this.width, this.height) * .55);
    gradient.addColorStop(0, 'rgba(239,135,0,.055)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    const lines = 27;
    for (let i = 0; i < lines; i += 1) {
      const fixed = -2.35 + (4.7 * i) / (lines - 1);
      const center = Math.abs(fixed) < .05;
      this.stroke(this.curve(fixed, false), center ? 'rgba(239,135,0,.96)' : 'rgba(239,135,0,.38)', center ? 1.6 : .85);
      this.stroke(this.curve(fixed, true), center ? 'rgba(239,239,239,.88)' : 'rgba(239,239,239,.24)', center ? 1.35 : .75);
    }

    const origin = this.project(0, 0, 0);
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ef8700';
    ctx.fill();
  }

  draw() {
    this.rotationX += (this.targetX - this.rotationX) * .055;
    this.rotationY += (this.targetY - this.rotationY) * .045;
    this.rotationZ += (this.targetZ - this.rotationZ) * .045;
    this.renderSurface();
    if (this.frame % 6 === 0) {
      const x = Math.round(((this.rotationX * 180) / Math.PI + 360) % 360).toString().padStart(3, '0');
      const y = Math.round((((this.rotationY + this.scrollRotation) * 180) / Math.PI + 360) % 360).toString().padStart(3, '0');
      this.readout.textContent = `${x}° / ${y}°`;
    }
    this.frame += 1;
    if (!reducedMotion) requestAnimationFrame(this.draw);
  }
}

const saddleCanvas = document.querySelector('#saddle-canvas');
if (saddleCanvas) new SaddleSurface(saddleCanvas);

document.querySelectorAll('.faq-list details').forEach((details) => {
  details.addEventListener('toggle', () => {
    if (!details.open) return;
    document.querySelectorAll('.faq-list details[open]').forEach((other) => {
      if (other !== details) other.open = false;
    });
  });
});

document.querySelector('.about-actions button')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('hello@example.com');
    button.textContent = 'EMAIL COPIED ✓';
    window.setTimeout(() => { button.textContent = 'COPY EMAIL'; }, 1800);
  } catch {
    button.textContent = 'hello@example.com';
  }
});

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  if (!form.checkValidity()) {
    form.reportValidity();
    status.textContent = 'PLEASE COMPLETE EVERY REQUIRED FIELD.';
    return;
  }
  status.textContent = 'FORM INTERACTION READY — DELIVERY ADDRESS WILL BE CONNECTED WITH YOUR FINAL CONTENT.';
});

document.querySelectorAll('a, button, .ability').forEach((element) => {
  element.addEventListener('pointerdown', () => element.classList.add('is-pressed'));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => element.addEventListener(type, () => element.classList.remove('is-pressed')));
});

