// request authorization registration

const AuthURL = 'https://pinzeria.tw1.ru/auth/login/'
const RegURL = 'https://pinzeria.tw1.ru/auth/register/'


// Проверяем авторизацию
document.addEventListener('DOMContentLoaded', ViewHideAccount());


document.addEventListener('DOMContentLoaded', () => {
    // Валидация и авторизация
    const formLogin = document.getElementById('authorization-form');
    const phoneLogIn = document.getElementById('id-phone-input_login');
    const passwordLogIn = document.getElementById('id-password-input_login');
    const phoneErrorMessageLogIn = document.getElementById('phone-error-message_login');
    const passwordErrorMessageLogIn = document.getElementById('password-error-message_login');

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();

        // валидация номера телефона
        if (phoneLogIn.value.length !== 11) {
            phoneLogIn.classList.add('is-invalid');
            phoneErrorMessageLogIn.style.display = 'block';
        } else {
            phoneLogIn.classList.remove('is-invalid');
            phoneErrorMessageLogIn.style.display = 'none';
        }

        // валидация пароля
        if (passwordLogIn.value.length < 5) {
            passwordLogIn.classList.add('is-invalid');
            passwordErrorMessageLogIn.style.display = 'block';
        } else {
            passwordLogIn.classList.remove('is-invalid');
            passwordErrorMessageLogIn.style.display = 'none';
        }

        // Если все поля валидны, можно отправить форму
        if (!phoneLogIn.classList.contains('is-invalid') && !passwordLogIn.classList.contains('is-invalid')) {
        console.log('test123')
        // Авторизация
        handleLogin()
        // закрытие модольного окна
        hideModal ()
        // document.getElementById('btn-input_id').addEventListener('click', handleLogin);
        }
    });
  });


//   функция закрытия модульного окна
function hideModal () {
    const modal = document.getElementById('inp-reg');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
    backdrop.remove();
    }
}


document.getElementById('btn-reg').addEventListener('click', handleReg);


async function handleLogin () {
    try {
        const userName = document.getElementById ('id-phone-input_login').value;
        const password = document.getElementById('id-password-input_login').value;

        const userData = {
            username: userName,
            password: password
        };
        // console.log('Запрос:', userData);

        const token = await login(userData)
        saveToken(token)
        ViewHideAccount ();
        console.log('Токен:', localStorage.getItem('authToken'));
    }
    catch (error) {
        // alert('Error')
        console.error(error);
        alert('Ошибка авторизации: ' + error.message);
      }
}


// Проверяем наличие авторизации (токена)

function ViewHideAccount () {
    console.log('test')
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

// Авторизация
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
                throw new Error('Проверьте правильность ввода логина и пароля');
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



// Регистрация
async function handleReg () {

    try {
        const userName = document.getElementById ('phone-input_reg').value;
        const password = document.getElementById('password-input_reg').value;
        const emailInp = document.getElementById ('mail-input_reg').value;
        const firstName = document.getElementById ('first_name-input_reg').value;
        const lastName = document.getElementById ('last-name-input_reg').value;
        const dateBirth = document.getElementById ('date-birth-input_reg').value;

        // второй пароль
        const password2 = document.getElementById('password-input_reg2').value;
        
        // объект
        const userData = {
            username: userName,
            password: password,
            email: emailInp,
            first_name: firstName,
            last_name: lastName,
            date_birth: dateBirth
        };

        // console.log('Запрос:', userData);

        if (password===password2) {
          const token = await RegIn(userData)
            // console.log(token)  
            saveToken(token)
            ViewHideAccount ()
            console.log('Токен:', localStorage.getItem('authToken'));  
        }
        else {
            
        }
        
    }
    catch (error) {
        // alert('Error')
        console.error(error);
        alert('Пользователь с таким телефоном уже зарегистрирован ');
      }
}


async function RegIn (userData) {
    try {
        const responce = await fetch (RegURL, {
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
                // throw new Error('Пользователь с таким телефоном уже зарегистрирован');
            }}
    catch (error) {
        // console.error(error);
        throw error;
    }
        };

