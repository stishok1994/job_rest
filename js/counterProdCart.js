// Считаем сумму заказа, уменьшаем и увеличчиваем количество товара в корзине, обновляем LS
// Подсчет суммы заказа
updateTotalPrice();

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
        }
        // Обновляем корзину в localStorage
        updateCartInStorage(cart);
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
        const priceEl = item.querySelector('#catr-price_id').innerText;
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

