// Оформление заказа

// URL для оплаты онлайн (запрос оплаты через сервер)
urlRegistrOrdBank = 'https://pinzeria.tw1.ru/proxy/register/'

// URL для оформления заказа
urlRegistrOrdRest = 'https://pinzeria.tw1.ru/orders/order/'

// URL для статуса заказа
  URLOrderStatus = 'https://pay.alfabank.ru/payment/rest/getOrderStatusExtended.do/'
    //Статус заказа через сервер
    URLOrderStatusServer = 'https://pinzeria.tw1.ru/proxy/pay/'


document.querySelector('.needs-validation').addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // токен для оплаты онлайн
  tokenForURL = 'eqmthfcf2ms5fi077d7afj2ohi';

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
    console.log(`Тип доставки: ${type_order}`)
 
  // Определение типа оплаты
    let type_payment;
    if (document.getElementById('credit').checked) {
      type_payment = 'CardOnline';
    } else if (document.getElementById('debit').checked) {
      type_payment = 'CardUponReceipt';
    } else {
      type_payment = 'Cash';
    }
    console.log(`Тип оплаты: ${type_payment}`)

  // Получение товаров из localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const items = cartItems.map(item => ({
      productId: item.id,
      amount: parseInt(item.counter)
    }));
    
    console.log(items)


  // Итоговая сумма
  const totalPriceElement = document.querySelector('.total-price');
  const summa = parseFloat(totalPriceElement.textContent.trim());
  console.log('Final price: ', summa)

    // Указание сдачи при оплате наличными
    let withdraw_from_wallet = "False";
    if (type_payment === 'Cash') {
      withdraw_from_wallet = document.querySelector('input[name="cashChange"]:checked') ? "True" : "False";
    }
  
    // Получение выбранной сдачи
    let cashChangeComment = '';
    const selectedCashChange = document.querySelector('input[name="cashChange"]:checked');
    if (selectedCashChange) {
      cashChangeComment = `${selectedCashChange.nextElementSibling.innerText}.`;
    }
  
    // Формирование комментария с датой и временем доставки
    const finalComment = `${comment} Дата доставки: ${orderDate || 'Ближайшая доступная'} Время доставки: ${orderTime} ${cashChangeComment}`;
  
    console.log('Final comment: ', finalComment)


    // Объект заказа - Доставка
    const orderDataCourierDeliv = {
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

    // Объект заказа - Самовывоз
    const orderDataClientDeliv = {
      type_order,
      phone,
      items,
      comment: finalComment,
      type_payment,
      summa,
      withdraw_from_wallet
    };

    // Получение токена из localStorage
    const token = localStorage.getItem('authToken');


    // 1-й СЦЕНАРИЙ: ОПЛАТА ОНЛАЙН И ДОСТАВКА КУРЬЕРОМ
    // Если выбрана оплата онлайн и доставка курьером - проверяем адрес и вызываем функцию оплаты онлайн
    if (type_payment === 'CardOnline' &&  type_order === 'DeliveryByCourier') {
      
      if (street.trim() === '' || house.trim() === '' || phone.trim() === '8') {
        alert('Пожалуйста, заполните поля номера телефона, улицы и номера дома.');
        return; // Останавливаем дальнейшую отправку заказа
      }
    
      // Если поля заполнены, вызываем функцию оплаты онлайн
      payOnline(orderDataCourierDeliv);
      console.log('Отправка данных на оплату онлайн и доставку: ', orderDataCourierDeliv);

      return;
    }

    // 2-й СЦЕНАРИЙ: ОПЛАТА - ОНЛАЙН И САМОВЫВОЗ
    // Если выбрана оплата онлайн и самовывоз - проверяем телефон и вызываем функцию оплаты онлайн
    if (type_payment === 'CardOnline' &&  type_order === 'DeliveryByClient') {
      
      if (phone.trim() === '8') {
        alert('Пожалуйста, заполните поле номера телефона.');
        return; // Останавливаем дальнейшую отправку заказа
      }
    
      // Если поля заполнены, вызываем функцию оплаты онлайн
      payOnline(orderDataClientDeliv);
      console.log('Отправка данных на оплату онлайн и самовывоз: ', orderDataClientDeliv);

      return;
    }


    // 3-й СЦЕНАРИЙ: ОПЛАТА - ПРИ ПОЛУЧЕНИИ И ДОСТАВКА
    // Если выбрана оплата при получении и доставка курьером - проверяем адрес и вызываем функцию оформления заказа
    if ((type_payment === 'CardUponReceipt' || type_payment === 'Cash') &&  type_order === 'DeliveryByCourier') {
      
      if (street.trim() === '' || house.trim() === '' || phone.trim() === '8') {
        alert('Пожалуйста, заполните поля номера телефона, улицы и номера дома.');
        return; // Останавливаем дальнейшую отправку заказа
      }
    
      // Если поля заполнены, вызываем функцию оплаты
      ordering(orderDataCourierDeliv);
      console.log('Отправка данных оплата при получении и доставку: ', orderDataCourierDeliv);

      return;
    }

    // 4-й СЦЕНАРИЙ: ОПЛАТА - ПРИ ПОЛУЧЕНИИ И САМОВЫВОЗ
    // Если выбрана оплата при получении и самовывоз - проверяем номер и вызываем функцию оформления заказа
    if ( (type_payment === 'CardUponReceipt' || type_payment === 'Cash') &&  type_order === 'DeliveryByClient') {
      
      if (phone.trim() === '8') {
        alert('Пожалуйста, заполните поле номера телефона.');
        return; // Останавливаем дальнейшую отправку заказа
      }
    
      // Если поля заполнены, вызываем функцию ОФОРМЛЕНИЯ заказа
      ordering(orderDataClientDeliv);
      console.log('Отправка данных на оплату при получении и самовывоз', orderDataClientDeliv);
      
      return;
    }



        // ОПЛАТА ОНЛАЙН
        // GET
        async function payOnline(order) {
          // Генерируем случайный orderNumber
          const orderNumber = generateRandomString(23);
        
          // Данные для отправки
          const params = new URLSearchParams({
            token: tokenForURL,
            amount: summa,
            // amount: 1,
            returnUrl: 'http://147.45.109.158:8881/static/payment/payment_done.html',
            orderNumber: orderNumber
          });
        
          try {
            const response = await fetch(`${urlRegistrOrdBank}?${params.toString()}`, {
              method: 'GET'
            });
        
            if (response.ok) {
              const responseData = await response.json();
              console.log('Ответ регистрации заказа на оплату:', responseData);

              // Проверяем, что в ответе есть нужный URL
              if (responseData.formUrl) {
                // Открываем ссылку в новой вкладке
                window.open(responseData.formUrl, '_blank');
              } else {
                  console.error('URL not found in response');
                  alert('Ошибка: ссылка для оплаты не найдена.');
              }

              // функция для проверки статуса заказа
              startOrderCheck(responseData.orderId, order);

            } else {
              console.error('Payment processing failed:', response.status);
              // Обработать ошибку оплаты
            }
          } catch (error) {
            console.error('Error processing payment:', error);
            // Обработать ошибку при отправке запроса
          }
        }


        // ВСПОМОГАТЕЛЬНАЯ функция для генерации случайной строки
        function generateRandomString(length) {
          let result = '';
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
          return result;
        }

        // ПЕРИОДИЧНЫЙ ЗАПУСК СТАТУСА ЗАКАЗА
        function startOrderCheck(orderId, order, interval = 2000) {
          const checkInterval = setInterval(async () => {
              await checkOrderStatus(orderId, order);
          }, interval);
        }

        // СТАТУС ЗАКАЗА
          // GET на сервер
          async function checkOrderStatus(orderIdStatus, order) {
            try {
                // Формируем URL с параметрами token и orderId
                const url = `${URLOrderStatusServer}?token=${tokenForURL}&orderId=${orderIdStatus}`;
            
                // Отправляем GET-запрос
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            
                // Проверяем статус ответа
                if (response.ok) {
                    // Преобразуем ответ в JSON
                    const dataAnswer = await response.json();
                    console.log('Ответ статуса заказа:', dataAnswer);
                    // Проверяем статус заказа
                    if (dataAnswer.orderStatus === 2) {

                        // Оформляем заказ
                        ordering (order);

                    } else {
                        console.log('Заказ еще не завершен. Попробуем снова.');
                    }
                } else {
                    console.error('Ошибка при запросе статуса заказа:', response.status);
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        

        

      // Функция для открытия модального окна
      function showSuccessModal() {
          const modal = new bootstrap.Modal(document.getElementById('successModal'));
          modal.show();
      }

     
        // ОФОРМЛЕНИЕ ЗАКАЗА
        function ordering (order) {
          // Отправка данных на сервер с токеном
          fetch(urlRegistrOrdRest, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(order)
          })
            .then(response => {
              // console.log(response)
              if (!response.ok) {
                throw new Error('Ошибка при отправке заказа');
              }
              return response.json();
            })
            .then(data => {
              console.log('Заказ успешно отправлен:', data);

            // Успешный заказ - показываем модальное окно
            showSuccessModal();

            // Сохраняем перечень товаров и сумму в localstorage
            saveOrderData();

            // Очищаем корзину из localStorage
            localStorage.removeItem('cart');
             
            // Перенаправляем на главную страницу через 5 секунд
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4000);

            })
            .catch(error => {
              console.error('Ошибка:', error);
            });
        }


        // СОХРАНЕНИЕ КАТЕГОРИЙ И СУММЫ В LS
        function saveOrderData() {
          // Сохранение переменной summa в localStorage
          localStorage.setItem('priceOrder', summa);
      
          // Получение данных из localStorage по ключу 'cart'
          let cart = JSON.parse(localStorage.getItem('cart'));
      
          // Если cart существует и является массивом
          if (Array.isArray(cart)) {
              // Извлекаем наименования товаров (поле title)
              let orderHist = cart.map(item => item.title);
      
              // Сохраняем наименования товаров в localStorage
              localStorage.setItem('orderHist', JSON.stringify(orderHist));
          } else {
              console.error('Ошибка: данные в localStorage под ключом "cart" отсутствуют или не являются массивом.');
          }
      }
      
    
})

  