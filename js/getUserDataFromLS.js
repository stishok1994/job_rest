// получаем данные пользователя для личного кабинета 

const UrlBonus = 'https://pinzeria.tw1.ru/auth/wallet_balances/'

function loadUserDataFromStorage () {
    // получаем данные из LS
    const userName = localStorage.getItem('firstName')
    const userPhone = localStorage.getItem('phone')
    const userToken = localStorage.getItem('authToken')

      // данные из localStorage
  if (userName) {
    document.getElementById('user-name').textContent = userName;
  }
  if (userPhone) {
    document.getElementById('user-phone').textContent = userPhone;
  }

  getUserBonus(userToken)

}

// Получение баллов
function getUserBonus (token) {

  // Отправляем GET-запрос с токеном
  fetch(UrlBonus, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      // Обработка успешного ответа
      return response.json();
    } else {
      // Обработка ошибки
      throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
    }
  })
  .then(data => {
    document.getElementById('user-bonus').textContent = data['Баланс бонусных баллов'];
    // console.log(data);
  })
  .catch(error => {
    // Обработка ошибки
    console.error(error);
  });
}

window.addEventListener('load', loadUserDataFromStorage);