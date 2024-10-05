  // Script for Abaut Rest

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



// Открытие изображений при нажатии

// Находим все изображения с классом 'carousel-image'
const carouselImages = document.querySelectorAll('.carousel-image');
let currentImageIndex = 0; // Для отслеживания текущего изображения

// Для каждого изображения добавляем событие клика
carouselImages.forEach((image, index) => {
  image.addEventListener('click', () => {
    currentImageIndex = index; // Сохраняем индекс текущего изображения
    updateModalImage(); // Обновляем изображение в модальном окне
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show(); // Показываем модальное окно
  });
});

// Функция для обновления изображения в модальном окне
function updateModalImage() {
  const modalImage = document.getElementById('modalImage');
  modalImage.src = carouselImages[currentImageIndex].src; // Устанавливаем путь к текущему изображению
}

// Обработчик для клика по изображению в модальном окне
document.getElementById('modalImage').addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % carouselImages.length; // Переход на следующее изображение
  updateModalImage(); // Обновляем изображение в модальном окне
});


// Доп изображения
  // Функция для открытия модального окна с изображением
  function openImageModal(imageSrc) {
    const modalImageDop = document.getElementById('modalImageDop');
    modalImageDop.src = imageSrc; // Устанавливаем источник изображения
    const modal = new bootstrap.Modal(document.getElementById('imageModalDop'));
    modal.show(); // Показываем модальное окно
  }

  // Обработчик кликов на изображения в блоке второго блока
  document.querySelector('.img-second-block_pizza').addEventListener('click', function() {
    openImageModal('2.jpg'); // Указываем путь к изображению
  });

  // Обработчик кликов на изображения в нижнем блоке
  document.querySelector('.img-btm img').addEventListener('click', function() {
    openImageModal('1.jpg'); // Указываем путь к изображению
  });
