// Регистрация пользователя
// request authorization

const RegURL = 'https://pinzeria.tw1.ru/auth/register/'


// // Проверяем авторизацию: скрываем / отображаем личный кабинет
// document.addEventListener('DOMContentLoaded', ViewHideAccount());

document.getElementById('btn-reg').addEventListener('click', handleReg);
  




// Проверяем наличие авторизации (токена)

function ViewHideAccount () {
    
    const accountSection1 = document.getElementById('account-success_1');
    const accountSection2 = document.getElementById('account-success_2');
    const loginSection1 = document.getElementById('logIn-action_1');
    const loginSection2 = document.getElementById('logIn-action_2');

    // проверяем наличие токена
    const token = localStorage.getItem('authToken')

    if (token) {
        // Если токен существует, показываем блок личного кабинета и скрываем блок регистрации/входа
        loginSection1.classList.add('view-hide');
        loginSection2.classList.add('view-hide');
        accountSection1.classList.remove('view-hide')
        accountSection2.classList.remove('view-hide')
    }
    else {
        // Иначе показываем блок авторизации
        loginSection1.classList.remove('view-hide');
        loginSection2.classList.remove('view-hide');
        accountSection1.classList.add('view-hide')
        accountSection2.classList.add('view-hide')
    }  
}


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

async function handleReg () {
    console.log('test')
    try {
        const userName = document.getElementById ('phone-input_reg').value;
        const password = document.getElementById('password-input_reg').value;
        const emailInp = document.getElementById ('mail-input_reg').value;
        const firstName = document.getElementById ('first_name-input_reg').value;
        const lastName = document.getElementById ('last-name-input_reg').value;
        const dateBirth = document.getElementById ('date-birth-input_reg').value;

        const userData = {
            username: userName,
            password: password,
            email: emailInp,
            first_name: firstName,
            last_name: lastName,
            date_birth: dateBirth
        };
        console.log('Запрос:', userData);

        // const token = await login(userData)
        // saveToken(token)
        // ViewHideAccount ();
        // console.log('Токен:', localStorage.getItem('authToken'));
    }
    catch (error) {
        // alert('Error')
        console.error(error);
        alert('Ошибка авторизации: ' + error.message);
      }
}
