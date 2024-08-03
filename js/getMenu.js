// Отрисовываем категорию 'Гарниры' по ссылке Заказать доставку и Меню



// Получаем категории для страницы Меню
const UrlMenuOne = 'https://pinzeria.tw1.ru/api/category'


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
fetchData(UrlMenuOne)
.then(data => {
    console.log(`get data-`, data.categories, `Type-`, typeof data) 
    
    // Создаем массив из названий категорий
    const categoryNames = data.categories[0].category_name;
    console.log(categoryNames)
    //   Ссылка для первой категории
    const UrlCategoriesOne = `https://pinzeria.tw1.ru/api/category?category=${categoryNames}`
    // Меняем название категории меню
    const nameSubMenu = document.querySelector('.nameSubMenu');
    nameSubMenu.querySelector('h4').innerText = categoryNames;
     // Вызываем внешнюю функцию и передаем в нее categoryNames
     handleCategoryNames(categoryNames, UrlCategoriesOne);

})

.catch(error => {
  console.error('Ошибка при получении данных:', error);
});

function handleCategoryNames(names, url) {
    // Применение функции
    fetchData(url)
    .then(data => {
        console.log(`Полученные данные-`, data, `Type-`, typeof data) 
        const menuCont = data;
        
        // Проходим по массиву
        menuCont[names].forEach(dish => {
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
        <img class="fullImg imgCart" src="${productInfoCat.dishImage}" alt="">
        <div class="card-body">
            <div class="nameTitleKBU d-flex">
            <h4 class="item-title mb-0">${productInfoCat.dishName}</h4>
                <button type="button" class="btn btn-secondary btnKBU" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true" 
                data-bs-title="<div class='d-flex justify-content-between'><span class='mr-15'>Калорийность </span><span class='valEnerg'>${ productInfoCat.dishEnergy}</span>г.</div>
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
                    <div class="items counter-wrapper">
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
    const contentParent = document.querySelector('.content_menu');
    contentParent.insertAdjacentHTML('beforeend', contHTML);

    // Инициализируем Tooltip для новых элементов
    const tooltipTriggerList = [].slice.call(contentParent.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    });

});
}

})







    
            

