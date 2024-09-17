// Заполненеие формы
// Общее количество товара
// coutingCartForOrder ();

// Отображение товаров в корзине и общей суммы
renderCartItems();

// бонусные баллы
getBonusValue()

// Имя и телефон
getNameAndPhone()

// Адрес
getAddress ()

// имя и телефон
function getNameAndPhone() {
    let nameField = document.getElementById('firstName');
    let phoneField = document.getElementById('user-phone')
    let nameLS = localStorage.getItem('firstName');
    let phoneLS = localStorage.getItem('phone');
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
      doorphone: intercomInput.value
    };

    // Сохраняем объект в localStorage в виде строки
    localStorage.setItem('address', JSON.stringify(address));
  });
});

}



// бонусные баллы
function getBonusValue() {
    let bonusNum = document.querySelector('.bonus-value');
    let bonusLS = localStorage.getItem('bonus');
    bonusNum.textContent=`${bonusLS} ₽`;
}


// Рендеринг товаров в корзине и вычисления общей суммы
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
                    <small class="text-muted name-product">${item.title}</small>
                </div>
                <div class="text-muted total-price-product">${totalPrice} ₽</div>
            </li>
        `;

        // Вставляем товар в контейнер корзины
        cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    // Вычисляем итоговую сумму с учетом бонусов
    let finalTotalAmount = totalAmount;
    if (isBonusApplied) {
        finalTotalAmount -= bonusPoints;
        if (finalTotalAmount < 0) {
            finalTotalAmount = 0;
        }
    }

    // Выводим общую сумму на экран
    totalAmountContainer.textContent = `${finalTotalAmount} ₽`;
}

// Обработчик для пересчета итоговой суммы при изменении флага списания бонусов
document.querySelector('.form-check-input').addEventListener('change', renderCartItems);


// ограничение на время
// Получаем текущую дату
const currentDate = new Date();

// Вычисляем максимальную дату (текущая дата + 1 месяц)
const maxDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

// Устанавливаем атрибут max для поля ввода даты
const orderDateInput = document.getElementById('orderDate');
orderDateInput.max = maxDate.toISOString().slice(0, 10);


// ограничение времени
  // Получаем элемент select
const orderTimeSelect = document.getElementById('orderTime');

// Функция для генерации списка времени
function generateTimeOptions() {
    // Установить начальное время на 12:00
    let hours = 12;
    let minutes = 0;

    // Сгенерировать опции от 12:00 до 22:30 с шагом 30 минут
    while (hours < 23 || (hours === 22 && minutes <= 30)) {
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        const option = document.createElement('option');
        option.value = timeString;
        option.text = timeString;
        orderTimeSelect.add(option);

        minutes += 30;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
}

// Вызываем функцию для генерации списка времени
generateTimeOptions();



// Сдача 
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


