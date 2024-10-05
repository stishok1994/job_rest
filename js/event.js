// Открытие альбома при клике на фото

document.querySelectorAll('.main-photo').forEach(photo => {
  photo.addEventListener('click', (event) => {
      const albumId = event.target.getAttribute('data-album');
      openAlbum(albumId);
  });
});

// Закрытие альбома по нажатию на крестик
document.querySelectorAll('.album .close').forEach(closeBtn => {
  closeBtn.addEventListener('click', (event) => {
      const album = event.target.closest('.album');
      closeAlbum(album);
  });
});

// Функция открытия альбома
function openAlbum(albumId) {
  const album = document.getElementById(albumId);
  album.classList.add('active');
}

// Функция закрытия альбома
function closeAlbum(album) {
  album.classList.remove('active');
}


// Открытие изображения при клике на картинку альбома
document.querySelectorAll('.album-photo').forEach(photo => {
  photo.addEventListener('click', (event) => {
      const modal = document.getElementById('imageModal');
      const modalImage = document.getElementById('modalImage');
      modalImage.src = event.target.src;
      modal.setAttribute('data-current', event.target.src);
      modal.classList.add('active');
  });
});

// Закрытие модального окна при клике на крестик
document.querySelector('#imageModal .close').addEventListener('click', () => {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('active');
});

// Закрытие модального окна при клике за пределами изображения
document.getElementById('imageModal').addEventListener('click', (event) => {
  if (event.target.id === 'imageModal') {
      const modal = document.getElementById('imageModal');
      modal.classList.remove('active');
  }
});


// Переменная для хранения текущего масштаба изображения
let scale = 1;

// Функция для обновления масштаба изображения
function updateImageScale() {
  const modalImage = document.getElementById('modalImage');
  modalImage.style.transform = `scale(${scale})`;
}

// Функция для обработки события прокрутки колесом мыши
function handleWheelZoom(event) {
  event.preventDefault(); // Предотвращаем прокрутку страницы

  // Увеличиваем или уменьшаем масштаб в зависимости от направления прокрутки
  if (event.deltaY < 0) {
    // Прокрутка вверх - увеличение
    scale += 0.1;
  } else {
    // Прокрутка вниз - уменьшение
    scale -= 0.1;
  }

  // Ограничиваем минимальный и максимальный масштаб
  scale = Math.min(Math.max(.5, scale), 3); // Масштаб от 0.5 до 3

  updateImageScale(); // Обновляем масштаб изображения
}

// Добавляем событие прокрутки колесом мыши для изображения в модальном окне
document.getElementById('modalImage').addEventListener('wheel', handleWheelZoom);


// Функция перелистывания изображений
function showNextImage(direction) {
  const modal = document.getElementById('imageModal');
  const currentSrc = modal.getAttribute('data-current');
  const currentAlbum = document.querySelector('.album.active');
  const photos = currentAlbum.querySelectorAll('.album-photo');
  
  let currentIndex = Array.from(photos).findIndex(photo => photo.src === currentSrc);
  
  if (direction === 'next') {
      currentIndex = (currentIndex + 1) % photos.length;
  } else if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  }

  const modalImage = document.getElementById('modalImage');
  modalImage.src = photos[currentIndex].src;
  modal.setAttribute('data-current', photos[currentIndex].src);
}

// Кнопки для перелистывания
document.querySelector('.next').addEventListener('click', () => showNextImage('next'));
document.querySelector('.prev').addEventListener('click', () => showNextImage('prev'));

// Клик по изображению для перехода к следующей картинке
document.getElementById('modalImage').addEventListener('click', () => showNextImage('next'));

