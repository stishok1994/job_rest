// Отрисовываем корзину из LS 


// document.addEventListener('DOMContentLoaded', () => {
//     const cartItemsContainer = document.querySelector('.items-cart');

//     let cart = JSON.parse(localStorage.getItem('cart')) || [];
//     // let totalPrice = 0;

//     cart.forEach(item => {
//         const cartItemDiv = 
//         `<div class="row cart-element flip-in-hor-bottom" data-id="${item.id}">
//             <div class="col-3 col-md-2 d-flex justify-content-center align-items-center">
//                 <img class="img-cart" src="${item.imgSrc}" alt="">
//             </div>
//             <div class="cart-name-title col-9 col-md-6 d-flex justify-content-start align-items-center">
//                 <span class="name-prod-cart">${item.title}</span>
//             </div>
//             <div class="itemForPrice col-md-4 d-flex">
//                 <div class="action-counter_cart d-flex f-row">
//                     <div class="items-action_cart" data-action="minus">-</div>
//                     <div class="items-current_cart" data-counter>${item.counter}</div>
//                     <div class="items-action_cart" data-action="plus">+</div>
//                 </div>
//                 <div class="cart-price" data-price><span id="catr-price_id">${item.price}</span><span class="rouble"> ₽</span></div>
//                 <div class="icon-delet"><i class="fa fa-trash-o" aria-hidden="true" data-action="remove"></i></div>
//             </div>
//          </div>`;
    
//         cartItemsContainer.insertAdjacentHTML('beforeend', cartItemDiv)

//     });
//     updateTotalPrice();
// });



document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.items-cart');
    const btnDelivery = document.querySelector('.btn-delivery'); // Кнопка "Заказать доставку"
    const btnPlaceOrder = document.querySelector('.btn-place-order'); // Кнопка "Оформить заказ"

    // Получаем корзину из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Логика отображения кнопок
    if (cart.length === 0) {
        // Если корзина пуста, показываем кнопку "Заказать доставку"
        btnDelivery.style.display = 'block';
        btnPlaceOrder.style.display = 'none';
    } else {
        // Если в корзине есть товары, показываем кнопку "Оформить заказ"
        btnDelivery.style.display = 'none';
        btnPlaceOrder.style.display = 'block';

        // Отрисовка товаров в корзине
        cart.forEach(item => {
            const cartItemDiv = `
            <div class="row cart-element flip-in-hor-bottom" data-id="${item.id}">
                <div class="col-3 col-md-2 d-flex justify-content-center align-items-center">
                    <img class="img-cart" src="${item.imgSrc}" alt="">
                </div>
                <div class="cart-name-title col-9 col-md-6 d-flex justify-content-start align-items-center">
                    <span class="name-prod-cart">${item.title}</span>
                </div>
                <div class="itemForPrice col-md-4 d-flex">
                    <div class="action-counter_cart d-flex f-row">
                        <div class="items-action_cart" data-action="minus">-</div>
                        <div class="items-current_cart" data-counter>${item.counter}</div>
                        <div class="items-action_cart" data-action="plus">+</div>
                    </div>
                    <div class="cart-price" data-price><span id="cart-price_id">${item.price}</span><span class="rouble"> ₽</span></div>
                    <div class="icon-delete"><i class="fa fa-trash-o" aria-hidden="true" data-action="remove"></i></div>
                </div>
            </div>`;
            
            cartItemsContainer.insertAdjacentHTML('beforeend', cartItemDiv);
        });

        // Обновляем общую стоимость товаров
        updateTotalPrice();
    }
});
