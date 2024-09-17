document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.items-cart');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // let totalPrice = 0;

    cart.forEach(item => {
        const cartItemDiv = 
        `<div class="row cart-element flip-in-hor-bottom" data-id="${item.id}">
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
                <div class="cart-price" data-price><span id="catr-price_id">${item.price}</span><span> ₽</span></div>
                <div class="icon-delet"><i class="fa fa-trash-o" aria-hidden="true" data-action="remove"></i></div>
            </div>
         </div>`;
    
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemDiv)

    });
    updateTotalPrice();
});
