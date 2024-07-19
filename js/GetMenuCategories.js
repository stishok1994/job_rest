// Получаем категории для меню на главной странице
// const myUrl = 'http://147.45.109.158:8881/api/category'
const myUrl = 'https://pinzeria.tw1.ru/api/category'

async function fetchData (url) {
    return fetch(url)
    .then (response => {
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);        
        }
        return response.json();
    })
    // .catch (error => {
    //     console.error(`Error data`, error);
    //     throw error 
    // })
}

// Применение функции
fetchData(myUrl)
    .then(data => {
        console.log(`Полученные данные-`, data, `Type-`, typeof data) 
        
        // Создаем массив из названий категорий и ссылок на картинки
        const categoryNames = data.categories.map(category => category.category_name);
        // console.log(categoryNames)
        const categoryImg = data.categories.map(img => img.image[0]);
        // console.log(categoryImg)

        

        // Проходим по массиву категорий
            // Получаем длину массива категорий
        const categoryLen = categoryNames.length;

            // Проходим по числам от 0 до длины массива
        for (let i = 0; i < categoryLen; i++) {
            // Получаем ссылку на картинку
            let CatImg = categoryImg[i]; /* получаем ссылку на картинку из нашего запроса*/
            let CaTitle = categoryNames[i]; /* получаем ссылку на название из нашего запроса*/
            const parentDiv = document.querySelector('.menu.row');
            // const childDivs = Array.from(parentDiv.children);

            // // Проверяем является ли индекс элемента меню 2,5,8,11,14 по списку, если да, то сдвигаем его вниз
            
            // Задайте перечень чисел, которые нужно проверить
            const numbersToCheck = [1,4,7,10,13,16];
            // Функция для проверки, входит ли число в перечень
            function isNumberInList(number) {
              return numbersToCheck.includes(number);
            }
            // // Функция для добавления класса 'down_shift' к элементу
            // function addClassToElement(element) {
            //   element.classList.add('down_shift');
            // }

            // Проверяем, входит ли число в перечень и, если да, добавляем класс
            let class_down_shift = '';

            if (isNumberInList(i)) {
              class_down_shift = "down_shift";
            }
             else {
                class_down_shift = "";
            }

            // Создаем шаблон html
            const cartItemHTML = `<div class="card-block col-sm-6 col-lg-4 mt-4${class_down_shift}">
              <a class="card-link" id="link-to-content-page">
                <div class="card cardImgPos d-flex">
                  <img src="${CatImg}" class="card-img" alt="Image">
                  <div class="cardTitle">
                    <div class="cardTitleForAbs">
                      <img src="/img/menu/forMenuTitle_two.png" class="img-for-titleCart" alt="${CaTitle}">
                      <div class="card-title_Name">
                        <h5 class="">${CaTitle}</h5>                      
                      </div>
                    </div>
                  </div>
                  <div class="btm-menu">
                    <p>Смотреть меню</p>
                  </div>
                </div>
              </a>
            </div>`;
            // добавляем шаблон в menu
            parentDiv.insertAdjacentHTML('beforeend', cartItemHTML);
        }

        // Добавляем ссылку на меню категории и вставляем URL параметр
        const cardBlocks = document.querySelectorAll('.card-block');
        // Добавляем event listener на каждый элемент с классом "card-block"
        cardBlocks.forEach((cardBlock) => {
          const cardLink = cardBlock.querySelector('a');
          cardLink.addEventListener('click', (event) => {
            // Предотвращаем переход по ссылке
            event.preventDefault();

            // Получаем текст из тега h5 внутри блока с классом "card-block"
            const cardTitle = cardBlock.querySelector('h5');
            if (cardTitle) {
              // Формируем новый URL с текстом тега h5 в качестве параметра
              const newUrl = `MenuContent.html?title=${encodeURIComponent(cardTitle.textContent)}`;

              // Переходим на новую страницу
              window.location.href = newUrl;
            } else {
              console.log('Тег h5 не найден');
            }
          });
        });
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
    
