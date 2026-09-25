import './style.css';
import { getSatelliteFrame } from './satelliteMotion.js';
const scrollStatement = document.querySelector('[data-scroll-type]');
const scrollStatementText = document.querySelector('[data-scroll-type-text]');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const body = document.body;
const loader = document.querySelector('[data-loader]');
const progress = document.querySelector('[data-progress]');
const pinnedCard = document.querySelector('.hero-portrait');
const pinnedCardInner = pinnedCard?.querySelector('.scroll-card');
const cardBackItems = [...(pinnedCard?.querySelectorAll('.card-back-list li') || [])];
const aboutSection = document.querySelector('#about');
const aboutPanel = aboutSection?.querySelector('.about');
const aboutContent = aboutSection?.querySelector('.about-content');
const skillsSection = document.querySelector('#skills');
const abilityList = document.querySelector('.ability-list');
const abilityCards = [...document.querySelectorAll('.ability')];
const recognitionHeading = document.querySelector('.recognition-head');
const recognitionRail = document.querySelector('.award-rail');
const researchHeading = document.querySelector('.research-head');
const researchLink = document.querySelector('.research-inner .portfolio-link');
const timelineHeading = document.querySelector('.timeline-head');
const timelineList = document.querySelector('.timeline-list');
const cardFront = pinnedCard?.querySelector('.scroll-card-front');
if (cardFront) {
  const flow = document.createElement('div');
  flow.className = 'about-flow';
  flow.setAttribute('role', 'img');
  flow.setAttribute('aria-label', '研究流程持續循環：數學建模、系統模型、演算法、程式實作、結果分析。');
  flow.innerHTML = `
    <div class="about-flow-head"><span>RESEARCH METHOD / 05 STEPS</span><i aria-hidden="true">✳</i></div>
    <div class="about-flow-stage" aria-hidden="true">
      <div class="about-flow-scene" style="--step:0"><span>01 / SINE CURVE</span><svg viewBox="0 0 240 140"><g class="scene-grid"><path d="M18 110 120 128 222 108M18 80l102 18 102-17M18 50l102 19 102-18M18 20l102 19 102-19M18 20v90m51-80v89m51-80v89m51-90v80m51-98v88"/></g><g class="scene-ink"><path d="M20 80h200M120 28v95"/></g><path class="scene-depth" d="M20 89c12 0 16-38 32-38s20 76 38 76 20-76 38-76 20 76 38 76 22-76 38-76 12 38 16 38"/><path class="scene-orange sine-wave" d="M20 80c12 0 16-38 32-38s20 76 38 76 20-76 38-76 20 76 38 76 22-76 38-76 12 38 16 38"/><circle class="scene-point" cx="128" cy="42" r="4"/><text class="scene-formula" x="166" y="30">sin(x)</text></svg></div>
      <div class="about-flow-scene" style="--step:1"><span>02 / BASE STATION + IOT</span><svg viewBox="0 0 240 140"><path class="network-ground" d="M15 116q105 26 210 0"/><g class="network-social"><path d="M32 101 88 113 152 113 208 101M32 101l120 12"/></g><g class="network-links"><path d="M120 72 32 101m88-29-32 41m32-41 32 41m-32-41 88 29"/></g><g class="network-signals"><circle r="3"><animateMotion path="M32 101 120 72" dur="2.8s" begin="0s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.7;1" dur="2.8s" begin="0s" repeatCount="indefinite"/></circle><circle r="3"><animateMotion path="M88 113 120 72" dur="2.8s" begin=".55s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.7;1" dur="2.8s" begin=".55s" repeatCount="indefinite"/></circle><circle r="3"><animateMotion path="M152 113 120 72" dur="2.8s" begin="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.7;1" dur="2.8s" begin="1.1s" repeatCount="indefinite"/></circle><circle r="3"><animateMotion path="M208 101 120 72" dur="2.8s" begin="1.65s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.12;.7;1" dur="2.8s" begin="1.65s" repeatCount="indefinite"/></circle></g><g class="network-waves"><path d="M109 19q-8 8 0 16m-6-22q-14 14 0 28m28-22q8 8 0 16m6-22q14 14 0 28"/></g><g class="network-tower"><circle cx="120" cy="22" r="4"/><path d="m120 29-11 45h22Z"/><path d="M113 52h14m-17 17h20M120 29v45"/><path d="M105 76h30"/></g><g class="network-iot"><circle cx="32" cy="101" r="13"/><rect x="26" y="97" width="12" height="9" rx="2"/><circle cx="32" cy="101" r="1.5"/><circle cx="88" cy="113" r="13"/><rect x="82" y="109" width="12" height="9" rx="2"/><circle cx="88" cy="113" r="1.5"/><circle cx="152" cy="113" r="13"/><rect x="146" y="109" width="12" height="9" rx="2"/><circle cx="152" cy="113" r="1.5"/><circle cx="208" cy="101" r="13"/><rect x="202" y="97" width="12" height="9" rx="2"/><circle cx="208" cy="101" r="1.5"/></g></svg></div>
      <div class="about-flow-scene" style="--step:2"><span>03 / DECISION FLOW</span><svg viewBox="0 0 240 140"><g class="scene-depth"><rect x="17" y="50" width="42" height="30" rx="5"/><path d="m119 34 34 34-34 34-34-34Z"/><rect x="181" y="26" width="40" height="25" rx="5"/><rect x="181" y="85" width="40" height="25" rx="5"/></g><g class="scene-ink"><rect x="13" y="45" width="42" height="30" rx="5"/><path d="m115 29 34 34-34 34-34-34Z"/><rect x="177" y="21" width="40" height="25" rx="5"/><rect x="177" y="80" width="40" height="25" rx="5"/><path d="M55 60h26m68 3 28-29m-28 29 28 29M33 45V26h82v3M33 75v43h164v-13"/></g><g class="scene-orange"><path d="M55 60h26m68 3 28-29"/><path d="m73 54 8 6-8 6m96-38 8 6-8 6"/></g><circle class="scene-point" cx="115" cy="63" r="4"/></svg></div>
      <div class="about-flow-scene" style="--step:3"><span>04 / CODE IN MOTION</span><div class="code-typing"><div class="code-lines" data-code-lines><div class="code-line"><span class="code-prefix">&#92;begin</span><span class="code-brace">{</span><span class="code-word">algo</span><span class="code-brace">}</span></div><div class="code-line"><span class="code-prefix">&#92;begin</span><span class="code-brace">{</span><span class="code-word">model</span><span class="code-brace">}</span></div><div class="code-line"><span class="code-prefix">&#92;begin</span><span class="code-brace">{</span><span class="code-word">result</span><span class="code-brace">}</span></div></div></div></div>
      <div class="about-flow-scene" style="--step:4"><span>05 / EVIDENCE &amp; RESULT</span><svg viewBox="0 0 240 140"><g class="scene-grid"><path d="M24 112h194M24 86h194M24 60h194M24 34h194M24 34v78m48-78v78m48-78v78m48-78v78m50-78v78"/></g><g class="scene-ink"><path d="M24 20v96h202m-10-5 10 5-10 5"/></g><path class="result-line-slow" d="M32 105 60 103 88 101 116 97 144 95 172 90 202 86"/><path class="result-line-fast" d="M32 105 60 100 88 92 116 82 144 65 172 49 202 23"/><circle class="scene-point" cx="202" cy="23" r="4"/><circle class="result-end-slow" cx="202" cy="86" r="3"/></svg></div>
    </div>
    <ol class="about-flow-list">
      <li style="--step:0"><span>01</span><b>MATH</b></li>
      <li style="--step:1"><span>02</span><b>SYSTEM MODEL</b></li>
      <li style="--step:2"><span>03</span><b>ALGORITHM</b></li>
      <li style="--step:3"><span>04</span><b>CODING</b></li>
      <li style="--step:4"><span>05</span><b>RESULT</b></li>
    </ol>
    <div class="about-flow-end"><span></span><span>MODEL → EVIDENCE</span></div>`;
  const scenes = [...flow.querySelectorAll('.about-flow-scene')];
  flow.querySelectorAll('.about-flow-list li').forEach((item, index) => {
    scenes[index].setAttribute('aria-hidden', 'true');
    item.append(scenes[index]);
  });
  flow.querySelector('.about-flow-stage')?.remove();
  cardFront.append(flow);
  const codeLines = flow.querySelector('[data-code-lines]');
  if (codeLines && !reducedMotion) {
    const words = ['math','system model','algo', 'result'];
    let wordIndex = 0;
    let characters = 0;
    const createLine = () => {
      const line = document.createElement('div');
      line.className = 'code-line';
      line.innerHTML = '<span class="code-prefix"></span><span class="code-brace"></span><span class="code-word"></span><span class="code-brace"></span><i class="code-caret"></i>';
      codeLines.append(line);
      codeLines.style.setProperty('--visible-lines', Math.min(codeLines.children.length, 3));
      return line;
    };
    const renderLine = (line, word, count) => {
      const prefix = '\\begin';
      line.children[0].textContent = prefix.slice(0, count);
      line.children[1].textContent = count > prefix.length ? '{' : '';
      line.children[2].textContent = word.slice(0, Math.max(0, count - prefix.length - 1));
      line.children[3].textContent = count > prefix.length + word.length + 1 ? '}' : '';
    };
    codeLines.replaceChildren();
    let activeLine = createLine();
    const typeCode = () => {
      if (document.hidden || !pinnedCard.classList.contains('is-about-flow')) {
        window.setTimeout(typeCode, 400);
        return;
      }
      const word = words[wordIndex];
      const length = 6 + word.length + 2;
      characters = Math.min(characters + 1, length);
      renderLine(activeLine, word, characters);
      if (characters < length) {
        window.setTimeout(typeCode, 95);
        return;
      }
      window.setTimeout(() => {
        activeLine.classList.add('is-complete');
        wordIndex = (wordIndex + 1) % words.length;
        characters = 0;
        activeLine = createLine();
        if (codeLines.children.length <= 3) {
          typeCode();
          return;
        }
        window.requestAnimationFrame(() => codeLines.classList.add('is-shifting'));
        window.setTimeout(() => {
          codeLines.classList.add('without-motion');
          codeLines.firstElementChild.remove();
          codeLines.classList.remove('is-shifting');
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
            codeLines.classList.remove('without-motion');
            typeCode();
          }));
        }, 280);
      }, 650);
    };
    window.setTimeout(typeCode, 500);
  }
}
const desktopNav = document.querySelector('.desktop-nav');
const navIndicator = desktopNav?.querySelector('.nav-indicator');
const navLinks = [...(desktopNav?.querySelectorAll('a[href^="#"]') || [])];
const navSections = navLinks.map((link) => document.querySelector(link.hash));
if (reducedMotion) document.querySelector('.orbital-system')?.pauseAnimations?.();

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
  const greetings = ['HELLO', 'CIAO', 'HOLA', 'SALUT', '你好', 'こんにちは', 'HALLO', 'OLÁ', '안녕하세요', 'مرحبا'];
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
const documentTop = (element) => {
  let top = 0;
  for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
  return top;
};
const abilityCardFlowTop = (index) => {
  if (!abilityList || !abilityCards[index]) return 0;
  const listStyle = getComputedStyle(abilityList);
  let top = documentTop(abilityList)
    + (Number.parseFloat(listStyle.borderTopWidth) || 0)
    + (Number.parseFloat(listStyle.paddingTop) || 0);
  for (let i = 0; i < index; i += 1) {
    top += abilityCards[i].offsetHeight
      + (Number.parseFloat(getComputedStyle(abilityCards[i]).marginBottom) || 0);
  }
  return top;
};

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

