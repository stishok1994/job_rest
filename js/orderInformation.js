// Заполненеие формы, выбор времени, типа оплаты, типа доставки

// Адрес для стоимости доставки
const UrlDelivery2 = 'https://pinzeria.tw1.ru/orders_info/get_area_delivery/'

// стоимость доставки
getCoordinatesFromAddress();  
    
// // Отображение товаров в корзине и общей суммы
renderCartItems();
    
// бонусные баллы
getBonusValue()


// Имя и телефон
getNameAndPhone()

// Адрес
getAddress ()

// Проверка бонусов по токену
// checkTokenAndRemoveBonus()


// имя и телефон
function getNameAndPhone() {
    let nameField = document.getElementById('firstName');
    let phoneField = document.getElementById('user-phone')
    let nameLS = localStorage.getItem('firstName');
    let phoneLS = localStorage.getItem('phone');
    if (phoneLS) {
        // Убираем первую цифру
        phoneLS = phoneLS.substring(1);
    }
    nameField.value=nameLS;
    phoneField.value=phoneLS;
}


// адрес
function getAddress () {
    
const streetInput = document.getElementById('street');
const houseInput = document.getElementById('house');
const flatInput = document.getElementById('flat');
const entranceInput = document.getElementById('entrance');
const floorInput = document.getElementById('floor');
const intercomInput = document.getElementById('intercom');

// Проверяем, есть ли значение адреса в localStorage
const addressFromLS = localStorage.getItem('address');

if (addressFromLS) {
  // Если есть, то парсим данные из строки в объект
  const address = JSON.parse(addressFromLS);

  // Заполняем поля адреса

  streetInput.value = address.street;
  houseInput.value = address.house;
  flatInput.value = address.flat;
  entranceInput.value = address.entrance;
  floorInput.value = address.floor;
  intercomInput.value = address.doorphone;
}

// Обработчик события, который сохраняет введенный адрес в localStorage
const addressInputs = [
  streetInput,
  houseInput,
  flatInput,
  entranceInput,
  floorInput,
  intercomInput
];

addressInputs.forEach(input => {
  input.addEventListener('input', () => {
    // Создаем объект с данными адреса
    const address = {
      street: streetInput.value,
      house: houseInput.value,
      flat: flatInput.value,
      entrance: entranceInput.value,
      floor: floorInput.value,
      doorphone: intercomInput.value,
      city: 'Воронеж'

    };

    // Сохраняем объект в localStorage в виде строки
    localStorage.setItem('address', JSON.stringify(address));

    // расчет доставки
    getCoordinatesFromAddress()
  });
});

}



