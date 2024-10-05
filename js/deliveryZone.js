// Получаем зону и стоимость доставки + выбираем адрес доставки

const UrlDelivery = 'https://pinzeria.tw1.ru/orders_info/get_area_delivery/'

// Проверяем наличие адреса в LS
getAddressFromLS()

// // Получение стоимости доставки
getPriceDelivery()

// Дожидаемся полной загрузки API Яндекс.Карт и инициализируем карту
ymaps.ready(init);
function init() {
    // Инициализация карты с центром в определенных координатах (Воронеж по умолчанию)
    var map = new ymaps.Map("map", {
        center: [51.660949, 39.200293], // Центр Воронежа по умолчанию
        zoom: 13
    });

    // Добавление элемента управления поиска на карту
    var searchControl = new ymaps.control.SearchControl({
        options: {
            provider: 'yandex#search' // Используем провайдер поиска Yandex
        }
    });
    map.controls.add(searchControl);
    var currentMapCoords = null; // Переменная для хранения текущих координат, выбранных на карте
    var currentMapAddress = '';  // Переменная для хранения текущего адреса, выбранного на карте
    var placemark = null; // Переменная для хранения метки
    // Обработка события клика на карту
    map.events.add('click', function (e) {
        var coords = e.get('coords'); // Получаем координаты места клика
        getAddressFromCoords(coords); // Получаем адрес по этим координатам
    });

    // Функция для установки метки на карте
    function setPlacemark(coords) {
        if (placemark) {
            // Если метка уже существует, перемещаем её на новые координаты
            placemark.geometry.setCoordinates(coords);
        } else {
            // Если метка не существует, создаем новую
            placemark = new ymaps.Placemark(coords, {}, {
                preset: 'islands#redDotIcon' // Настройка иконки метки
            });
            map.geoObjects.add(placemark); // Добавляем метку на карту
        }
        map.setCenter(coords); // Центрируем карту на выбранных координатах
    }

    // Функция для отображения адреса, выбранного на карте, в поля ввода
    function displayMapAddressInFields(city, street, house) {
        document.getElementById('city').value = city;
        document.getElementById('street').value = street;
        document.getElementById('house').value = house;
    }

    // Функция для сохранения координат в localStorage
    function saveCoordinatesToLocalStorage(coords) {
        var coordinate = {
            x: coords[0],
            y: coords[1]
        };
        localStorage.setItem('coordinate', JSON.stringify(coordinate));
    }

    // Функция для получения адреса по координатам (обратное геокодирование)
    function getAddressFromCoords(coords) {
        ymaps.geocode(coords).then(function (res) {
            if (res.geoObjects.getLength() > 0) {
                var firstGeoObject = res.geoObjects.get(0);
                var address = firstGeoObject.getAddressLine();

                // Извлекаем город, улицу и дом
                var addressComponents = firstGeoObject.getThoroughfare(); // Улица и дом
                var locality = firstGeoObject.getLocalities(); // Город

                if (addressComponents && locality.length > 0) {
                    var street = addressComponents;
                    var city = locality[0];
                    var house = firstGeoObject.getPremiseNumber(); // Номер дома

                    // Заполняем поля ввода значениями, полученными с карты
                    displayMapAddressInFields(city, street, house);

                    // Устанавливаем метку на карте
                    setPlacemark(coords);

                    // Сохраняем текущие координаты и адрес для возможного дальнейшего использования
                    currentMapCoords = coords;
                    currentMapAddress = address;
                } else {
                    alert("Не удалось определить точный адрес по выбранным координатам.");
                }
            } else {
                alert("Не удалось определить адрес по выбранным координатам.");
            }
        });
    }

    // Функция для получения координат по введенному адресу (геокодирование)
    window.geocodeAddress = function () {
        var city = document.getElementById('city').value;
        var street = document.getElementById('street').value;
        var house = document.getElementById('house').value;
        var flat = document.getElementById('flat').value;
        var entrance = document.getElementById('entrance').value;
        var floor = document.getElementById('floor').value;
        var intercom = document.getElementById('intercom').value;

        if (!city || !street || !house) {
            alert("Пожалуйста, введите город, улицу и номер дома.");
            return;
        }

        // Формируем адрес
        var address = city + ', ' + street + ', ' + house;
        const adress = {
            street: street,
            house: house,
            flat: flat,
            entrance: entrance,
            floor: floor,
            doorphone: intercom
        }
        // Сохраняем адрес в localStorage
        addressToLS(adress);

        // Проверяем наличие адреса в LS
        getAddressFromLS()
        ymaps.geocode(address).then(function (res) {
            if (res.geoObjects.getLength() > 0) {
                var firstGeoObject = res.geoObjects.get(0);
                var coords = firstGeoObject.geometry.getCoordinates();

                // Устанавливаем метку на карте
                setPlacemark(coords);

                // Сохранение координат в localStorage только после нажатия кнопки
                saveCoordinatesToLocalStorage(coords);
                
                document.querySelector('.coordinates');
                // Отображаем стоимость доставки
                getPriceDelivery()
            } else {
                alert("Не удалось найти координаты для введенного адреса. Пожалуйста, проверьте введенные данные.");
                document.querySelector('.coordinates').innerHTML = '';
            }
        }).catch(function (err) {
            alert("Произошла ошибка при определении координат.");
            document.querySelector('.coordinates').innerHTML = '';
        });
    }
}

