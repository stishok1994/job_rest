// Меняем кириллицу в URL


async function changeURL () {

    const currentURL = new URL(window.location.href)
    const titleURL = currentURL.searchParams.get('title')
    
    // транслитерация
    const encodedTitle = translitrateTitle(titleURL)
    
    // Обновляем URL-адрес страницы с закодированным значением 'title'
    const newURL = new URL(currentURL);
    newURL.searchParams.set('title', encodedTitle);
    window.history.replaceState({}, '', newURL.toString());
    
    // функция транслитерации
    function translitrateTitle(title) {
        const translit = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
          'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
          'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
          'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
      
        return title.toLowerCase().split('').map(char => translit[char] || char).join('');
      }
}
