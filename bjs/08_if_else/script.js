let minValue = parseInt(prompt('Введите минимальное значение числа для игры', '-999'));
let maxValue = parseInt(prompt('Введите максимальное значение числа для игры', '999'));

function reEnteryLimits() {
    minValue = parseInt(prompt('Повторно введите минимальное значение числа для игры', '-999'));
    maxValue = parseInt(prompt('Повтороно введите максимальное значение числа для игры', '999'));
}

function mistakeLimits() {
    if (minValue > maxValue) {
        alert(`Вы ошиблись: ( ${minValue} > ${maxValue} ) - минимальное значение должно быть меньше максимального`);
        reEnteryLimits();
    }
    if (minValue == maxValue) {
        alert(`Вы ошиблись: ( ${minValue} = ${maxValue} ) - минимальное значение не должно быть равно максимальному`);
        reEnteryLimits();
    }
}

function fixLimits() {
    (minValue < -999 || minValue > 998) ? minValue = -999:
        (minValue == null || '' || undefined) ? minValue = -999 :
        (isNaN(minValue)) ? minValue = -999 : minValue = minValue;

    (maxValue > 999 || maxValue < -998) ? maxValue = 999:
        (maxValue == null || '' || undefined) ? maxValue = 999 :
        (isNaN(maxValue)) ? maxValue = 999 : maxValue = maxValue;
}

mistakeLimits();
fixLimits();
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

let gameMinLimit = minValue;
let gameMaxLimit = maxValue;
let orderNumber = 1;
let answerNumber = Math.floor((minValue + maxValue) / 2);
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');
const gameMinLimitField = document.getElementById('gameMinLimit');
const gameMaxLimitField = document.getElementById('gameMaxLimit');

gameMinLimitField.innerText = gameMinLimit;
gameMaxLimitField.innerText = gameMaxLimit;
orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;
numToText(answerNumber);

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = gameMinLimit;
    maxValue = gameMaxLimit;
    orderNumber = 0;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    gameMainQuestion();
})

function gameMainQuestion() {
    const phraseRandom = Math.round(Math.random() * 3);
    let questionPhrase;
    switch (phraseRandom) {
        case 1:
            questionPhrase = `Расчет числа... \n Проверка: \n ${answerNumber}?..\n\u{1F916}`;
            break;
        case 2:
            questionPhrase = `Число, \n которое вы загадали \n ничто иное как: \n ${answerNumber}?\n\u{1F913}`;
            break;
        case 3:
            questionPhrase = `Тсс... \n Только между нами: \n ${answerNumber}?\n\u{1F92B}`;
            break;
        default:
            questionPhrase = `Is it number \n ${answerNumber} ???\n\u{1F97A}`;
    }
    answerField.innerText = questionPhrase;
    numToText(answerNumber);
}


document.getElementById('btnChangeLimits').addEventListener('click', function () {
    orderNumber = 0;
    minValue = parseInt(prompt(`Текущее минимальное значение числа для игры: ${gameMinLimit}`, `${gameMinLimit}`));
    maxValue = parseInt(prompt(`Текущее максимальное значение числа для игры: ${gameMaxLimit}`, `${gameMaxLimit}`));
    mistakeLimits();
    fixLimits();
    gameMinLimit = minValue;
    gameMaxLimit = maxValue;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    gameMinLimitField.innerText = gameMinLimit;
    gameMaxLimitField.innerText = gameMaxLimit;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    gameMainQuestion();
})

function gameRightAnswers() {
    const phraseRandom = Math.round(Math.random() * 3);
    let answerPhrase;
    switch (phraseRandom) {
        case 1:
            answerPhrase = `Я всегда угадываю\n\u{1F60E}`;
            break;
        case 2:
            answerPhrase = `Иначе и быть не может!\n\u{1F9D0}`;
            break;
        case 3:
            answerPhrase = `Я никому не скажу,\nчто ты загадал число\n${answerNumber}\n\u{1F92D}`;
            break;
        default:
            answerPhrase = `Again???\n\u{1F97A}`;
    }
    answerField.innerText = answerPhrase;
    gameRun = false;
}


