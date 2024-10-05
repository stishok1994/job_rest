// request authorization registration

const AuthURL = 'https://pinzeria.tw1.ru/auth/login/'
const RegURL =  'https://pinzeria.tw1.ru/auth/register/'


// Проверяем авторизацию
document.addEventListener('DOMContentLoaded', ViewHideAccount());

 // Валидация и авторизация
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('authorization-form');
    const phoneLogIn = document.getElementById('id-phone-input_login');
    const passwordLogIn = document.getElementById('id-password-input_login');
    const phoneErrorMessageLogIn = document.getElementById('phone-error-message_login');
    const passwordErrorMessageLogIn = document.getElementById('password-error-message_login');

    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();

        // валидация номера телефона
        if (phoneLogIn.value.length !== 10) {
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
        // console.log('test123')

        // Авторизация
        handleLogin()

        }
    });
  });


  // Валидация и регистрация
document.addEventListener('DOMContentLoaded', () => {
    const formReg = document.getElementById('registration-form');
    // поля ввода
    const fNameReg = document.getElementById('first_name-input_reg');
    const lNameReg = document.getElementById('last-name-input_reg');
    const phoneReg = document.getElementById('phone-input_reg');
    const mailReg = document.getElementById('mail-input_reg');
    const dataBirthReg = document.getElementById('date-birth-input_reg');
    const password1Reg = document.getElementById('password1-input_reg');
    const password2Reg = document.getElementById('password2-input_reg');
    // сообщения
    const fNameErrorMessageReg = document.getElementById('first-name-error-message_reg');
    const lNameErrorMessageReg = document.getElementById('last-name-error-message_reg');
    const phoneErrorMessageReg = document.getElementById('phone-error-message_reg');
    const mailErrorMessageReg = document.getElementById('mail-error-message_reg');
    const dataBirthErrorMessageReg = document.getElementById('data-birth-error-message_reg');
    const passw1ErrorMessageReg = document.getElementById('password1-error-message_reg');
    const passw2ErrorMessageReg = document.getElementById('password2-error-message_reg');
    const passMatchErrorMessageReg = document.getElementById('password-match-error-message_reg');
    
    console.log(mailReg.value)

    formReg.addEventListener('submit', (event) => {
        event.preventDefault();

        // валидация имени 1
        if (fNameReg.value.length == 0) {
            fNameReg.classList.add('is-invalid');
            fNameErrorMessageReg.style.display = 'block';
        } else {
            fNameReg.classList.remove('is-invalid');
            fNameErrorMessageReg.style.display = 'none';
        }

        // валидация имени 2
        if (lNameReg.value.length == 0) {
            lNameReg.classList.add('is-invalid');
            lNameErrorMessageReg.style.display = 'block';
        } else {
            lNameReg.classList.remove('is-invalid');
            lNameErrorMessageReg.style.display = 'none';
        }

        // валидация номера телефона
        if (phoneReg.value.length !== 10) {
            phoneReg.classList.add('is-invalid');
            phoneErrorMessageReg.style.display = 'block';
        } else {
            phoneReg.classList.remove('is-invalid');
            phoneErrorMessageReg.style.display = 'none';
        }

        // валидация mail
        if (!isValidEmail(mailReg.value)) {
            mailReg.classList.add('is-invalid');
            mailErrorMessageReg.style.display = 'block';
        } else {
            mailReg.classList.remove('is-invalid');
            mailErrorMessageReg.style.display = 'none';
        }

        // валидация даты рождения
        if (dataBirthReg.value.length == 0) {
            dataBirthReg.classList.add('is-invalid');
            dataBirthErrorMessageReg.style.display = 'block';
        } else {
            dataBirthReg.classList.remove('is-invalid');
            dataBirthErrorMessageReg.style.display = 'none';
        }

        // валидация пароля 1
        if (password1Reg.value.length < 5) {
            password1Reg.classList.add('is-invalid');
            passw1ErrorMessageReg.style.display = 'block';
        } else {
            password1Reg.classList.remove('is-invalid');
            passw1ErrorMessageReg.style.display = 'none';
        }
        // валидация пароля 2
        if (password2Reg.value.length < 5) {
            password2Reg.classList.add('is-invalid');
            passw2ErrorMessageReg.style.display = 'block';
        } else {
            password2Reg.classList.remove('is-invalid');
            passw2ErrorMessageReg.style.display = 'none';
        }

        // Если все поля валидны
        if (!fNameReg.classList.contains('is-invalid') && 
        !lNameReg.classList.contains('is-invalid') && 
        !phoneReg.classList.contains('is-invalid') && 
        !mailReg.classList.contains('is-invalid') && 
        !dataBirthReg.classList.contains('is-invalid') && 
        !password1Reg.classList.contains('is-invalid') && 
        !password2Reg.classList.contains('is-invalid')) {

        console.log(password2Reg.value.length)
        // совпадение паролей
        if (!(password1Reg.value==password2Reg.value)) {
            // пароли не совпали
            passMatchErrorMessageReg.style.display = 'block';
        }
        else {
            passMatchErrorMessageReg.style.display = 'none';
            console.log('test reg')
            handleReg()
            
        }
        }
    });
  });

