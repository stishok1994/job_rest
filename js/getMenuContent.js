// Отрисовываем категорию по ссылке с главной странице


// Получаем URL адрес текущей страницы
const urlParams = new URLSearchParams(window.location.search);

// Получаем значение параметра 'title'
const title = urlParams.get('title');

// Выводим значение параметра 'title' в консоль
console.log(title, title.typeof);

// Меняем название категории меню
const nameSubMenu = document.querySelector('.nameSubMenu');
nameSubMenu.querySelector('h4').innerText = title;

//  отрисовываем меню по категориям

    // Получаем ссылку на категорию
    // const myUrl = `http://147.45.109.158:8881/api/category?category=${title}`
    const myUrl = `https://pinzeria.tw1.ru/api/category?category=${title}`

    // создаем функцию запроса
    async function fetchData (url) {
        try {
            respCont = await fetch (url);
            return respCont.json()
        }
        catch (error) {
            console.error('Error: ', error)
        }
    }

    // div меню
    const menuCard = document.querySelector('.content_menu');

    // Применение функции
    fetchData(myUrl)
        .then(data => {
            // console.log(`Полученные данные-`, data, `Type-`, typeof data) 
            const menuData = data;
            // console.log(menuData) 
            // Проходим по массиву
            menuData[title].forEach(dish => {
                /* Создаем объект товара и извлекаем id, название, изображение, 
                описание, вес, цену, калорийность, белки, жиры, углеводы блюда из ответа сервера */
            const productInfo = {
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
            // console.log(`Type-`, typeof productInfo.dishWeight)

            // Создаем шаблон
            const cartItemHTML = 
            `<div class="col-10 col-md-6 col-lg-4 mr-5 puff-in-center">
            <div class="card-product mb-4" data-id="${productInfo.id}">
            <img class="fullImg imgCart" src="${productInfo.dishImage}" alt="">
            <div class="card-body">
                <div class="nameTitleKBU d-flex">
                <h4 class="item-title mb-0">${productInfo.dishName}</h4>
                    <button type="button" class="btn btn-secondary btnKBU" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" 
                    data-bs-title="<div class='d-flex justify-content-between'><span class='mr-15'>Калорийность</span><span class='valEnerg'>${productInfo.dishEnergy}</span>г.</div>
                    <div class='d-flex justify-content-between'><span>Белки</span><span class='valProt'>${productInfo.dishProt}<span>г.</span></span></div>
                    <div class='d-flex justify-content-between'><span>Жиры</span><span class='valFat'>${productInfo.dishFat}<span>г.</span></span></div>
                    <div class='d-flex justify-content-between'><span>Углеводы</span><span class='valCarb'>${productInfo.dishCarbohy}<span>г.</span></span></div>">
                    КБЖУ
                    </button>
                </div>
                <div class="descript_text text-muted">${productInfo.dishDescr}</div>
                <div>
                <div class="price">
                    <div class="price__currency"><span class="priceItem">${productInfo.dishPrice}</span> ₽</div>
                </div>
                <div class="details-wrapper">
                    <div class="items counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter>1</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>
                    <button data-cart type="button" class="btn btn-block btn-outline-warning btn-color">+ В корзину</button>
                </div>
                </div>
            </div>
            </div>
    </div>`

            
            // добавляем шаблон в блок
            menuCard.insertAdjacentHTML('beforeend', cartItemHTML);

            // Инициализируем Tooltip для новых элементов
            const tooltipTriggerList = [].slice.call(menuCard.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
            });


            });
        });

            

