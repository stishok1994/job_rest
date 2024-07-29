// все поля ввода пароля
const passwordInputs = document.querySelectorAll('.id-password-input_class');

//все кнопки показать для полей ввода пароля
const showPasswordButtons = document.querySelectorAll('[id^="show-password"]');

// обработчик клика для кнопок
showPasswordButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // меняем тип поля ввода пароля
    if (passwordInputs[index].type === 'password') {
      passwordInputs[index].type = 'text';
    } else {
      passwordInputs[index].type = 'password';
    }
  });
});