// Изменяем количество товаров в карточке на странице МЕНЮ

// Добавляем прослушку на всем окне

window.addEventListener('click', function(event) {
    // проверяем элемент к + или -
    if (event.target.dataset.action === 'plus') {
        // находим родителя от кнопки
        const counterWrapper = event.target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');
        counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === 'minus') {
        // находим родителя от кнопки
        const counterWrapper = event.target.closest('.counter-wrapper');

        const counter = counterWrapper.querySelector('[data-counter]');

        if (parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        }        
    }

})
