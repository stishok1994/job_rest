    // добавляем товар в LS 
    
    // отслеживаем нажатие на +в корзину
    window.addEventListener('click', function (event) {
        if (event.target.hasAttribute ('data-cart')) {
            // находим ближайшего родителя (карточку)
            const cartBlock = event.target.closest('.card-product')
        // создаем объект товара
        const itemInfo = {
            id: cartBlock.dataset.id,
            imgSrc: cartBlock.querySelector('.imgCart').getAttribute('src'),
            title: cartBlock.querySelector('.item-title').innerText,
            price: cartBlock.querySelector('.priceItem').innerText,
            counter: cartBlock.querySelector('[data-counter]').innerText,
        }
        
        console.log(itemInfo)
        // сБРАСЫВАЕМ СЧЕТЧИК
        cartBlock.querySelector('[data-counter]').innerText='1';

        addToCart(itemInfo);

        }
    })

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






    

    