let activeBackCard = 0;
const updateCardBack = (index) => {
  const card = abilityCards[index];
  if (!card || !cardBackItems.length || index === activeBackCard) return;
  activeBackCard = index;
  cardBackItems.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
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
  updateCardBack(Math.max(0, activeIndex));
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
  const aboutTop = aboutSection?.offsetTop || 5200;
  const skillsTop = skillsSection?.offsetTop || window.innerHeight;
  const firstCardTop = abilityCards[0]
    ? abilityCardFlowTop(0)
    : skillsTop + window.innerHeight * .4;
  const thirdCardTop = abilityCards[2]
    ? abilityCardFlowTop(2)
    : firstCardTop + window.innerHeight * 1.4;
  const returnStart = Math.max(thirdCardTop + 1, aboutTop - window.innerHeight * 1.05);
  const returnEnd = Math.max(returnStart + 1, aboutTop - window.innerHeight * .15);
  let p;
  if (current < firstCardTop) p = mix(0, .2, current / Math.max(1, firstCardTop));
  else if (current < thirdCardTop) p = mix(.2, .45, (current - firstCardTop) / Math.max(1, thirdCardTop - firstCardTop));
  else if (current < returnStart) p = mix(.45, .8, (current - thirdCardTop) / Math.max(1, returnStart - thirdCardTop));
  else p = mix(.8, 1, (current - returnStart) / (returnEnd - returnStart));
  const aboutRect = aboutPanel?.getBoundingClientRect();
  const contentRect = aboutContent?.getBoundingClientRect();
  const baseTop = Number.parseFloat(getComputedStyle(pinnedCard).top) || window.innerHeight * .42;
  const targetCenterX = aboutRect ? aboutRect.left + aboutRect.width * .78 : window.innerWidth * .68;
  const contentDocumentTop = contentRect ? contentRect.top + window.scrollY : aboutTop + window.innerHeight * .3;
  const targetCenterY = clamp(contentDocumentTop - aboutTop + (contentRect?.height || 0) * .5, window.innerHeight * .34, window.innerHeight * .54);
  const x = mix(0, targetCenterX - window.innerWidth * .5, p / .22);
  // Once About reaches the viewport anchor, keep the card attached to that
  // section in document space instead of letting the fixed card follow the
  // viewer into the following sections.
  const dockOffset = Math.max(0, current - aboutTop);
  const y = mix(0, targetCenterY - baseTop, p / .22) - dockOffset;
  const z = p < .2 ? mix(0, 8, p / .2) : mix(8, 0, (p - .2) / .25);
  let rotateY = 0;
  if (p >= .2 && p < .45) rotateY = mix(0, 180, (p - .2) / .25);
  else if (p >= .45 && p < .8) rotateY = 180;
  else if (p >= .8) rotateY = mix(180, 360, (p - .8) / .2);
  const researchEnterProgress = clamp((current - (skillsTop - window.innerHeight * .35)) / (window.innerHeight * .55));
  const researchEnter = researchEnterProgress * researchEnterProgress * (3 - 2 * researchEnterProgress);
  const researchExitProgress = clamp((current - (aboutTop - window.innerHeight * 1.05)) / (window.innerHeight * .65));
  const researchExit = researchExitProgress * researchExitProgress * (3 - 2 * researchExitProgress);
  const scale = mix(mix(1, 1.2, researchEnter), 1, researchExit);
  pinnedCard.classList.toggle('is-research-active', researchEnter > .08 && researchExit < .94);
  pinnedCard.classList.toggle('is-about-flow', current >= returnStart);
  const panelHeight = aboutPanel?.offsetHeight || window.innerHeight;
  const fadeStart = aboutTop + Math.min(panelHeight * .58, window.innerHeight * .62);
  const fadeEnd = aboutTop + Math.min(panelHeight * .9, window.innerHeight * .94);
  const departure = clamp((current - fadeStart) / Math.max(1, fadeEnd - fadeStart));
  const departureScale = mix(1, .42, departure);
  pinnedCard.style.opacity = String(1 - departure);
  pinnedCard.style.transform = `translate(-50%,-50%) translate3d(${x}px,${y}px,0) rotateZ(${z}deg) scale(${scale * departureScale})`;
  pinnedCardInner.style.transform = `rotateY(${rotateY}deg)`;
};

