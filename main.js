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

  // 3. Scroll reveal — fade up
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // 4. Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
