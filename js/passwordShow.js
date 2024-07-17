// for input
const passwordInput = document.getElementById('id-password-input');
const showPasswordButton = document.getElementById('show-password');

showPasswordButton.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

// for registration name
const passwordInput1 = document.getElementById('password-input1');
const showPasswordButton1 = document.getElementById('show-password1');

showPasswordButton1.addEventListener('click', function() {
    if (passwordInput1.type === 'password') {
        passwordInput1.type = 'text';
    } else {
        passwordInput1.type = 'password';
    }
});

// for registration family
const passwordInput2 = document.getElementById('password-input2');
const showPasswordButton2 = document.getElementById('show-password2');

showPasswordButton2.addEventListener('click', function() {
    if (passwordInput2.type === 'password') {
        passwordInput2.type = 'text';
    } else {
        passwordInput2.type = 'password';
    }
});

