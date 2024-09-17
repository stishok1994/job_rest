// Увеличиваем изображения слайдера

const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeButton = document.querySelector('.close-button');
let currentIndex = 0;
const images = document.querySelectorAll('.carousel-item img');

document.querySelectorAll('.carousel-item img').forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    modalImage.src = img.dataset.src;
    imageModal.style.display = 'block';
    imageModal.style.zIndex = '5';
  });
});

modalImage.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  modalImage.src = images[currentIndex].dataset.src;
});

closeButton.addEventListener('click', () => {
  imageModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === imageModal) {
    imageModal.style.display = 'none';
  }
});





// Анимация к мероприятиям

// старое увеличение
// document.addEventListener('DOMContentLoaded', function() {
//   const imageContainers = document.querySelectorAll('.image-container');
//   const overlay = document.getElementById('overlay');
//   const overlayImage = document.getElementById('overlay-image');
//   const overlayClose = document.getElementById('overlay-close');

//   let currentImageContainer = null;

//   imageContainers.forEach(container => {
//       container.addEventListener('click', () => {
//           const imgSrc = container.querySelector('.image-item').src;
//           overlayImage.src = imgSrc;
//           overlay.classList.add('show');
//           currentImageContainer = container;
//       });
//   });

//   overlayClose.addEventListener('click', () => {
//       overlay.classList.remove('show');
//       currentImageContainer = null;
//   });

//   overlay.addEventListener('click', (event) => {
//       if (event.target === overlay || event.target === overlayImage) {
//           overlay.classList.remove('show');
//           currentImageContainer = null;
//       }
//   });
// })


