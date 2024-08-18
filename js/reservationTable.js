// резервирование стола

urlReservTable = 'https://pinzeria.tw1.ru/orders_info/reserve_table/'

// Загрузка данных пользователя из LS
function loadUserDataFromStorage() {
  const userName = localStorage.getItem('firstName');
  const userPhone = localStorage.getItem('phone');

  if (userName) {
    document.getElementById('user-name_modal').textContent = 'Имя: ' + userName;
  }
  if (userPhone) {
    document.getElementById('user-phone_modal').textContent = 'Телефон: ' + userPhone;
  }
}

//Отправка формы на сервер
function sendReservationRequest() {
  // Данные пользователя из модального окна
  const userName = document.getElementById('user-name_modal').textContent;
  const userPhone = document.getElementById('user-phone_modal').textContent;

  // Объект с данными
  const formData = {
    name: userName,
    phone: userPhone,
  };

  // Проверяем наличие токена авторизации
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Вы должны быть авторизованы, чтобы забронировать стол.');
      return;
    }

    else {
        // запрос на сервер
  fetch(urlReservTable, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    // Обработка ответа сервера
    if (response.ok) {
      alert('Запрос на бронирование стола отправлен успешно!');
      // Закрываем модальное окно
      const modal = document.getElementById('reserv-table');
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    } else {
      alert('Ошибка при отправке запроса на бронирование стола.');
    }
  })
  .catch(error => {
    // Обработка ошибок
    console.error('Ошибка при отправке запроса:', error);
    alert('Произошла ошибка при отправке запроса на бронирование стола.');
  });
    }
}

// Обработчик события для открытия модального окна
document.querySelectorAll('.btn-reserv-table').forEach(button => {
  button.addEventListener('click', () => {
    loadUserDataFromStorage();
  });
});


// Обработчик события для отправки формы
document.querySelector('#reserv-table .btn-primary').addEventListener('click', sendReservationRequest);

  