let visualScroll = window.scrollY;
let targetScroll = window.scrollY;
let scrollFrame = 0;
const renderScrollMotion = () => {
  const easing = reducedMotion ? 1 : .1;
  visualScroll += (targetScroll - visualScroll) * easing;
  if (Math.abs(targetScroll - visualScroll) < .12) visualScroll = targetScroll;
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
  updatePinnedCard(current);
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

if (!reducedMotion && finePointer) {
  const snapSections = ['#home', '#skills', '#about', '#journey', '#work', '#career', '#contact']
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);
  let wheelTarget = window.scrollY;
  let wheelFrame = 0;
  let wheelSettleTimer = 0;
  let wheelVelocity = 0;

  const renderWheelMotion = () => {
    const current = window.scrollY;
    const next = current + (wheelTarget - current) * .075;
    window.scrollTo(0, Math.abs(wheelTarget - next) < .35 ? wheelTarget : next);
    if (Math.abs(wheelTarget - window.scrollY) > .5) wheelFrame = window.requestAnimationFrame(renderWheelMotion);
    else {
      wheelFrame = 0;
      document.documentElement.classList.remove('is-wheel-smoothing');
    }
  };

  const requestWheelMotion = () => {
    if (!wheelFrame) wheelFrame = window.requestAnimationFrame(renderWheelMotion);
  };

  const settleToNearbySection = () => {
    const closest = snapSections.reduce((best, section) => {
      // Do not snap into the research timeline before the preceding
      // scroll-driven statement has finished revealing its last characters.
      if (section.id === 'journey' && scrollStatement
        && wheelTarget < documentTop(scrollStatement) + window.innerHeight * .28) return best;
      let target = section.offsetTop;
      if (section.id === 'journey' && recognitionHeading && recognitionRail) {
        target = (documentTop(recognitionHeading) + documentTop(recognitionRail)
          + recognitionRail.offsetHeight) / 2 - window.innerHeight / 2;
      }
      if (section.id === 'work' && researchHeading && researchLink) {
        const contentTop = documentTop(researchHeading);
        const contentBottom = documentTop(researchLink) + researchLink.offsetHeight;
        const navClearance = (desktopNav?.offsetHeight || 0) + 36;
        const safeViewportCenter = (window.innerHeight - navClearance) / 2;
        target = (contentTop + contentBottom) / 2 - safeViewportCenter;
      }
      if (section.id === 'career' && timelineHeading && timelineList) {
        const contentTop = documentTop(timelineHeading);
        const contentBottom = documentTop(timelineList) + timelineList.offsetHeight;
        const navClearance = (desktopNav?.offsetHeight || 0) + 36;
        const safeViewportCenter = (window.innerHeight - navClearance) / 2;
        target = (contentTop + contentBottom) / 2 - safeViewportCenter;
      }
      const distance = Math.abs(target - wheelTarget);
      return !best || distance < best.distance ? { section, target, distance } : best;
    }, null);
    if (closest && closest.distance < window.innerHeight * .42) {
      wheelTarget = closest.target;
      document.documentElement.classList.add('is-wheel-smoothing');
      requestWheelMotion();
    }
  };

  window.addEventListener('wheel', (event) => {
    if (window.innerWidth <= 900 || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
    const delta = clamp(event.deltaY * unit, -360, 360);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    wheelVelocity = wheelVelocity * .38 + delta * .34;
    const inertialDistance = delta * 1.34 + wheelVelocity * 1.8;
    wheelTarget = clamp(wheelTarget + inertialDistance, 0, max);
    document.documentElement.classList.add('is-wheel-smoothing');
    requestWheelMotion();
    window.clearTimeout(wheelSettleTimer);
    wheelSettleTimer = window.setTimeout(() => {
      wheelVelocity = 0;
      settleToNearbySection();
    }, 260);
  }, { passive:false });

  window.addEventListener('pointerdown', () => {
    if (wheelFrame) window.cancelAnimationFrame(wheelFrame);
    wheelFrame = 0;
    wheelVelocity = 0;
    wheelTarget = window.scrollY;
    document.documentElement.classList.remove('is-wheel-smoothing');
  }, { passive:true });

  window.addEventListener('scroll', () => {
    if (!wheelFrame) wheelTarget = window.scrollY;
  }, { passive:true });
}

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

document.querySelectorAll('.research-card--cover').forEach((paperCard) => {
  const summary = paperCard.querySelector('.paper-summary');
  const toggle = paperCard.querySelector('.paper-summary-toggle');
  const summaryName = paperCard.classList.contains('research-card--siot') ? '論文摘要' : '研究摘要';
  let hovering = false;
  let pinnedOpen = false;
  let focusOnImage = false;
  const updateSummary = () => {
    const open = hovering || pinnedOpen || focusOnImage;
    paperCard.classList.toggle('is-summary-open', open);
    summary.inert = !open;
    summary.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', `${open ? '收起' : '展開'}${summaryName}`);
  };
  paperCard.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'touch') return;
    hovering = true;
    updateSummary();
  });
  paperCard.addEventListener('pointerleave', () => {
    hovering = false;
    updateSummary();
  });
  paperCard.addEventListener('focusin', (event) => {
    focusOnImage = event.target.classList.contains('paper-cover-art');
    updateSummary();
  });
  paperCard.addEventListener('focusout', () => {
    window.setTimeout(() => {
      focusOnImage = document.activeElement?.classList.contains('paper-cover-art') || false;
      updateSummary();
    }, 0);
  });
  toggle.addEventListener('click', () => {
    pinnedOpen = !pinnedOpen;
    updateSummary();
  });
  updateSummary();
});

