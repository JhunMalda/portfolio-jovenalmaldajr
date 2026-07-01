/* ─── SPARKLE ─── */
(function () {
  const canvas = document.getElementById('sparkle-canvas');
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize(); window.addEventListener('resize', resize);
  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    size: Math.random() * 1.8 + .6,
    vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
    op: Math.random() * .5 + .15, dir: Math.random() > .5 ? 1 : -1
  }));
  (function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.op += p.dir * .004;
      if (p.op < .1 || p.op > .65) p.dir *= -1;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(147,197,253,${p.op})`; ctx.fill();
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      g.addColorStop(0, `rgba(191,219,254,${p.op * .25})`); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2); ctx.fill();
    });
    requestAnimationFrame(animate);
  })();
})();

/* ─── HEADER SCROLL ─── */
window.addEventListener('scroll', () => {
  document.getElementById('site-header').classList.toggle('scrolled', scrollY > 40);
});

/* ─── MOBILE MENU ─── */
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  menuBtn.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !mobileNav.contains(e.target)) {
    closeMobileNav();
  }
});

/* ─── HERO SLIDER ─── */
$(function () {
  $('.hero-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 900,
    cssEase: 'cubic-bezier(.77,0,.175,1)',
    pauseOnHover: false,
    prevArrow: '<button class="slider-arrow prev" aria-label="前へ"><img src="./img/arrow-left.png" alt=""></button>',
    nextArrow: '<button class="slider-arrow next" aria-label="次へ"><img src="./img/arrow-right.png" alt=""></button>',
  });
});

/* ─── SCROLL REVEAL ─── */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = +(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('revealed'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

(function () {
  const totalSteps = 4;
  const fill = document.getElementById('quizProgressFill');
  const currentStepEl = document.getElementById('quizCurrentStep');
  const percentEl = document.getElementById('quizPercentLabel');

  function setProgress(step) {
    const pct = Math.round((step / totalSteps) * 100);
    if (fill) fill.style.width = pct + '%';
    if (currentStepEl) currentStepEl.textContent = step > totalSteps ? totalSteps : step;
    if (percentEl) percentEl.textContent = (step > totalSteps ? 100 : pct) + '% 完了';
  }

  function goToStep(key) {
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.remove('active'));
    const target = document.querySelector('.quiz-step[data-step="' + key + '"]');
    if (target) target.classList.add('active');

    const stepNum = parseInt(key);
    if (!isNaN(stepNum)) {
      setProgress(stepNum);
    } else if (key === 'result') {
      setProgress(totalSteps + 1);
      if (currentStepEl) currentStepEl.textContent = totalSteps;
    }
  }

  document.querySelectorAll('.quiz-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const question = this.dataset.question;
      const answer =
        this.textContent
          .replace('›', '')
          .trim();
      if (question) {
        let saved =
          JSON.parse(
            sessionStorage.getItem('diagnosisAnswers')
          ) || {};
        saved[question] = answer;
        sessionStorage.setItem(
          'diagnosisAnswers',
          JSON.stringify(saved)
        );
      }
      const next = this.getAttribute('data-next');
      if (next) {
        goToStep(next);
      }
    });
  });

  const restartBtn = document.getElementById('quizRestart');
  if (restartBtn) {
    restartBtn.addEventListener('click', function () {
      goToStep('1');
    });
  }

  // Init
  setProgress(1);
})();

/* ─── NOTICE ACCORDION ─── */
(function () {

  const noticeItems = document.querySelectorAll('.notice-item');

  if (!noticeItems.length) return;

  noticeItems.forEach(item => {

    const header = item.querySelector('.notice-header');

    header.addEventListener('click', () => {

      const content = item.querySelector('.notice-content');
      const isActive = item.classList.contains('active');

      noticeItems.forEach(el => {

        el.classList.remove('active');

        const c = el.querySelector('.notice-content');

        if (c) {
          c.style.maxHeight = null;
        }

      });

      if (!isActive) {

        item.classList.add('active');

        content.style.maxHeight =
          (content.scrollHeight + 50) + 'px';

      }

    });

  });

})();

(function () {
  const data =
    JSON.parse(
      sessionStorage.getItem('diagnosisAnswers')
    );
  if (!data) return;
  const textarea =
    document.querySelector(
      '[name="お問い合わせの内容"]'
    );
  if (!textarea) return;
  textarea.value =
    `お問い合わせありがとうございます。塗装診断の結果は以下の通りです。

━━━━━━━━━━━━━━━━━━━━
■ 塗装診断結果
━━━━━━━━━━━━━━━━━━━━

【築年数】
${data["築年数"] || ""}

【外壁の状態】
${data["外壁状態"] || ""}

【前回の塗装時期】
${data["前回塗装"] || ""}

【雨漏り・水染み】
${data["雨漏り"] || ""}

━━━━━━━━━━━━━━━━━━━━
■ ご相談内容
━━━━━━━━━━━━━━━━━━━━

`;
})();