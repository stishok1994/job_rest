// Отображение истории заказа

document.addEventListener("DOMContentLoaded", function () {
    // Проверяем наличие переменных orderHist и priceOrder в localStorage
    const orderHist = localStorage.getItem('orderHist');
    const priceOrder = localStorage.getItem('priceOrder');
    const orderBlock = document.querySelector('.order-block'); 

    orderBlock.style.display = 'block';

    if (orderHist && priceOrder) {
        // Если переменные существуют, парсим данные из orderHist
        const orderItems = JSON.parse(orderHist); // Массив названий товаров

        // Находим блоки с классами hist-order_title и hist-order_price
        const orderTitleBlock = document.querySelector('.order-items-list');
        const orderPriceBlock = document.querySelector('.total-price-order');
        

        if (orderTitleBlock && orderPriceBlock) {
            // Очищаем содержимое блоков перед вставкой новых данных
            orderTitleBlock.innerHTML = '';
            orderPriceBlock.innerHTML = '';

            // Формируем список товаров
            const itemList = document.createElement('ul');
            orderItems.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item; // Вставляем название товара
                itemList.appendChild(listItem);
            });

            // Вставляем список товаров в блок hist-order_title
            orderTitleBlock.appendChild(itemList);

            // Вставляем общую сумму в блок hist-order_price
            orderPriceBlock.textContent = `${priceOrder} ₽`;
        }
        
    }
    else {
        orderBlock.style.display = 'none';
    }
});

