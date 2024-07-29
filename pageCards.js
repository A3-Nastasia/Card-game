let selectedCards = [];

/**
 * 
 * @param {number} ms 
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Что происходит после правильного сбора всех карточек
 */
function executeWithLoading() {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block'; // Показываем окно загрузки

    // Задержка в 2 секунды
    setTimeout(() => {
        // Скрываем окно загрузки
        loadingElement.style.display = 'none';
        console.log('Загрузка завершена');

        // Удаляем класс 'disabled' после завершения загрузки
        document.querySelectorAll('.card').forEach(card => card.classList.remove('disabled'));
    }, 2000);
}

// Получить все карточки со страницы и записать в класс 'selected' при нажатии
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
        if (this.classList.contains('selected')) {
            this.classList.remove('selected');
            selectedCards = selectedCards.filter(selectedCard => selectedCard !== this);
        } else {
            this.classList.add('selected');
            selectedCards.push(this);
        }
    });
});

// Сама логика при нажатии на карточки
$('.card').click(function () {
    if (selectedCards.length === 2) {
        // Если классы карточек совпадают
        /* (конечно, не очень хорошо, что через классы, 
            потому что их поправить можно, 
            но я без понятия что еще сделать и как)*/
        const classNameSelected = selectedCards[0].classList[1];
        if (classNameSelected === selectedCards[1].classList[1]) {
            // Сделать карточки недоступными, т.к. они выбраны правильно
            $(`.${classNameSelected}`).addClass('disabled');
            $(`.${classNameSelected}`).addClass('compared');
            // Найти в иерархии элементов класс .card_back, чтобы установить прозрачность
            $(`.${classNameSelected}`).find('.card_back').css('opacity', '0.3');
        }
        else {
            // Блок, чтобы перекрывал нажатия на карточки
            const overlay = document.getElementById('overlay');
            overlay.style.display = 'block';

            // Задержка на секунду, чтобы ничо не нажимали
            setTimeout(() => {
                const cardsToFlip = document.querySelectorAll('.card');
                for (let i = 0; i < cardsToFlip.length; i++) {
                    // Перевернуть все карточки обратно, кроме правильно выбранных
                    if (!(cardsToFlip[i].classList.contains('compared')))
                        cardsToFlip[i].classList.remove('flipped')
                }
                overlay.style.display = 'none';
            }, 1000);
        }

        // Обнуляем массив и убираем выделение
        selectedCards.forEach(card => card.classList.remove('selected'));
        selectedCards = [];
    }
    const cardsCheckDisabled = document.querySelectorAll('.card');
    const isAllCompared = Array.from(cardsCheckDisabled).every(card => {
        return card.classList.contains('compared');
    });

    if (isAllCompared) {
        alert('Все карточки собраны');
        executeWithLoading()

        // Задержка на секунду, чтобы ничо не нажимали
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
            document.querySelectorAll('.card').forEach(card => card.classList.remove('compared'));
        }, 1000);
    }
});