// Функция, которая будет перемещать пользователя наверх страницы
function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Функция, которая будет показывать/скрывать кнопку "Наверх"
  window.onscroll = function() {
    toggleScrollToTopBtn();
  };
  
  function toggleScrollToTopBtn() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  }