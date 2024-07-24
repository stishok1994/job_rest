
// <!-- script for Main page -->
  // <!-- left bottom board -->
  const animatedBtnBoard = document.querySelector('.slider-left_img_pizza');

  const observerBtnBoard = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatedBtnBoard.classList.add('rotate-hor-center');
      } else {
        animatedBtnBoard.classList.remove('rotate-hor-center');
      }
    });
  });

  observerBtnBoard.observe(animatedBtnBoard);


  // <!-- script for anymation top bottom board -->

  const animatedTopBoard = document.querySelector('.board-top');

  const observerTopBoard = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatedTopBoard.classList.add('rotate-vert-center');
      } else {
        animatedTopBoard.classList.remove('rotate-vert-center');
      }
    });
  });
  observerTopBoard.observe(animatedTopBoard);


  //   <!-- script for anymation pepper -->

  const animatedPepper = document.querySelector('.slider-right_img1');

  const observerPepper = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animatedPepper.classList.add('slide-left');
      } else {
        animatedPepper.classList.remove('slide-left');
      }
    });
  });
  observerPepper.observe(animatedPepper);


    //   <!-- script for slaider-title -->
    const animatedTextSlaid = document.querySelector('.slaider-title');
    let animationAppliedSlaid = false;
    
    const observerTextSlaid = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationAppliedSlaid) {
          animatedTextSlaid.classList.add('text-focus-in');
          animationAppliedSlaid = true;
        } else {
          // Не удаляем класс анимации, чтобы она не повторялась
        }
      });
    });
    
    observerTextSlaid.observe(animatedTextSlaid);
    
// Menu Title
const animatedTextMenu = document.querySelector('.menu-title');
let animationAppliedMenu = false;

const observerTextMenu = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !animationAppliedMenu) {
      animatedTextMenu.classList.add('focus-in-contract-bck');
      animationAppliedMenu = true;
    } else {
      // Не удаляем класс анимации, чтобы она не повторялась
    }
  });
});

observerTextMenu.observe(animatedTextMenu);