// Подсчет количества товаров в корзине
let cartNum = document.querySelector('.total-num');
let numLS = JSON.parse(localStorage.getItem('cart'))?.length??0;
// console.log(numLS)
cartNum.textContent=numLS;