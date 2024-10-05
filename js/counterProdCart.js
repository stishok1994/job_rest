//Считаем сумму заказа, уменьшаем и увеличчиваем количество товара в корзине, обновляем LS

// Подсчет суммы заказа
updateTotalPrice();
// Отображение оформления заказа
checkCartAndUpdateButton()

// Изменяем количество товаров в карточке на странице КОРЗИНЫ
// Добавляем прослушку на всем окне
window.addEventListener('click', (event) => {
    // Если +
    if (event.target.dataset.action === 'plus') {
        // находим родителя от кнопки
        const counterWrapper = event.target.closest('.action-counter_cart');
        const counterEl = counterWrapper.querySelector('[data-counter]');
        counterEl.innerText = ++counterEl.innerText;
        // работа с LS
        const cartElement = event.target.closest(".cart-element");
        const productId = cartElement.dataset.id;

        // Получаем текущую корзину из localStorage
        let cart = getCartFromStorage();

        // Находим товар в корзине и увеличиваем его количество
        const product = cart.find(item => item.id === (productId));
        product.counter++;

        // Обновляем корзину в localStorage
        updateCartInStorage(cart);


    } if (event.target.dataset.action === 'minus') {
        // Если -
        // находим родителя от кнопки
        const counterWrapper = event.target.closest('.action-counter_cart');

        const counterEl = counterWrapper.querySelector('[data-counter]');

        // работа с LS
        const cartElement = event.target.closest(".cart-element");
        const productId = cartElement.dataset.id;
        // Получаем текущую корзину из localStorage
        let cart = getCartFromStorage();
        // Находим товар в корзине
        const product = cart.find(item => item.id === (productId));

        if (parseInt(counterEl.innerText) > 1) {
            // Если уменьшить
            counterEl.innerText = --counterEl.innerText;
            product.counter--;
        } else if (parseInt(counterEl.innerText)===1) {
            // Удаляем товар из корзины
            event.target.closest('.cart-element').remove();
            cart = cart.filter(item => item.id !== (productId));
            checkCartAndUpdateButton()
        }
        // Обновляем корзину в localStorage
        updateCartInStorage(cart);
        checkCartAndUpdateButton()
        }
        // Удаляем товар из корзины
        if (event.target.dataset.action === 'remove') {
            // работа с LS
            const cartElement = event.target.closest(".cart-element");
            const productId = cartElement.dataset.id;
            // Получаем текущую корзину из localStorage
            let cart = getCartFromStorage();
            // Находим товар в корзине
            const product = cart.find(item => item.id === (productId));
            cart = cart.filter(item => item.id !== (productId));
             // Обновляем корзину в localStorage
            updateCartInStorage(cart);
            event.target.closest('.cart-element').remove();
            // отображение заказа
            checkCartAndUpdateButton()
        }

    // updateLocalStorage();
    updateTotalPrice();
});


// Функция подсчета суммы заказа
function updateTotalPrice() {
    const totalPriceElement = document.querySelector('.total-price');
    let priceItems = document.querySelectorAll('.itemForPrice');
    totalPrice = 0;
    priceItems.forEach(item=> {
        const amountIl = item.querySelector('.items-current_cart').innerText;
        const priceEl = item.querySelector('#cart-price_id').innerText;
        totalPrice += amountIl*priceEl
    })
    totalPriceElement.textContent=totalPrice;

}

// Функция получения данных корзины из localStorage
function getCartFromStorage() {
    const cartFromStorage = localStorage.getItem("cart");
    return cartFromStorage ? JSON.parse(cartFromStorage) : [];
    
}

// Функция обновления данных корзины в localStorage
function updateCartInStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// отображение и скрытие оформления заказа
async function checkCartAndUpdateButton() {
    // Есть ли в LocalStorage переменная cart
if (localStorage.getItem("cart")) {
    // получаем значение этой переменной
    const cart = JSON.parse(localStorage.getItem("cart"));
  
    // есть ли в корзине хотя бы один товар
    if (cart.length > 0) {
      // Если есть, отображаем кнопку
      document.querySelector(".place-order").style.display = "block";
    } else {
      // скрываем кнопку
      document.querySelector(".place-order").style.display = "none";
    }
  } else {
    // Если нет переменной "cart" в LocalStorage
    document.querySelector(".place-order").style.display = "none";
  }
}