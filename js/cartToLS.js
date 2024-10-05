    // добавляем товар в LS 
    

// Отслеживаем нажатие на + в корзину
window.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-cart')) {
        // Находим ближайшую карточку
        const cartBlock = event.target.closest('.card-product');
        const counterWrapper = cartBlock.querySelector('.counter-wrapper');
        const addToCartButton = cartBlock.querySelector('#add_Cart');

        // Создаем объект товара
        const itemInfo = {
            id: cartBlock.dataset.id,
            imgSrc: cartBlock.querySelector('.imgCart').getAttribute('src'),
            title: cartBlock.querySelector('.item-title').innerText,
            price: cartBlock.querySelector('.priceItem').innerText,
            counter: cartBlock.querySelector('[data-counter]').innerText,
        };

        // Добавляем товар в localStorage
        addToCart(itemInfo);

        // Показать блок counter-wrapper после добавления товара в корзину
        counterWrapper.style.display = 'flex';

        // Скрыть кнопку "В корзину" после добавления товара
        addToCartButton.style.display = 'none';

        // Сбросить счетчик после добавления в корзину
        cartBlock.querySelector('[data-counter]').innerText = '1';
    }

    // Обработка увеличения и уменьшения количества товаров
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const cartBlock = event.target.closest('.card-product');
        const productId = cartBlock.dataset.id;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = cart.find(item => item.id === productId);

        // Обновляем количество товара
        if (product) {
            if (event.target.dataset.action === 'plus') {
                product.counter++;
            } else if (event.target.dataset.action === 'minus') {
                if (product.counter > 1) {
                    product.counter--;
                } else {
                    // Если количество товара равно 1, при нажатии на минус товар удаляется из корзины
                    cart = cart.filter(item => item.id !== productId);
                    cartBlock.querySelector('.counter-wrapper').style.display = 'none'; // Скрыть счетчик

                    // Показать кнопку "В корзину" после удаления товара
                    const addToCartButton = cartBlock.querySelector('#add_Cart');
                    addToCartButton.style.display = 'block';
                }
            }
        }

        // Обновляем localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Обновляем счетчик на странице
        cartBlock.querySelector('[data-counter]').innerText = product ? product.counter : 1;
    }
});

// Функция для добавления товара в корзину
function addToCart(cartItem) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === cartItem.id);

    if (existingItem) {
        existingItem.counter++;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}
