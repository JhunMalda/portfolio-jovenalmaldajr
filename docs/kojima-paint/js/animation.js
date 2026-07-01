// === Split text for character animation ===
document.querySelectorAll(".animate-chars").forEach(el => {
  const text = el.innerText;
  el.innerHTML = text
    .split("")
    .map((char, i) =>
      `<span style="transition-delay:${i * 50}ms">${char}</span>`
    )
    .join("");
});

// === IntersectionObserver for general animations (one-time only) ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // ✅ only once
    }
  });
}, { threshold: 0.3 });

// Observe text and block animations
document.querySelectorAll(
  ".animate-chars, .animate-text, .animate-left, .animate-right, .animate-bottom, .animate-bottom-2"
).forEach(el => observer.observe(el));


// === IntersectionObserver for dates (immediate animation) ===
const chartObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      chartObserver.unobserve(entry.target); // ✅ only once
    }
  });
}, { threshold: 0 }); 

document.querySelectorAll(".animate-date").forEach(el => chartObserver.observe(el));

// CUSTOM CURSOR
$(function () {
    const cursor = document.getElementById('custom-cursor');

    document.addEventListener('mousemove', e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top  = `${e.clientY}px`;
    cursor.classList.remove('is-hide');
    });

    document.addEventListener('mouseleave', () => {
    cursor.classList.add('is-hide');
    });

    document.body.addEventListener('pointerover', e => {
    const el = e.target.closest('a, .slick-next, .slick-prev');
    if (el) cursor.classList.add('link-hover');
    });
    document.body.addEventListener('pointerout', e => {
    const el = e.target.closest('a, .slick-next, .slick-prev');
    if (el) cursor.classList.remove('link-hover');
    });
});
