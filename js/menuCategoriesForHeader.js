// Получаем категории для страницы Меню и отрисовываем содержимое категории
//  + открытие изображений в модальном окне
const UrlMenuCat = 'https://pinzeria.tw1.ru/api/category'


async function fetchData (url) {
    try {
        respMenu = await fetch(url);
        return respMenu.json()
    }
    catch (error) {
        console.error('Error: ', error)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // function application
fetchData(UrlMenuCat)
.then(data => {
    // console.log(`get data-`, data.categories, `Type-`, typeof data) 
    
    // Создаем массив из названий категорий
    const categoryNames = data.categories.map(category => category.category_name);

    // Проходим по массиву категорий
        // Получаем длину массива категорий
    const categoryLen = categoryNames.length;

        // Проходим по числам от 0 до длины массива
    for (let i = 0; i < categoryLen; i++) {
        // Получаем ссылку на картинку
        let CaTitle = categoryNames[i]; /* получаем ссылку на название из нашего запроса*/
        const parentDiv = document.querySelector('.menu_categories');

        // Создаем шаблон html
        const cartItemHTML = `<button class="menu-item_btn">${CaTitle}</button>`;
        // добавляем шаблон в menu
        parentDiv.insertAdjacentHTML('beforeend', cartItemHTML);
    }

    // подсвечиваем первый
    addClassToFirstMenuItem();

    initializeMenuClickListeners();    
})

.catch(error => {
  console.error('Ошибка при получении данных:', error);
});



// Добавляем класс первому элементу с классом "menu-item_btn" после загрузки страницы
function addClassToFirstMenuItem() {
    // Находим первый элемент с классом "menu-item_btn"
    const firstMenuItem = document.querySelector('.menu-item_btn');

    // Добавляем класс "active" к найденному элементу
    if (firstMenuItem) {
        firstMenuItem.classList.add('frame_item');
    }
}


// отслеживание нажатия кнопки
function initializeMenuClickListeners() {
    
// Получаем все кнопки с классом "menu-item_btn"
const menuButtons = document.querySelectorAll('.menu-item_btn');
// Получаем родительский блок с классом "content_menu"
const contentParent = document.querySelector('.content_menu');

// Добавляем обработчик события клика на каждую кнопку
menuButtons.forEach((button) => {
button.addEventListener('click', (event) => {
    
    // Убираем активный класс со всех кнопок
    menuButtons.forEach(btn => btn.classList.remove('frame_item'));

    // Добавляем новый класс к нажатой кнопке
    event.target.classList.add('frame_item');
    
    // Получаем текст кнопки, на которую кликнул
    const buttonText = event.target.textContent;


    // Меняем название категории меню
    const nameSubMenu = document.querySelector('.nameSubMenu');
    nameSubMenu.querySelector('h4').innerText = buttonText;
    

// Удаляем предыдущее содержимое блока "content_parrent"
while (contentParent.firstChild) {
    contentParent.removeChild(contentParent.firstChild);
  }

//   Отрисовываем новый контент
// Получаем ссылку на категорию
const UrlCategories = `https://pinzeria.tw1.ru/api/category?category=${buttonText}`


// Применение функции
fetchData(UrlCategories)
    .then(data => {
        // console.log(`Полученные данные-`, data, `Type-`, typeof data) 
        const menuCont = data;
        
        // Проходим по массиву
        menuCont[buttonText].forEach(dish => {
            /* Создаем объект товара и извлекаем id, название, изображение, 
            описание, вес, цену, калорийность, белки, жиры, углеводы блюда из ответа сервера */
        const productInfoCat = {
            id: dish.id,
            dishName: dish.name,
            dishImage: dish.imageLinks[0],
            dishDescr: dish.description,
            dishPrice: dish.currentPrice,
            dishWeight: dish.weight, // вес 
            dishEnergy: dish.energyFullAmount, // энергетическая ценность во всем блюде
            dishProt: dish.proteinsFullAmount, //белки (во всем блюде)
            dishFat: dish.fatFullAmount, //жиры
            dishCarbohy: dish.carbohydratesFullAmount, //углеводы
        };
        // Создаем шаблон
        const contHTML = 
        `<div class="col-8 col-sm-7 col-md-5 col-lg-4 mb-3 mr-5">
    <div class="card-product scale-in-hor-center" data-id="${productInfoCat.id}">
        <img class="fullImg imgCart" src="${productInfoCat.dishImage}" alt="" data-bs-toggle="modal" data-bs-target="#imageModal">
        <div class="card-body">
            <div class="nameTitleKBU d-flex">
                <h4 class="item-title mb-0">${productInfoCat.dishName}</h4>
                <button type="button" class="btn btn-secondary btnKBU" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" 
                data-bs-title="<div class='d-flex justify-content-between'><span class='mr-15'>Калорийность </span><span class='valEnerg'>${productInfoCat.dishEnergy}</span>г.</div>
                <div class='d-flex justify-content-between'><span>Белки </span><span class='valProt'>${productInfoCat.dishProt}<span>г.</span></span></div>
                <div class='d-flex justify-content-between'><span>Жиры </span><span class='valFat'>${productInfoCat.dishFat}<span>г.</span></span></div>
                <div class='d-flex justify-content-between'><span>Углеводы </span><span class='valCarb'>${productInfoCat.dishCarbohy}<span>г.</span></span></div>">
                КБЖУ
                </button>
            </div>
            <div class="descript_text text-muted">${productInfoCat.dishDescr}</div>
            <div>
                <div class="price">
                    <div class="price__currency"><span class="priceItem">${productInfoCat.dishPrice}</span> ₽</div>
                </div>
                <div class="details-wrapper">
                    <div class="items counter-wrapper" style="display: none;">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter>1</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>
                    <button data-cart type="button" id="add_Cart" class="btnText btn btn-block  btn-outline-warning btn-color">+ В корзину</button>
                </div>
            </div>
        </div>
    </div>
</div>`

        // добавляем шаблон на экран
        contentParent.insertAdjacentHTML('beforeend', contHTML);

        // Инициализируем Tooltip для новых элементов
        const tooltipTriggerList = [].slice.call(contentParent.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    
        // проверка наличия товара в корзине и скрытие блоков "добавить в корзинуы"
        initializeCartItems();

        // Обработчик на изображениях
        handleImageClick_2();

        });

    });
    
});

});

};
  });



// Функция для инициализации товаров на странице при загрузке
function initializeCartItems() {
    // Получаем все карточки товаров на странице
    const productCards = document.querySelectorAll('.card-product');
    
    // Получаем данные корзины из localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    productCards.forEach(card => {
        const productId = card.dataset.id;
        const addToCartButton = card.querySelector('#add_Cart');
        const counterWrapper = card.querySelector('.counter-wrapper');
        const productInCart = cart.find(item => item.id === productId);

        if (productInCart) {
            // Если товар есть в корзине, показываем счетчик и скрываем кнопку "В корзину"
            counterWrapper.style.display = 'flex';
            addToCartButton.style.display = 'none';

            // Устанавливаем текущее количество товара из localStorage
            card.querySelector('[data-counter]').innerText = productInCart.counter;
        } else {
            // Если товара нет в корзине, скрываем счетчик и показываем кнопку "В корзину"
            counterWrapper.style.display = 'none';
            addToCartButton.style.display = 'block';
        }
    });
}


  
//   Открытие изображений в модальном окне
// Функция для работы с изображениями
function handleImageClick_2() {
    // Находим все изображения с классом "imgCart"
    const imgElements = document.querySelectorAll('.imgCart');

    // Вешаем событие на каждое изображение
    imgElements.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = img.getAttribute('src'); // Получаем источник изображения
            const modalImage = document.getElementById('modalImage'); // Модальное изображение
            modalImage.src = imgSrc; // Устанавливаем источник модального изображения

            // Открываем модальное окно
            const modal = new bootstrap.Modal(document.getElementById('imageModal'));
            modal.show();
        });
    });
}