// Расчитываем стоимоть доставки

    // получение координат по адресу
        async function getCoordinatesFromAddress() {
            const address = JSON.parse(localStorage.getItem('address'));

            if (!address || !address.city || !address.street || !address.house) {
                console.error('Необходимо указать город, улицу и номер дома');
                return;
            }

            const fullAddress = `${address.city}, ${address.street}, ${address.house}`;
            const yandexGeocodeUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=7bbc8996-5061-4e08-9dc8-320bb856b117&geocode=${encodeURIComponent(fullAddress)}&format=json`;

            try {
                const response = await fetch(yandexGeocodeUrl);

                if (!response.ok) {
                    // Логируем полный ответ для диагностики
                    const errorText = await response.text();
                    console.error('Ошибка при запросе к Yandex Geocode API:', errorText);
                    throw new Error('Ошибка при запросе к Yandex Geocode API');
                }

                const data = await response.json();

                if (data.response.GeoObjectCollection.featureMember.length > 0) {
                    const geoObject = data.response.GeoObjectCollection.featureMember[0].GeoObject;
                    const coordinates = geoObject.Point.pos.split(' ');
                    const [x, y] = [coordinates[1], coordinates[0]];

                    localStorage.setItem('coordinate', JSON.stringify({ x, y }));

                    // расчитываем доставку
                    getPriceDeliveryOrder()
                } else {
                    console.error('Не удалось получить координаты для указанного адреса');
                }
            } catch (error) {
                console.error('Ошибка при получении координат:', error);
            }
        }

        // Запрос с сервера стоимости доставки
        async function getPriceDeliveryOrder() {
            // блок вывода цены доставки
            const DeliveryCostsBlockOrder = document.querySelector('.deliv-value');
            // Проверяем координаты в localStorage
            if (localStorage.getItem('coordinate')) {
                let coordinate = JSON.parse(localStorage.getItem('coordinate')) || [];
                // console.log('Запрос:', coordinate);
                const responce = await fetch (UrlDelivery2, {
                    method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(coordinate)
                });
                
                if (responce.ok) {
                    const data = await responce.json();
                    
                    // Округляем значение data.coast до целого числа
                    const roundedCost = Math.round(data.coast);

                    // Обновляем текст с ценой доставки
                    DeliveryCostsBlockOrder.textContent = `${roundedCost}`;
                    
                    // сохраняем стоимость в LS
                    localStorage.setItem('priceDeliv', JSON.stringify(data.coast));

                    // Отображение товаров в корзине и общей суммы
                    renderCartItems();

                }
                else {
                    throw new Error('Проверьте правильность адреса');
                }
            }
                
            else {
            }
            };




// бонусные баллы
function getBonusValue() {
    let bonusNum = document.querySelector('.bonus-value');
    let bonusLS = localStorage.getItem('bonus');
    if (bonusLS) {
        bonusNum.textContent = `${bonusLS}`;
    }
}



// Рендеринг товаров в корзине
function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.list-group');
    
    const totalAmountContainer = document.querySelector('.total-price');
    
    // Очищаем контейнеры перед рендерингом новых товаров
    cartContainer.innerHTML = '';
    totalAmountContainer.textContent = '0';

    let totalAmount = 0;

    const bonusPoints = parseInt(document.querySelector('.bonus-value').textContent) || 0;
    
    const isBonusApplied = document.querySelector('.form-check-input').checked;

    // Проходим по каждому товару в корзине
    cart.forEach(item => {
        const totalPrice = item.price * item.counter;

        totalAmount += totalPrice;

        const cartItemHTML = `
            <li class="list-group-item d-flex justify-content-between lh-sm">  
                <div class="">
                    <small class="text-muted name-product cart-contetn-order_color">${item.title}</small>
                </div>
                <div class="text-muted d-flex align-items-center">
                    <span class="total-price-product cart-contetn-order_color me-1">${totalPrice}</span>
                    <span class="rouble">₽</span>
                </div>
            </li>
        `;

        // Вставляем товар в контейнер корзины
        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    

    
    // Вычисляем итоговую сумму с учетом бонусов
    const delivPrice = parseInt(document.querySelector('.deliv-value').textContent);
    // Проверяем, что delivPrice является числом перед сложением
    if (!isNaN(delivPrice)) {
        totalAmount += delivPrice;
    } else {
        console.error('Стоимость доставки не является числом');
    }

    let finalTotalAmount = totalAmount;
    if (isBonusApplied) {
        finalTotalAmount -= bonusPoints;
        if (finalTotalAmount < 0) {
            finalTotalAmount = 0;
        }
    }

    // Выводим общую сумму на экран
    totalAmountContainer.textContent = `${finalTotalAmount}`;
}

// Обработчик для пересчета итоговой суммы при изменении флага списания бонусов
document.querySelector('.form-check-input').addEventListener('change', renderCartItems);



// ДАТА и ВРЕМЯ

document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById('orderDate');
    const timeSelect = document.getElementById('orderTime');
    const nearestTimeRadio = document.getElementById('nearestTime');
    const selectTimeRadio = document.getElementById('selectTime');
    const timeSelectionDiv = document.getElementById('timeSelection');
    const timeRadioGroup = document.querySelector('.time-type-text');

    // Установка сегодняшней даты по умолчанию
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    // Устанавливаем минимальную, максимальную и текущую дату
    dateInput.min = todayStr;
    dateInput.max = new Date(year, today.getMonth() + 1, day).toISOString().split("T")[0];
    dateInput.value = todayStr;

    // Функция для генерации интервалов времени
    function generateTimeOptions(startHour, startMinute = 0, endHour = 23) {
        const timeOptions = [];
        let currentHour = startHour;
        let currentMinute = startMinute;

        while (currentHour < endHour || (currentHour === endHour && currentMinute === 0)) {
            const hourStr = String(currentHour).padStart(2, '0');
            const minuteStr = String(currentMinute).padStart(2, '0');
            timeOptions.push(`${hourStr}:${minuteStr}`);
            currentMinute += 30;

            if (currentMinute >= 60) {
                currentMinute = 0;
                currentHour++;
            }
        }
        return timeOptions;
    }

    // Функция для обновления времени
    function updateTimeOptions() {
        timeSelect.innerHTML = '<option value="">Выберите время</option>';

        const selectedDate = new Date(dateInput.value);
        const isToday = selectedDate.toDateString() === today.toDateString();

        let timeOptions = [];

        if (isToday) {
            const currentHour = today.getHours() + 1;
            const currentMinute = today.getMinutes() > 30 ? 0 : 30;
            timeOptions = generateTimeOptions(currentHour, currentMinute);
        } else {
            timeOptions = generateTimeOptions(11);
        }

        timeOptions.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.text = time;
            timeSelect.appendChild(option);
        });
    }

    // Функция для обработки изменения даты
    function handleDateChange() {
        const selectedDate = new Date(dateInput.value);
        const isToday = selectedDate.toDateString() === today.toDateString();

        if (isToday) {
            // Показываем оба варианта выбора времени (ближайшее время и выбор времени)
            nearestTimeRadio.parentElement.style.display = 'block';
            selectTimeRadio.checked = false;
            nearestTimeRadio.checked = true;
            timeSelectionDiv.style.display = 'none';
        } else {
            // Скрываем вариант "Ближайшее время" и показываем список времени
            nearestTimeRadio.parentElement.style.display = 'none';
            selectTimeRadio.checked = true;
            timeSelectionDiv.style.display = 'block';
            updateTimeOptions();
        }
    }

    // Показываем или скрываем выбор времени при смене радиокнопок
    selectTimeRadio.addEventListener('change', function() {
        if (selectTimeRadio.checked) {
            timeSelectionDiv.style.display = 'block';
            updateTimeOptions();
        }
    });

    nearestTimeRadio.addEventListener('change', function() {
        if (nearestTimeRadio.checked) {
            timeSelectionDiv.style.display = 'none';
            timeSelect.innerHTML = '<option value="">Выберите время</option>';
        }
    });

    // Обновляем список времени при изменении даты
    dateInput.addEventListener('change', handleDateChange);

    // Инициализация при загрузке
    handleDateChange(); // Применяем обработку даты при первой загрузке
});




// СДАЧА

// Получаем ссылку на радиокнопки "Наличными"

const paypalRadio = document.getElementById('paypal');

// Получаем ссылку на контейнер с радиокнопками "Сдача с 100" и "Сдача с 5000"
const cashChangeOptions = document.getElementById('cash-change-options');

// Добавляем обработчик события на радиокнопки выбора способа оплаты
const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this === paypalRadio && this.checked) {
            cashChangeOptions.style.display = 'block';
        } else {
            cashChangeOptions.style.display = 'none';
        }
    });
});
// Добавляем обработчик события на форму
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    // Проверяем, выбрана ли оплата наличными
    if (!paypalRadio.checked) {
        // Если оплата наличными не выбрана, очищаем выбор сдачи
        const cashChangeRadios = document.querySelectorAll('#cash-change-options input[name="cashChange"]');
        cashChangeRadios.forEach(radio => radio.checked = false);
    }
});



// СКРЫВАЕМ адрес доставки, если выбрано "самовывоз"

    // Получаем элементы формы
    const deliveryByCourierRadio = document.getElementById('DeliveryByCourier');
    const deliveryByClientRadio = document.getElementById('DeliveryByClient');
    const addressDeliveryForm = document.querySelector('.addres-delivery_form');
    const DeliveryCostsBlockOrder = document.querySelector('.deliv-value');
                    

    // Устанавливаем обработчики событий на радиокнопки
    deliveryByCourierRadio.addEventListener('change', toggleAddressDeliveryForm);
    deliveryByClientRadio.addEventListener('change', toggleAddressDeliveryForm);

    // Функция для переключения видимости блока с адресом доставки
    function toggleAddressDeliveryForm() {
    if (deliveryByClientRadio.checked) {
        addressDeliveryForm.style.display = 'none';
        DeliveryCostsBlockOrder.textContent = `0`;
        renderCartItems()

    } else {
        addressDeliveryForm.style.display = 'block';
        getCoordinatesFromAddress()
    }
    }

    // Изначально скрываем блок с адресом доставки, если выбран самовывоз
    if (deliveryByClientRadio.checked) {
    addressDeliveryForm.style.display = 'none';
    }


    // Проверка БОНУСОВ по токену
    function checkTokenAndRemoveBonus() {
        // Получаем токен из localStorage
        const token = localStorage.getItem('authToken');
    
        // Проверяем наличие токена
        if (!token) {
            // Если токена нет, удаляем переменную bonus из localStorage
            localStorage.removeItem('bonus');
            console.log('Токен не найден. Переменная bonus удалена из localStorage.');
        } else {
        }
    }
    