// ===========
// menu
// ===========

function closeMenu() {
  $(".menu-btn").removeClass("active");
  $("#backdrop").removeClass("active");
}

$(window).on("resize", function () {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

$(function () {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

$(function () {
  $(".menu-btn").on("click", function () {
    $(this).toggleClass("active");
    $("#backdrop").toggleClass("active", $(this).hasClass("active"));

    // Always show header when menu opens
    $("header").removeClass("is-hidden");
  });

  $("#backdrop").on("click", closeMenu);

  $(".nav_list .nav_item .nav_link").on("click", closeMenu);
});

// ===========
// mv - TOP
// ===========

$(function () {
  $(".mv_top_02 .mv_slider").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1500,
    infinite: true,
    fade: false,
    cssEase: "ease",
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
  });
});

// ===========
// animation
// ===========

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

$(function () {
  document
    .querySelectorAll(".animate-left, .animate-right")
    .forEach((el) => observer.observe(el));

  // CUSTOM CURSOR
  $(function () {
    const cursor = document.getElementById("custom-cursor");

    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.classList.remove("is-hide");
    });

    document.addEventListener("mouseleave", () => {
      cursor.classList.add("is-hide");
    });

    document.body.addEventListener("pointerover", (e) => {
      const el = e.target.closest("a, button, .slick-next, .slick-prev");
      if (el) cursor.classList.add("link-hover");
    });
    document.body.addEventListener("pointerout", (e) => {
      const el = e.target.closest("a, button, .slick-next, .slick-prev");
      if (el) cursor.classList.remove("link-hover");
    });
  });
});

$(function () {
  let lastScrollTop = 0;
  const $header = $("header");
  const delta = 10;
  const headerHeight = $header.outerHeight();

  $(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();

    // Ignore tiny scrolls
    if (Math.abs(lastScrollTop - scrollTop) <= delta) return;

    // Scroll down → hide header + close menu
    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      $header.addClass("is-hidden");
      closeMenu();
    }
    // Scroll up → show header
    else {
      $header.removeClass("is-hidden");
    }

    lastScrollTop = scrollTop;
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.animate-text').forEach(el => {

    // If this element has .animate-show, show it all after delay
    if (el.classList.contains('animate-show')) {
      const text = el.textContent.trim();
      el.innerHTML = text; // just insert text as is
      return; // stop here
    }

    // Normal per-letter animation
    const text = el.textContent.trim();
    el.innerHTML = "";
    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = (i * 0.04) + "s"; /* letters stagger */
      el.appendChild(span);
    });

  });
});

// RECRUIT accordion

$(document).ready(function () {
  $(".accordion_a").hide();

  $(".accordion_q").on("click", function () {
    const $accordion = $(this).closest(".accordion");
    const $answer = $accordion.find(".accordion_a");

    // close others (optional — remove if you want multiple open)
    $accordion
      .siblings(".accordion")
      .removeClass("is-open")
      .find(".accordion_a")
      .slideUp(300);

    // toggle current
    $accordion.toggleClass("is-open");
    $answer.stop(true, true).slideToggle(300);
  });
});
