// Увеличиваем изображения мероприятий

document.querySelectorAll('.scale-event').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('clicked');
    });
  });