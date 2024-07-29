// Удаляем токен 
const deleteTokenBlock = document.getElementById('log-out_text');

deleteTokenBlock.addEventListener('click', deleteToken);

function deleteToken() {
  if (localStorage.getItem('authToken')) {
    localStorage.removeItem('authToken');
  } else {
  }
}