// request authorization

const AuthURL = 'https://pinzeria.tw1.ru/auth/login/'


async function login (userData) {
    try {
        const responce = await fetch (AuthURL, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (responce.ok) {
                const data = await responce.json();
                return data.access_token // get token
            }
            else {
                throw new Error('Ошибка авторизации');
            }}
    catch (error) {
        console.error(error);
        throw error;
    }
        };

// save token
function saveToken (token) {
    localStorage.setItem('authToken', token);
}

async function handleLogin () {
    try {
        const userName = document.getElementById ('id-phone-input').value;
        const password = document.getElementById('id-password-input').value;

        const userData = {
            username: userName,
            password: password
        };
        console.log('Запрос:', userData);

        const token = await login(userData)
        saveToken(token)

        console.log('Токен:', localStorage.getItem('authToken'));
    }
    catch (error) {
        // alert('Error')
        console.error(error);
        alert('Ошибка авторизации: ' + error.message);
      }
}

document.getElementById('btn-input_id').addEventListener('click', handleLogin);










// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('login-form');
//     const errorMessage = document.getElementById('error-message');

//     loginForm.addEventListener('submit', async (event) => {
//         event.preventDefault();

//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         const data = {
//             username: username,
//             password: password
//         };

//         try {
//             const response = await fetch(AuthURL, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             if (!response.ok) {
//                 throw new Error('Ошибка авторизации');
//             }

//             const result = await response.json();
//             console.log('Авторизация успешна', result);

//             // Здесь можно перенаправить пользователя на другую страницу
//             // window.location.href = 'dashboard.html';
//         } catch (error) {
//             errorMessage.textContent = error.message;
//         }
//     });
// });