function gameWrongAnswers() {
    const phraseRandom = Math.round(Math.random() * 3);
    let answerPhrase;
    switch (phraseRandom) {
        case 1:
            answerPhrase = `Я сдаюсь..\n\u{1F92F}`;
            break;
        case 2:
            answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`;
            break;
        case 3:
            answerPhrase = `Вы точно загадили число между \n ${gameMinLimit} и ${gameMaxLimit}?\n\u{1F928}`;
            break;
        default:
            answerPhrase = `Again???\n\u{1F97A}`;
    }
    answerField.innerText = answerPhrase;
    gameRun = false;
}

function findUpNum() {
    minValue = answerNumber + 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber++;
    orderNumberField.innerText = orderNumber;
    gameMainQuestion();
    numToText(answerNumber);
    // console.log(`${minValue} < ${answerNumber} < ${maxValue}`);
}

function findLowNum() {
    maxValue = answerNumber - 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber++;
    orderNumberField.innerText = orderNumber;
    gameMainQuestion();
    numToText(answerNumber);
    // console.log(`${minValue} < ${answerNumber} < ${maxValue}`);
}

document.getElementById('btnOver').addEventListener('click', function () {
    numToText(answerNumber);
    if (gameRun) {
        (minValue >= maxValue) ? gameWrongAnswers(): findUpNum();
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    numToText(answerNumber);
    if (gameRun) {
        (minValue >= maxValue) ? gameWrongAnswers(): findLowNum();
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    numToText(answerNumber);
    if (gameRun) {
        gameRightAnswers();
    }
})

let onesArr = ["", " один", " два", " три", " четыре", " пять", " шесть", " семь", " восемь", " девять"];
let tenTwoTenArr = [" десять", " одиннадцать", " двенадцать", " тринадцать", " четырнадцать", " пятнадцать", " шестнадцать", " семнадцать", " восемнадцать", " девятнадцать"];
let tensArr = [" двадцать", " тридцать", " сорок", " пятьдесят", " шестьдесят", " семьдесят", " восемьдесят", " девяносто"];
let hundredsArr = [" сто", " двести", " триста", " четыреста", " пятьсот", " шестьсот", " семьсот", " восемьсот", " девятьсот"];

function numToText(answerNumber) {
    let keyNum = answerNumber;
    let numText = "";
    function swithToText(numText) {
        if (numText.length <= 20) {
            let oldText = answerField.innerText;
            let newText = oldText.replace(`${answerNumber}`, `${numText}`);
            answerField.innerText = newText;
        }
    };
    if (keyNum === 0) {
        numText = "ноль";
        swithToText(numText);
    } else {
        if (keyNum < 0) {
            numText = "минус";
        }
        keyNum = Math.abs(keyNum);
        if (keyNum < 10) {
            numText += onesArr[`${keyNum}`];
            swithToText(numText);
        } else if (keyNum < 20) {
            numText += tenTwoTenArr[`${keyNum - 10}`];
            swithToText(numText);
        } else if (keyNum < 100) {
            if ((keyNum % 10) === 0) {
                numText += tensArr[`${keyNum / 10 - 2}`];
                swithToText(numText);
            } else {
                numText += tensArr[`${Math.floor(keyNum / 10) - 2}`];
                numText += onesArr[`${keyNum % 10}`];
                swithToText(numText);
            }
        } else if (keyNum < 1000) {
            if ((keyNum % 100) === 0) {
                numText += hundredsArr[`${keyNum / 100 - 1}`];
                swithToText(numText);
            } else if ((keyNum % 10) === 0) {
                numText += hundredsArr[`${Math.floor(keyNum / 100) - 1}`];
                ((keyNum % 100) === 10) ?  numText += tenTwoTenArr[0] : numText += tensArr[`${(keyNum % 100) / 10 - 2}`];
                swithToText(numText);
            } else {
                numText += hundredsArr[`${Math.floor(keyNum / 100) - 1}`];
                if ((keyNum % 100) < 10) {
                    numText += onesArr[`${keyNum % 100}`];
                    swithToText(numText);
                } else if ((keyNum % 100) < 20) {
                    numText += tenTwoTenArr[`${(keyNum % 100) - 10}`];
                    swithToText(numText);
                } else {
                    numText += tensArr[`${Math.floor(keyNum % 100 / 10) - 2}`];
                    numText += onesArr[`${keyNum % 10}`];
                    swithToText(numText);
                }
            }
        }
    }
}
