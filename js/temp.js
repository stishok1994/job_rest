// Оформление заказа

// URL bank registration order
// urlRegistrOrdBank = 'https://pay.alfabank.ru/payment/rest/register.do'
urlRegistrOrdBank = 'https://pinzeria.tw1.ru/proxy/register/'

// URL Rest registration order
urlRegistrOrdRest = 'https://pinzeria.tw1.ru/orders/order/'
// const urlRegistrOrdRest = 'https://pinzeria.tw1.ru/proxy/register/'


document.querySelector('.needs-validation').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Сбор данных с формы
  const firstName = document.getElementById('firstName').value;
  const phone = '8' + document.getElementById('user-phone').value;
  const street = document.getElementById('street').value;
  const house = document.getElementById('house').value;
  const flat = document.getElementById('flat').value || '';
  const entrance = document.getElementById('entrance').value || '';
  const floor = document.getElementById('floor').value || '';
  const intercom = document.getElementById('intercom').value || '';
  const orderDate = document.getElementById('orderDate').value;
  const orderTime = document.getElementById('orderTime').value || 'Ближайшее время';
  const comment = document.querySelector('.comment').value || '';

  // Определение типа доставки
  const type_order = document.getElementById('DeliveryByCourier').checked ? 'DeliveryByCourier' : 'DeliveryByClient';

  // Определение типа оплаты
  let type_payment;
  if (document.getElementById('credit').checked) {
    type_payment = 'CardOnline';
  } else if (document.getElementById('debit').checked) {
    type_payment = 'CardUponReceipt';
  } else {
    type_payment = 'Cash';
  }

  // Получение товаров из localStorage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const items = cartItems.map(item => ({
    productId: item.id,
    amount: parseInt(item.counter)
  }));

  // Сумма заказа
  // Получаем значение итоговой суммы из блока
  const totalPriceElement = document.querySelector('.total-price');
  const summa = parseFloat(totalPriceElement.textContent.trim());
  
  // Указание сдачи при оплате наличными
  let withdraw_from_wallet = "False";
  if (type_payment === 'Cash') {
    withdraw_from_wallet = document.querySelector('input[name="cashChange"]:checked') ? "True" : "False";
  }

  // Получение выбранной сдачи
  let cashChangeComment = '';
  const selectedCashChange = document.querySelector('input[name="cashChange"]:checked');
  if (selectedCashChange) {
    cashChangeComment = `Сдача с ${selectedCashChange.nextElementSibling.innerText}.`;
  }

  // Формирование комментария с датой и временем доставки
  const finalComment = `${comment} Дата доставки: ${orderDate || 'Ближайшая доступная'} Время доставки: ${orderTime} ${cashChangeComment}`;

  // Если доставка курьером, проверяем заполненность полей улицы и номера дома перед отправкой заказа
  if (type_order === 'DeliveryByCourier') {
    const streetInput = document.getElementById('street');
    const houseInput = document.getElementById('house');

    if (street.value.trim() === '' || house.value.trim() === '' ) {
      alert('Пожалуйста, заполните поле улицы и номера дома.');
      return; // Останавливаем дальнейшую отправку заказа
  }
  }


  // Формирование объекта заказа
  const orderData = {
    type_order,
    phone,
    adress: {
      street,
      house,
      flat,
      entrance,
      floor,
      doorphone: intercom
    },
    items,
    comment: finalComment,
    type_payment,
    summa,
    withdraw_from_wallet
  };

  // Если выбрана оплата онлайн, вызов функции для оплаты
  if (type_payment === 'CardOnline') {
    // Здесь должна быть вызвана функция для оплаты через банк
    
    payOnline();
    console.log('Отправка данных на оплату онлайн', orderData);
    return; // Прерываем выполнение, чтобы дождаться завершения оплаты
  }

  console.log('Отправка данных', orderData);

  // Получение токена из localStorage
  const token = localStorage.getItem('authToken');

  // Отправка данных на сервер с токеном
  fetch(urlRegistrOrdRest, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка при отправке заказа');
      }
      return response.json();
    })
    .then(data => {
      console.log('Заказ успешно отправлен:', data);
      // Здесь можно реализовать логику для уведомления пользователя
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
});




        // проверка ввода даты/времени
      //   document.addEventListener('DOMContentLoaded', function() {
      //     const orderDate = document.getElementById('orderDate');
      //     const orderTime = document.getElementById('orderTime');
          
      //     // Установка минимальной даты на сегодняшний день
      //     const today = new Date().toISOString().split('T')[0];
      //     orderDate.setAttribute('min', today);
      
      //     // Обработчик для проверки времени
      //     orderTime.addEventListener('input', function() {
      //         const timeValue = this.value;
              
      //         // Проверяем, что время в пределах от 11:00 до 22:00
      //         if (timeValue < '11:00' || timeValue > '22:00') {
      //             this.setCustomValidity('Выберите время с 11:00 до 22:00');
      //         } else {
      //             this.setCustomValidity('');
      //         }
      //     });
      // });


// регитсрация заказа

  // POST 
// async function payOnline() {
//     // Генерируем случайный orderNumber
//     const orderNumber = generateRandomString(23);


  
//     // Данные для отправки
//     const data = {
//       token: 'eqmthfcf2ms5fi077d7afj2ohi',
//       amount: 1,
//       returnUrl: 'http://147.45.109.158:8881/static/payment/payment_done.html',
//       orderNumber: orderNumber
//     };
  
//     try {
//       const response = await fetch(urlRegistrOrdBank, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });
  
//       if (response.ok) {
//         const responseData = await response.json();
//         console.log('Payment processing successful:', responseData);
//         // Здесь можно обработать дальнейшие действия, например, перенаправить пользователя на страницу оплаты
//       } else {
//         console.error('Payment processing failed:', response.status);
//         // Обработать ошибку оплаты
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       // Обработать ошибку при отправке запроса
//     }
//   }
  
//   // Вспомогательная функция для генерации случайной строки
//   function generateRandomString(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   }
  


// GET
async function payOnline() {
  // Генерируем случайный orderNumber
  const orderNumber = generateRandomString(23);

  const totalPriceElement = document.querySelector('.total-price');
  const summa = parseFloat(totalPriceElement.textContent.trim());
  // Данные для отправки
  const params = new URLSearchParams({
    token: 'eqmthfcf2ms5fi077d7afj2ohi',
    amount: 1,
    returnUrl: 'http://147.45.109.158:8881/static/payment/payment_done.html',
    orderNumber: orderNumber
  });

  try {
    const response = await fetch(`${urlRegistrOrdBank}?${params.toString()}`, {
      method: 'GET'
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Payment processing successful:', responseData);
      // Здесь можно обработать дальнейшие действия, например, перенаправить пользователя на страницу оплаты
    } else {
      console.error('Payment processing failed:', response.status);
      // Обработать ошибку оплаты
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    // Обработать ошибку при отправке запроса
  }
}

// Вспомогательная функция для генерации случайной строки
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
