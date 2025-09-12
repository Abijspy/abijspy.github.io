// js/trig.js

(function() {
  // Mapping of data-animate values to CSS classes
  const ANIM_CLASSES = {
    "fade-up": "anim-fade-up",
    "fade-left": "anim-fade-left",
    "zoom-in": "anim-zoom-in",
    "zoom-out": "anim-zoom-out",
    "fade-right": "anim-fade-right",
    // add more if needed
  };

  const DEFAULT_DURATION = 900; // ms
  const DEFAULT_DELAY = 0;      // ms
  const OBSERVER_THRESHOLD = 0.1;

  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        const animType = el.getAttribute('data-animate');
        const delay = parseInt(el.getAttribute('data-animate-delay')) || DEFAULT_DELAY;
        const duration = parseInt(el.getAttribute('data-animate-duration')) || DEFAULT_DURATION;
        const animateOnce = el.hasAttribute('data-animate-once');

        const animClass = ANIM_CLASSES[animType];
        if (!animClass) {
          console.warn(`Unknown animation type "${animType}" on element:`, el);
          return;
        }

        // Apply settings
        el.style.animationDelay = `${delay}ms`;
        el.style.animationDuration = `${duration}ms`;
        // trigger animation
        el.classList.add(animClass);

        if (animateOnce) {
          obs.unobserve(el);
        }
      });
    }, { threshold: OBSERVER_THRESHOLD });

    elements.forEach(el => {
      // initial hidden state
      el.style.opacity = 0;
      observer.observe(el);
    });
  });
})();
