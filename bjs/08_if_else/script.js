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
    if (gameRun) {
        (minValue == maxValue) ? gameWrongAnswers(): findUpNum();
        numToText();
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        (minValue == maxValue) ? gameWrongAnswers(): findLowNum();
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        gameRightAnswers();
    }
})

let onesArr = ["", " один", " два", " три", " четыре", " пять", " шесть", " семь", " восемь", " девять"];
let tenTwoTenArr = ["", " десять", " одиннадцать", " двенадцать", " тринадцать", " четырнадцать", " пятнадцать", " шестнадцать", " семнадцать", " восемнадцать", " девятнадцать"];
let tensArr = ["", " двадцать", " тридцать", " сорок", " пятьдесят", " шестьдесят", " семьдесят", " восемьдесят", " девяносто"];
let hundredsArr = ["", " сто", " двести", " триста", " четыреста", " пятьсот", " шестьсот", " семьсот", " восемьсот", " девятьсот"];
let absNum = Math.abs(answerNumber);
let answerNumberText = "";

function numToText(answerNumber) {
    absNum = Math.abs(answerNumber);
    answerNumberText = "";
    let minusText = "минус";
    let onesText = onesArr[absNum];
    let nullNext = "ноль";
    let tenTwoTenText = tenTwoTenArr[absNum - 10];
    let tensText = tensArr[Math.floor(absNum / 10) - 1];
    let hundredsText = hundredsArr[Math.floor(absNum / 100)];
    let tail_10 = absNum - Math.floor(absNum / 10);
    let tail_100 = absNum - Math.floor(absNum / 100);



    if (answerNumber < 0) {
        answerNumberText += minusText
    }

    if (absNum < 10 && absNum != 0) {
        answerNumberText += onesText
    }

    if (absNum == 0) {
        answerNumberText += nullNext
    }

    if (absNum >= 10 && absNum < 20) {
        answerNumberText += tenTwoTenText
    }

    if (absNum >= 20 && absNum < 100) {
        onesText = onesArr[tail_10];
        answerNumberText += (tensText + onesText);
    }

    if (absNum >= 100 && absNum < 1000 && absNum % 100 == 0) {
        answerNumberText += hundredsText;
        if (tail_100 >= 10 && tail_100 < 20) {
            tenTwoTenText = tenTwoTenArr[tail_100 - 9];
            answerNumberText += (hundredsText + tenTwoTenText);
        } else if (tail_100 >= 20) {
            tensText = tensArr[Math.floor(tail_100 / 10) - 1];
            onesText = onesArr[tail_100 % 10];
            answerNumberText += (hundredsText + tensText + onesText);
        } else if (tail_100 != 0) {
            onesText = onesArr[tail_100];
            answerNumberText += (hundredsText + onesText);
        }
    }
    console.log(answerNumberText);
    console.log(`${minusText}${hundredsText}${tensText}${tenTwoTenText}${onesText}`);
}

function isMinus() {
    answerNumberText += "минус";
    return answerNumberText;
}

function isOnes(absNum) {
    answerNumberText += onesArr[absNum];
    return answerNumberText;
}

function isNull() {
    answerNumberText += "ноль";
    return answerNumberText;
}

function isTenTwoTen(absNum) {
    answerNumberText += tenTwoTenArr[absNum - 10];
    return answerNumberText;
}

function isTens(absNum) {
    answerNumberText += tensArr[Math.floor(absNum / 10) - 2];
    let tail = absNum - Math.floor(absNum / 10);
    isOnes(tail);
    return answerNumberText;
}

function isHundreds(absNum) {
    answerNumberText += hundredsArr[Math.floor(absNum / 100) - 1];
    let tail = absNum - Math.floor(absNum / 100);
    if (tail >= 10 && tail < 20) {
        isTenTwoTen(tail);
    } else if (tail >= 20) {
        isTens(tail);
    } else if (tail != 0) {
        isOnes(tail);
    }
    return answerNumberText;
}