const cards = document.querySelectorAll('.card-product');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scale-in-hor-center');
      observer.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -20% 0px',
});

cards.forEach((card) => {
  observer.observe(card);
});
