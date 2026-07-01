const loader      = document.getElementById('loader');
const logo        = document.getElementById('logo');
const siteContent = document.getElementById('site-content');

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const PHASE1 = 2000;
const PHASE2 = 500;
const PHASE3 = 600;
const TOTAL  = PHASE1 + PHASE2 + PHASE3;

const SCALE_START = 1.18;
const SCALE_END   = 0.82;

let startTime = null;

function animate(ts) {
  if (!startTime) startTime = ts;
  const elapsed = ts - startTime;

  if (elapsed < PHASE1) {
    const p     = elapsed / PHASE1;
    const e     = easeOutCubic(p);
    const scale = lerp(SCALE_START, SCALE_END, e);
    logo.style.transform = `scale(${scale})`;
    logo.style.opacity   = '1';

  } else if (elapsed < PHASE1 + PHASE2) {
    const p     = (elapsed - PHASE1) / PHASE2;
    const e     = easeInOutCubic(p);
    const scale = lerp(SCALE_END, SCALE_END - 0.06, e);
    logo.style.transform = `scale(${scale})`;
    logo.style.opacity   = `${1 - e}`;

  } else {
    const p = Math.min((elapsed - PHASE1 - PHASE2) / PHASE3, 1);
    const e = easeInOutCubic(p);
    logo.style.opacity        = '0';
    siteContent.style.opacity = `${e}`;
    loader.style.opacity      = `${1 - e}`;
  }

  if (elapsed < TOTAL) {
    requestAnimationFrame(animate);
  } else {
    loader.style.display         = 'none';
    siteContent.style.opacity    = '1';
    document.body.style.overflow = 'auto';
  }
}

requestAnimationFrame(animate);