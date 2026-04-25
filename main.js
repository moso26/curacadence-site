document.addEventListener('DOMContentLoaded', () => {

  // Nav frosts on scroll
  const nav = document.querySelector('nav');
  if (nav) {
    const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
