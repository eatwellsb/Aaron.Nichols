// script.js
// small interactions: counters + simple contact form behavior

document.addEventListener('DOMContentLoaded', function () {
  // Set year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Animated counters: when they enter viewport animate numbers
  const counters = document.querySelectorAll('.stat .num');
  const options = { threshold: 0.4 };
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el) {
    const target = +el.getAttribute('data-target') || 0;
    const duration = 900;
    const start = 0;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      el.textContent = Math.floor(progress * (target - start) + start);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  // Simple contact form handler (local only; replace with server endpoint)
  window.handleForm = function (ev) {
    ev.preventDefault();
    const status = document.getElementById('formStatus');
    const form = document.getElementById('contactForm');

    // Basic validation simulated
    const data = new FormData(form);
    const name = data.get('name'), email = data.get('email'), message = data.get('message');
    if (!name || !email || !message) {
      status.textContent = 'Please complete all fields.';
      return false;
    }

    status.textContent = 'Thanks — message captured locally. (This demo form is not connected to email.)';
    form.reset();
    return false; // prevent default submission
  };
});