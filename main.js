document.addEventListener('DOMContentLoaded', () => {

  // 1. Nav scroll state
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // 2. Scroll-linked background morphing
  const bgSections = document.querySelectorAll('section[data-bg]');
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.style.backgroundColor = entry.target.dataset.bg;
        document.body.style.transition = 'background-color 0.7s cubic-bezier(0.33, 0, 0, 1)';
      }
    });
  }, { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' });
  bgSections.forEach(s => bgObserver.observe(s));

  // 3. Scroll reveal — scroll-event based (not IntersectionObserver)
  // IntersectionObserver does not fire reliably during programmatic smooth scroll
  // (anchor nav clicks, scrollIntoView). Scroll events fire on every frame.
  const revealEls = document.querySelectorAll('.reveal');

  function checkReveals() {
    revealEls.forEach(el => {
      if (el.classList.contains('revealed')) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      }
    });
  }

  // Check immediately (catches direct hash-URL arrivals where browser pre-scrolls)
  checkReveals();
  // Second pass after first paint in case browser applied hash scroll
  requestAnimationFrame(checkReveals);

  // Check on every scroll frame (passive, rAF-throttled)
  let rafScheduled = false;
  window.addEventListener('scroll', () => {
    if (!rafScheduled) {
      rafScheduled = true;
      requestAnimationFrame(() => { checkReveals(); rafScheduled = false; });
    }
  }, { passive: true });

  // 4. Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
