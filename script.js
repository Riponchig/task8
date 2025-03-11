// ввод максимума и минимума (страховка от ввода текста)
let minValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || 0;
let maxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || 100;

// Ограничение диапазона значений
minValue = minValue < -999 ? -999 : minValue;
maxValue = maxValue > 999 ? 999 : maxValue;


alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

// первое число
let answerNumber  = Math.floor((minValue + maxValue) / 2);

// Сбрасываем количество попыток и статус игры
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Обновляем интерфейс
orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${writeNumber(answerNumber)}?`;

// генератор фраз

function getRandomPhraseGood() {
    const phrases = [
        `Да это легко! Ты загадал ${writeNumber(answerNumber)}?`,
        `Наверное, это число ${writeNumber(answerNumber)}?`,
        `Дай угадаю! Это ${writeNumber(answerNumber)}?`
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}
function getRandomPhraseBad() {
    const phrases = [
        `Вы загадали неправильное число!\n\u{1F914}`,
        `Я сдаюсь..\n\u{1F92F}`,
        `Я не смог ...\n\u{1F92F}`
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

function getRandomPhraseFinal() {
    const phrases = [
        `Я всегда угадываю\n\u{1F60E}`,
        `Like a boss\n\u{1F60E}`,
        `Я лучший !!!\n\u{1F60E}`
    ];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

// превращалка цифр в число
function numberToText(number) {
    const numMap = {
        0: 'ноль', 1: 'один', 2: 'два', 3: 'три', 4: 'четыре',
        5: 'пять', 6: 'шесть', 7: 'семь', 8: 'восемь', 9: 'девять',
        10: 'десять', 11: 'одиннадцать', 12: 'двенадцать', 13: 'тринадцать',
        14: 'четырнадцать', 15: 'пятнадцать', 16: 'шестнадцать',
        17: 'семнадцать', 18: 'восемнадцать', 19: 'девятнадцать',
        20: 'двадцать', 30: 'тридцать', 40: 'сорок', 50: 'пятьдесят',
        60: 'шестдесят', 70: 'семьдесят', 80: 'восемьдесят', 90: 'девяносто',
        100: 'сто', 200: 'двести', 300: 'триста', 400: 'четыреста',
        500: 'пятьсот', 600: 'шестьсот', 700: 'семьсот', 800: 'восемьсот',
        900: 'девятьсот'
    };

    // Если число меньше 20, возвращаем его как текст
    if (number <= 19) {
        return numMap[number] || number.toString();
    }

    // Если число больше 19 и меньше 100, выводим как комбинацию десятков и единиц
    if (number < 100) {
        const tens = Math.floor(number / 10) * 10;
        const ones = number % 10;
        return ones === 0 ? numMap[tens] : `${numMap[tens]} ${numMap[ones]}`;
    }

    // Если число больше 99, выводим как комбинацию сотен и оставшейся части
    if (number < 1000) {
        const hundreds = Math.floor(number / 100) * 100;
        const remainder = number % 100;
        return remainder === 0 ? numMap[hundreds] : `${numMap[hundreds]} ${numberToText(remainder)}`;
    }
}

// Функция для проверки длины текста и вывода в нужном формате
function writeNumber(number) {
    const textCurrent = numberToText(number);
    return textCurrent.length < 20 ? textCurrent : number.toString();
}

// кнопка повтор
document.getElementById('btnRetry').addEventListener('click', function () {
    // ввод максимума и минимума (страховка от ввода текста)
    let newMinValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || 0;
    let newMaxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || 100;

    // Ограничение диапазона значений
    newMinValue = newMinValue < -999 ? -999 : newMinValue;
    newMaxValue = newMaxValue > 999 ? 999 : newMaxValue;

    // Новое значение для minValue и maxValue фикс бага
    minValue = newMinValue;
    maxValue = newMaxValue;

    // Сбрасываем количество попыток и статус игры
    orderNumber = 1;
    gameRun = true;

    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

    // первое число
    answerNumber  = Math.floor((minValue + maxValue) / 2);

    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${writeNumber(answerNumber)}?`;
})

// кнопка <
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = getRandomPhraseBad();

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getRandomPhraseGood();
        }
    }
});

// кнопка >
document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = getRandomPhraseBad();

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1; 
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getRandomPhraseGood();
        }
    }
});

// Кнопка верно!
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = getRandomPhraseFinal();
        gameRun = false;
    }
})

