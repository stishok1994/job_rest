  // Script for Abaut Rest
// <!-- grass -->
// const animatedGrass = document.querySelector('.img-spar');

// const observerGrass = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       animatedGrass.classList.add('rotate-scale-down');
//     } else {
//       animatedGrass.classList.remove('rotate-scale-down');
//     }
//   });
// });

// observerGrass.observe(animatedGrass);

// plates
const animatedPlates = document.querySelectorAll('.plates');

const observerPlate = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('rotate-scale-down');
    } else {
      entry.target.classList.remove('rotate-scale-down');
    }
  });
});

animatedPlates.forEach((plate) => {
  observerPlate.observe(plate);
});

