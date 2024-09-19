// $('input').on('change', function() {
//     $('body').toggleClass('blue');
//   });
  
// Переменная для отслеживания текущего активного изображения
let currentIndex2 = 0;

// Функция для открытия модального окна с изображением
function openModal(src, index) {
  const modal = document.getElementById('image-modal');
  const modalImage2 = document.getElementById('modal-image');

  modalImage2.src = src; // Устанавливаем изображение в модальное окно
  modal.classList.add('active'); // Отображаем модальное окно
  currentIndex2 = index; // Запоминаем индекс текущего изображения
}

// Закрытие модального окна
function closeModal() {
  const modal = document.getElementById('image-modal');
  modal.classList.remove('active');
}

// Функция перелистывания изображений
function showNextImage2(direction) {
  const carouselItems = document.querySelectorAll('.carousel-item img'); // Все изображения карусели
  const totalItems = carouselItems.length;

  if (direction === 'next2') {
    currentIndex2 = (currentIndex2 + 1) % totalItems;
  } else if (direction === 'prev2') {
    currentIndex2 = (currentIndex2 - 1 + totalItems) % totalItems;
  }

  const newSrc = carouselItems[currentIndex2].getAttribute('data-src');
  const modalImage2 = document.getElementById('modal-image');
  modalImage2.src = newSrc; // Обновляем изображение в модальном окне
}

// Добавление событий клика на изображение карусели
document.querySelectorAll('.carousel-item img').forEach((img, index) => {
  img.addEventListener('click', (event) => {
    const imgSrc = event.target.getAttribute('data-src');
    openModal(imgSrc, index); // Открытие модального окна при клике на изображение
  });
});

// Закрытие модального окна при нажатии на крестик
document.querySelector('.close-button').addEventListener('click', () => {
  closeModal();
});

// Перелистывание изображений при нажатии на стрелки
document.querySelector('.carousel-control-next').addEventListener('click', () => showNextImage2('next2'));
document.querySelector('.carousel-control-prev').addEventListener('click', () => showNextImage2('prev2'));

// Перелистывание изображений при клике на само изображение в модальном окне
document.getElementById('modal-image').addEventListener('click', () => showNextImage2('next2'));

// Закрытие модального окна при клике за пределами изображения
document.getElementById('image-modal').addEventListener('click', (event) => {
  if (event.target.id === 'image-modal') {
    closeModal();
  }
});