document.querySelector('.about-actions button')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText('andky32199@gmail.com');
    button.textContent = 'EMAIL COPIED ✓';
    window.setTimeout(() => { button.textContent = 'COPY EMAIL'; }, 1800);
  } catch {
    button.textContent = 'andky32199@gmail.com';
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
  const data = new FormData(form);
  const subject = encodeURIComponent(`Website inquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nRole: ${data.get('role')}\nEmail: ${data.get('email')}\nTopic: ${data.get('status')}\n\n${data.get('message')}`);
  status.textContent = 'OPENING YOUR EMAIL APP…';
  window.location.href = `mailto:andky32199@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelectorAll('a, button, .ability').forEach((element) => {
  element.addEventListener('pointerdown', () => element.classList.add('is-pressed'));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => element.addEventListener(type, () => element.classList.remove('is-pressed')));
});



let scrollStatementChars = [];
if (scrollStatementText) {
  const statement = scrollStatementText.textContent.trim();
  scrollStatementText.setAttribute('aria-label', statement);
  scrollStatementText.textContent = '';
  scrollStatementChars = [...statement].map((character) => {
    const glyph = document.createElement('span');
    glyph.className = 'scroll-statement-char';
    glyph.setAttribute('aria-hidden', 'true');
    glyph.textContent = character;
    scrollStatementText.append(glyph);
    return glyph;
  });
}

const updateScrollStatement = () => {
  if (!scrollStatement || !scrollStatementChars.length) return;
  const box = scrollStatement.getBoundingClientRect();
  const start = window.innerHeight * .9;
  const end = window.innerHeight * -.28;
  const amount = reducedMotion ? 1 : clamp((start - box.top) / (start - end));
  const visibleCharacters = Math.round(scrollStatementChars.length * amount);
  scrollStatementChars.forEach((character, index) => {
    character.classList.toggle('is-typed', index < visibleCharacters);
  });
};

window.addEventListener('scroll', updateScrollStatement, { passive:true });
window.addEventListener('resize', updateScrollStatement);
updateScrollStatement();

const satelliteScene = document.querySelector('.research-card--satellite .satellite-dynamic');
if (satelliteScene) {
  const orbits = [...satelliteScene.querySelectorAll('[data-satellite-orbit]')];
  const satellites = [...satelliteScene.querySelectorAll('[data-satellite]')];
  const links = [...satelliteScene.querySelectorAll('[data-satellite-link]')];
  const packets = [...satelliteScene.querySelectorAll('[data-satellite-packet]')];
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const startedAt = performance.now();
  let visible = false;
  let frameId = 0;

  const drawSatelliteScene = (now) => {
    frameId = 0;
    const state = getSatelliteFrame(orbits, motionPreference.matches ? 0 : now - startedAt);
    state.satellites.forEach(({ x, y }, index) => {
      satellites[index].setAttribute('transform', `translate(${x} ${y})`);
    });
    state.links.forEach(({ from, to }, index) => {
      const line = links[index];
      line.setAttribute('x1', from.x);
      line.setAttribute('y1', from.y);
      line.setAttribute('x2', to.x);
      line.setAttribute('y2', to.y);
    });
    state.packets.forEach(({ x, y, progress }, index) => {
      packets[index].setAttribute('transform', `translate(${x} ${y})`);
      packets[index].style.opacity = Math.min(1, progress * 10, (1 - progress) * 10);
    });
    if (visible && !document.hidden && !motionPreference.matches) frameId = requestAnimationFrame(drawSatelliteScene);
  };

  const syncSatelliteScene = () => {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = 0;
    drawSatelliteScene(performance.now());
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) syncSatelliteScene();
    else if (frameId) { cancelAnimationFrame(frameId); frameId = 0; }
  }, { rootMargin: '100px' });
  observer.observe(satelliteScene);
  document.addEventListener('visibilitychange', syncSatelliteScene);
  motionPreference.addEventListener('change', syncSatelliteScene);
  drawSatelliteScene(startedAt);
}
