document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');
    const accountSection = document.getElementById('account-section');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const successIcon = document.getElementById('success-icon');

    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
        // Если токен существует, показываем блок личного кабинета
        accountSection.classList.remove('hidden');
    } else {
        // Если токен отсутствует, показываем блок авторизации
        loginSection.classList.remove('hidden');
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const data = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('https://pinzeria.tw1.ru/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Ошибка авторизации: ${errorData.message || response.statusText}`);
            }

            const result = await response.json();
            console.log('Авторизация успешна', result);

            // Сохраняем токен в localStorage
            localStorage.setItem('authToken', result.token);

            // Скрываем сообщение об ошибке
            errorMessage.textContent = '';
            errorMessage.style.display = 'none';

            // Показываем сообщение об успешной авторизации и иконку
            successMessage.style.display = 'block';
            successIcon.style.display = 'block';

            // Переключаем отображение блоков
            loginSection.classList.add('hidden');
            accountSection.classList.remove('hidden');

            // Можно перенаправить пользователя на другую страницу, если нужно
            // window.location.href = 'dashboard.html';
        } catch (error) {
            // Показываем сообщение об ошибке
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';

            // Скрываем сообщение об успешной авторизации и иконку
            successMessage.style.display = 'none';
            successIcon.style.display = 'none';
        }
    });
});