//   функция закрытия модульного окна авторизации
function hideModal () {
    const modal = document.getElementById('inp-reg');
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
    backdrop.remove();
    }
}

//   функция закрытия модульного регистрации
function hideModalReg () {
    const modalReg = document.getElementById('reg-modal');
    modalReg.classList.remove('show');
    document.body.classList.remove('modal-open');
    const backdropReg = document.querySelector('.modal-backdrop');
    if (backdropReg) {
        backdropReg.remove();
    }
}

// авторизация
async function handleLogin () {
    try {
        const userName = document.getElementById ('id-phone-input_login').value;
        const password = document.getElementById('id-password-input_login').value;

        const userData = {
            username: '8'+ userName,
            password: password
        };
        console.log('Запрос:', userData);

        const data = await login(userData)
        saveData(data)
        ViewHideAccount ();
    }
    catch (error) {
        // alert('Error')
        console.error(error);
        alert('Ошибка авторизации: ' + error.message);
      }
}

// Проверяем наличие авторизации (токена)
function ViewHideAccount () {
    // console.log('test')
    const accountSection1 = document.getElementById('account-success_1');
    const accountSection2 = document.getElementById('account-success_2');
    const loginSection1 = document.getElementById('logIn-action_1');
    const loginSection2 = document.getElementById('logIn-action_2');

    // проверяем наличие токена
    const token = localStorage.getItem('authToken')

    if (token && token!== 'undefined') {
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
                // закрытие модульного окна
                hideModal ()
                return data // get token
            }
            else {
                throw new Error('Проверьте правильность ввода логина и пароля');
            }}
    catch (error) {
        console.error(error);
        throw error;
    }
        };

// save token for Aut
function saveData (data, userName, firstName) {
    localStorage.setItem('authToken', data.access_token);
    localStorage.setItem('firstName', data.first_name);
    localStorage.setItem('phone', data.username);
}
// save token for Registration
function saveDataReg (data, userName, firstName) {
    localStorage.setItem('authToken', data.access_token);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('phone', userName);
}


// Регистрация
async function handleReg () {
    try {
        const userName = document.getElementById ('phone-input_reg').value;
        const password = document.getElementById('password1-input_reg').value;
        const emailInp = document.getElementById ('mail-input_reg').value;
        const firstName = document.getElementById ('first_name-input_reg').value;
        const lastName = document.getElementById ('last-name-input_reg').value;
        const dateBirth = document.getElementById ('date-birth-input_reg').value;
        
        // объект
        const userData = {
            username: '8'+ userName,
            password: password,
            email: emailInp,
            first_name: firstName,
            last_name: lastName,
            date_birth: dateBirth
        };


        // console.log('Запрос:', userData);
        const data = await RegIn(userData)
        saveDataReg(data, userName, firstName)
        ViewHideAccount ()
        // console.log('Токен:', localStorage.getItem('authToken'));  
        
    }
    catch (error) {
        // console.error(error);
        alert(error);
        
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
                // закрытие модульного окна регистрации
                hideModalReg ()
                console.log(userData)
                return data // get token
            }
            else {
                throw new Error('Пользователь с таким телефоном уже зарегистрирован');
            }}
    catch (error) {
       
        throw error;
    }
        };

        // Валидация Email
        function isValidEmail(email) {
            // проверка формата email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
          }