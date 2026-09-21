import './style.css';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const body = document.body;
const header = document.querySelector('[data-header]');
const loader = document.querySelector('[data-loader]');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const progress = document.querySelector('[data-progress]');

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
else window.addEventListener('load', () => window.setTimeout(finishLoading, 900), { once: true });
window.setTimeout(finishLoading, 2600);

function setMenu(open) {
  body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? 'CLOSE' : 'MENU';
}

menuButton.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

let lastScroll = window.scrollY;
const handleScroll = () => {
  const current = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  header.classList.toggle('is-scrolled', current > 20);
  const darkAtTop = [...document.querySelectorAll('.surface-lab, .research, .contact')].some((section) => {
    const box = section.getBoundingClientRect();
    return box.top <= 40 && box.bottom > 40;
  });
  header.classList.toggle('on-dark', darkAtTop);
  progress.style.transform = `scaleX(${max > 0 ? current / max : 0})`;
  lastScroll = current;
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

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

document.querySelectorAll('a, button, .ability').forEach((element) => {
  element.addEventListener('pointerdown', () => element.classList.add('is-pressed'));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => element.addEventListener(type, () => element.classList.remove('is-pressed')));
});

