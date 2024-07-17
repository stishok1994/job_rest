// request authorization
async function login (phone, password) {
    try {
        const responce = await fetch ('http://147.45.109.158:8881/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                // phone, password 
                username: phone,
                password: password
            })
            });
    
            if (responce.ok) {
                const data = await responce.json();
                return data.token // get token
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

        console.log('Запрос:', userName, password);

        const token = await login(userName,password)
        saveToken(token)

        console.log('Токен:', localStorage.getItem('authToken'));
    }
    catch (error) {
        console.error(error);
        alert('Ошибка авторизации: ' + error.message);
      }
}

// action input
document.getElementById('btn-input_id').addEventListener('click', handleLogin);

