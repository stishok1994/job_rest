// Сброс пароля на почту
urlResetPassw = 'https://pinzeria.tw1.ru/auth/refresh_password/'

document.getElementById('sendRequest').addEventListener('click', async function() {
    // Получаем email
    const email = document.getElementById('user-mail_modal').value;
    
    if (!email) {
        alert("Пожалуйста, введите электронную почту");
        return;
    }

    // Формируем данные для отправки
    const requestData = {
        email: email
    };

    try {
        // POST запрос
        const response = await fetch(urlResetPassw, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            // Если запрос успешный, закрываем модальное окно и показываем сообщение
            alert('Запрос отправлен!');
            const modal = bootstrap.Modal.getInstance(document.getElementById('reset-pass'));
            modal.hide();
        } else {
            alert('Ошибка при отправке запроса');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке запроса');
    }
});
