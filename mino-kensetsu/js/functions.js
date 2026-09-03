/*--- sp_menu ---*/
$(function () {
  $(".sp-menu").click(function () {
    $(this).toggleClass("active");
    $(".nav-box").stop().slideToggle();
  });

  $(".nav-box a").click(function () {
    if (window.matchMedia("(max-width: 1100px)").matches) {
      $(".sp-menu").removeClass("active");
      $(".nav-box").stop().slideUp();
    }
  });
});

/*--- gotop top-header linerin ---*/
$(function () {
  $(".for-top").hide();

  $(window).on("load scroll", function () {
    if ($(this).scrollTop() > 100) {
      $(".for-top").fadeIn("fast");
    } else {
      $(".for-top").fadeOut("fast");
    }

    function window_check() {
      var w = $(window).width();
      var x = 768;
      var z = w >= x ? true : false;
      return z;
    }
  });
});

// slider
$(function () {
  $(".slider01").slick({
    slidesToScroll: 1,
    slidesToShow: 5,
    centerMode: true,
    infinite: true,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "linear",
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("header").addClass("active");
  } else {
    $("header").removeClass("active");
  }
});

$(function () {
  // === Split text for character animation ===
  document.querySelectorAll(".animate-chars").forEach((el) => {
    const text = el.innerText;
    el.innerHTML = text
      .split("")
      .map((char, i) => `<span style="transition-delay:${i * 50}ms">${char}</span>`)
      .join("");
  });

  // === IntersectionObserver for general animations (one-time only) ===
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // ✅ only once
        }
      });
    },
    { threshold: 0.3 }
  );

  // Observe text and block animations
  document.querySelectorAll(".animate-chars, .animate-text, .animate-left, .animate-right, .animate-bottom, .animate-bottom-2").forEach((el) => observer.observe(el));

  // === IntersectionObserver for dates (immediate animation) ===
  const chartObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          chartObserver.unobserve(entry.target); // ✅ only once
        }
      });
    },
    { threshold: 0 }
  );

  document.querySelectorAll(".animate-date").forEach((el) => chartObserver.observe(el));
});

/* Global mouse stalker */
$(function () {
  const cursor = document.getElementById("site-cursor");

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
    const target = event.target.closest(
      "a, button, .slick-next, .slick-prev"
    );

    if (target) {
      cursor.classList.add("link-hover");
    }
  });

  document.body.addEventListener("pointerout", function (event) {
    const target = event.target.closest(
      "a, button, .slick-next, .slick-prev"
    );

    if (target) {
      cursor.classList.remove("link-hover");
    }
  });
});

$(document).ready(function() {
  // Ensure all are closed initially
  $(".faq-start .question").removeClass("active");
  $(".faq-start .answer").hide();

  $(".faq-start .question").click(function() {
    var $this = $(this);
    var $answer = $this.next(".answer");

    if ($this.hasClass("active")) {
      // clicking the already-active question → close it
      $this.removeClass("active");
      $answer.slideUp();
    } else {
      // remove active class from all questions, close all answers
      $(".faq-start .question").removeClass("active");
      $(".faq-start .answer").slideUp();

      // activate this one, open its answer
      $this.addClass("active");
      $answer.slideDown();
    }
  });
});
// accordion

// Scroll fade-in observer (fade-left, fade-right, fade-up → adds .active)
$(function () {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".fade-left, .fade-right, .fade-up").forEach((el) => fadeObserver.observe(el));

  // GSAP parallax for hero — inner .mv-bg translates slower than scroll
  if (document.querySelector(".mv-bg") && typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".mv-bg", {
      y: 160,
      ease: "none",
      scrollTrigger: {
        trigger: ".mv",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }
});

$(document).ready(function () {
  $(".accordion_a").hide();

  $(".accordion_q").on("click", function () {
    const $accordion = $(this).closest(".accordion");
    const $answer = $accordion.find(".accordion_a");

    // close others (optional — remove if you want multiple open)
    $accordion.siblings(".accordion").removeClass("is-open").find(".accordion_a").slideUp(300);

    // toggle current
    $accordion.toggleClass("is-open");
    $answer.stop(true, true).slideToggle(300);
  });
});