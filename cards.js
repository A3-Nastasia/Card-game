// Класс для карточки
class Card {
    constructor(cardNumber, cardImg) {
        this.cardNumber = cardNumber;
        this.cardImg = cardImg;
    }
}

let cards = [];
// Количество картинок в папке (один экземпляр)
let amountOfCards = 7;

// Автоматизация записи в поле класса карточки наименования картинки
for (let i = 1; i <= amountOfCards; i++) {
    cards.push(new Card(i, `./images/${i}.jpg`));
}

// 2 экземпляра с перемешиванными картинками
addShuffled(cards);
addShuffled(cards);

/**
 * Перемешивание и добавление в массив карточек
 * @param {Card} array 
 */
function addShuffled(array){
    shuffle(array);

    array.forEach((item, itemId) => {
        createCardDiv(item, itemId);
    });
}

/**
 * Функция перемешивания элементов массива
 * @param {Array} array 
 * @returns {Array}
 */
function shuffle(array){
    for(let i=array.length-1;i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Создать карточку
 * @param {Card} card 
 */
function createCardDiv(card) {
    // Получить главный контейнер
    let divParentMain = document.getElementById('div_main');
    // Создать для divParentMain контейнер внутри для поворота карточки
    let divParent = document.createElement('div');
    // Создать контейнер карточки
    let divCard = document.createElement('div');
    // Создать переднюю сторону карточки
    let divCardFront = document.createElement('div');
    // Создать заднюю сторону карточки
    let divCardBack = document.createElement('div');
    // Создать картинку
    let img = document.createElement('img');

    // Назначить каждому контейнеру класс (-ы)
    divCard.className = `card card_${card.cardNumber}`;
    divParent.className = 'div_main_second';
    divCardFront.className = 'card_front';
    divCardBack.className = 'card_back';

    // Назначить картинку
    img.src = `${card.cardImg}`;

    // Вложить элементы
    divParentMain.appendChild(divParent);
    divParent.appendChild(divCard);
    divCard.appendChild(divCardFront);
    divCard.appendChild(divCardBack);
    divCardBack.appendChild(img);
    document.body.appendChild(divParentMain);

    // Добавить функционал поворота карточки
    divCard.addEventListener('click', function() {
        divCard.classList.toggle('flipped');
    });
}