// Сохранение адреса в local storage
function addressToLS(address) {
    localStorage.setItem('address', JSON.stringify(address));
}

// Обработчик изменения полей ввода адреса
document.getElementById('city').addEventListener('input', geocodeAddressFromInput);
document.getElementById('street').addEventListener('input', geocodeAddressFromInput);
document.getElementById('house').addEventListener('input', geocodeAddressFromInput);

// Функция для определения координат на основе вводимого адреса и сохранения их в LocalStorage
async function geocodeAddressFromInput() {
    var city = document.getElementById('city').value;
    var street = document.getElementById('street').value;
    var house = document.getElementById('house').value;
    if (!city || !street || !house) {
        return;
    }
    var address = city + ', ' + street + ', ' + house;
    const res = await ymaps.geocode(address);
    if (res.geoObjects.getLength() > 0) {
        var firstGeoObject = res.geoObjects.get(0);
        var coords = firstGeoObject.geometry.getCoordinates();
        // Сохранение координат в localStorage при вводе вручную
        saveCoordinatesToLocalStorage(coords);
        console.log('Coords saved to LocalStorage: ', coords);
    }
}  
    
    // Отображение адреса из LS
    async function getAddressFromLS() {
        const addressSection = document.getElementById('addressFromLS');
        const inputAddressBlock = document.querySelector('.adressDelivery');
        const btnDeleteAddress = document.querySelector('.delete-adress');
      
        // Получаем адрес из localStorage
        const address = JSON.parse(localStorage.getItem('address'));
      
        // Функция для форматирования адреса
        function formatAddress(address) {
          let formattedAddress = '';
          if (address.street) formattedAddress += `Улица ${address.street}`;
          if (address.house) formattedAddress += `, дом ${address.house}`;
          if (address.entrance) formattedAddress += `, подъезд ${address.entrance}`;
          if (address.flat) formattedAddress += `, квартира ${address.flat}`;
          if (address.floor) formattedAddress += `, этаж ${address.floor}`;
          return formattedAddress.trim();
        }
        // Если адрес существует, отображаем его
        if (address && (address.street || address.house || address.entrance || address.flat || address.floor)) {
          addressSection.textContent = formatAddress(address);
          inputAddressBlock.classList.add('view-hide');
          btnDeleteAddress.classList.remove('view-hide');

        } else {
          // Если адреса нет, выводим сообщение
          addressSection.textContent = 'Адрес не найден';
          inputAddressBlock.classList.remove('view-hide');
          btnDeleteAddress.classList.add('view-hide')
        }
      }   
    
// Запрос с сервера стоимости доставки
async function getPriceDelivery() {
        // блок вывода цены доставки
        const DeliveryCostsBlock = document.getElementById('deliveryPrice');
        // Проверяем координаты в localStorage
        if (localStorage.getItem('coordinate')) {
            let coordinate = JSON.parse(localStorage.getItem('coordinate')) || [];
            // console.log('Запрос:', coordinate);
            const responce = await fetch (UrlDelivery, {
                method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(coordinate)
            });
            if (responce.ok) {
                const data = await responce.json();
                DeliveryCostsBlock.classList.remove('view-hide');
                DeliveryCostsBlock.textContent = `Стоимость доставки: ${data.coast} ₽`;
                
                // сохраняем стоимость в LS
                localStorage.setItem('priceDeliv', JSON.stringify(data.coast));
                // console.log(`Полученные данные-`, data, `Type-`, typeof data)
            }
            else {
                DeliveryCostsBlock.classList.add('view-hide');
                throw new Error('Проверьте правильность адреса');
            }
        }
            
        else {
        }
        };

// Удаление акаунта, ,бонусов и адреса
//  токен
const deleteTokenBlock = document.getElementById('log-out_btn');
//  адрес
const deleteAddressBlock = document.querySelector('.delete-adress');
deleteTokenBlock.addEventListener('click', deleteToken);
deleteAddressBlock.addEventListener('click', deleteAddress);
// Выход из аккаунта
function deleteToken() {
    const DeliveryCostsBlock = document.querySelector('.delivery-costs');
    DeliveryCostsBlock.classList.add('view-hide');
    ['authToken', 'address', 'coordinate', 'firstName', 'phone', 'email', 'priceDeliv', 'bonus'].forEach(item => localStorage.removeItem(item));
}

// Удаляем адресс
function deleteAddress() {
    const DeliveryCostsBlock = document.querySelector('.delivery-costs');
    DeliveryCostsBlock.classList.add('view-hide');
    ['address', 'coordinate'].forEach(item => localStorage.removeItem(item));
    getAddressFromLS();
}


