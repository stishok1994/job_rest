// URL registration order
urlRegistrOrd = 'https://pay.alfabank.ru/payment/rest/register.do'


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.needs-validation');
    const submitButton = form.querySelector('button[type="submit"]');

    // если нажали "оформить заказ"
    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // предотвращаем отправку формы

        // итоговая цена
        const finalPrice = document.querySelector('.total-price').textContent

        // тип оплаты
        const paymentMethod = form.querySelector('input[name="paymentMethod"]:checked').id;
        // тип доставки
        const deliveryMethod = form.querySelector('input[name="DeliveryMethod"]:checked').id;

        // время доставки
        const orderDate = form.querySelector('#orderDate').value;
        const orderTime = form.querySelector('#orderTime').value;

        // в localStorage
        localStorage.setItem('paymentMethod', paymentMethod);
        localStorage.setItem('deliveryMethod', deliveryMethod);
        localStorage.setItem('orderTime', `${orderDate} ${orderTime}`);
        localStorage.setItem('finalPrice', finalPrice);

        // Здесь можно добавить код для дальнейшей обработки формы, например, отправки данных на сервер
        console.log('Тип оплаты:', paymentMethod);
        console.log('Время доставки:', `${orderDate} ${orderTime}`);

        // Регистрация заказа
        registrationOrder (urlRegistrOrd)  


    });
});



        // проверка ввода даты/времени
        document.addEventListener('DOMContentLoaded', function() {
          const orderDate = document.getElementById('orderDate');
          const orderTime = document.getElementById('orderTime');
          
          // Установка минимальной даты на сегодняшний день
          const today = new Date().toISOString().split('T')[0];
          orderDate.setAttribute('min', today);
      
          // Обработчик для проверки времени
          orderTime.addEventListener('input', function() {
              const timeValue = this.value;
              
              // Проверяем, что время в пределах от 11:00 до 22:00
              if (timeValue < '11:00' || timeValue > '22:00') {
                  this.setCustomValidity('Выберите время с 11:00 до 22:00');
              } else {
                  this.setCustomValidity('');
              }
          });
      });



// регитсрация заказа
async function registrationOrder(url) {
    // Генерируем случайный orderNumber
    const orderNumber = generateRandomString(23);
  
    // Данные для отправки
    const data = {
      token: 'eqmthfcf2ms5fi077d7afj2ohi',
      amount: 1,
      returnUrl: 'http://147.45.109.158:8881/static/payment/payment_done.html',
      orderNumber: orderNumber
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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
  

