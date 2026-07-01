let lastScrollTop = 0;

function handleScroll() {
  const html = document.documentElement;
  const body = document.body;
  const scrollTop = window.scrollY;
  const baseWhite = document.querySelector(".is-base-white");

  // Toggle 'is-header-hide' when scrolled 100px past 'is-scrolled-away'
    // Add 'is-scrolled' when scrolling starts
    if (scrollTop > 0) {
      html.classList.add("is-scrolled");
      body.classList.add("is-body-scrolled");
    } else {
      html.classList.remove("is-scrolled");
      body.classList.remove("is-body-scrolled");
    }

     // Add 'is-scrolled-away' when scrolled 500px from top
     if (scrollTop >= 500) {
      html.classList.add("is-scrolled-away");
      console.log('y')
    } else {
      html.classList.remove("is-scrolled-away");
      console.log('n')
    }
  if (window.innerWidth > 768) {

    if (scrollTop >= 600 && scrollTop > lastScrollTop) {
      html.classList.add("is-header-hide");
    } else if (scrollTop < lastScrollTop) {
      html.classList.remove("is-header-hide");
    }

    // Toggle 'is-bg-white' based on 'is-base-white' reaching the top of the screen
    if (baseWhite) {
      const rect = baseWhite.getBoundingClientRect();
      if (rect.top <= 0) {
        html.classList.add("is-bg-white");
      } else {
        html.classList.remove("is-bg-white");
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
  }
}

document.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", function () {
  const hoverTriggers = document.querySelectorAll(".hover-trigger");
  const body = document.body;

  hoverTriggers.forEach((trigger) => {
    trigger.addEventListener("mouseenter", function () {
      body.classList.add("is-bg-black");
    });
    trigger.addEventListener("mouseleave", function () {
      body.classList.remove("is-bg-black");
    });
  });
});
