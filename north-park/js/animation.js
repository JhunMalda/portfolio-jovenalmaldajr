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

/* === CUSTOM CURSOR === */

$(function () {
  const cursor = document.getElementById("project1-cursor");

  if (!cursor) return;

  document.addEventListener("mousemove", function (event) {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.remove("is-hide");
  });

  document.addEventListener("mouseleave", function () {
    cursor.classList.add("is-hide");
  });

  document.body.addEventListener("pointerover", function (event) {
    if (!(event.target instanceof Element)) return;

    const target = event.target.closest(
      "a, button, .slick-next, .slick-prev"
    );

    if (target) {
      cursor.classList.add("link-hover");
    }
  });

  document.body.addEventListener("pointerout", function (event) {
    if (!(event.target instanceof Element)) return;

    const target = event.target.closest(
      "a, button, .slick-next, .slick-prev"
    );

    if (target) {
      cursor.classList.remove("link-hover");
    }
  });
});
