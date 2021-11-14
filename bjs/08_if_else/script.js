const newMaxInput = document.getElementById('newMaxInput');
const newMinInput = document.getElementById('newMinInput');
const btnLaunch = document.getElementById('btnLaunch');
const btnLaunchText = document.getElementById('btnLaunchText');
const gameSettingsText = document.getElementById('gameSettingsText');
const newLimits = document.getElementById('newLimits');
const gameInfo = document.getElementsByClassName('gameInfo');

let maxValue = parseInt(newMaxInput.value);
let minValue = parseInt(newMinInput.value);
let noError = true;

function preLaunch(func) {
    btnLaunch.addEventListener('click', func);
}

function disLaunch(func) {
    btnLaunch.removeEventListener('click', func);
}

function gameTurn(turn) {
    gameSettingsText.innerHTML += `${turn} <br>`;
    // console.log(turn);
}

function clearText() {
    gameSettingsText.innerHTML = '';
}

function setValue() {
    maxValue = parseInt(newMaxInput.value);
    minValue = parseInt(newMinInput.value);
    // console.log('Set min value to', minValue, '/ Set max value to', maxValue);
}

function setLimits() {
    gameMaxLimit = maxValue;
    gameMinLimit = minValue;
    gameMinLimitField.innerText = gameMinLimit;
    gameMaxLimitField.innerText = gameMaxLimit;
    // console.log('Set min limite on', gameMinLimit, '/ Set max limite on', gameMaxLimit);
}

function reEnteryLimits() {
    const reEnteryText = `<br>Повторно введите минимальное и максимальное значения от -999 до 999.`;
    gameTurn(reEnteryText);
}

function mistakeLimits() {
    // Для проверки работы функции fixLimits необходимо отключить код, проверяющий ошибку ввода.
    // Начало кода, проверяющего ошибку ввода:
    if (minValue >= 999 || maxValue > 999 || maxValue < -998) {
        clearText();
        if (minValue >= 999) {
            const inputMinErorr = `Вы ошиблись (min = ${minValue}): <br> минимальное значение можно указать <br> в промежутке от -999 до 998 <br>`;
            gameTurn(inputMinErorr);
        }
        if (maxValue > 999 || maxValue < -998) {
            const inputMaxErorr = `Вы ошиблись (max = ${maxValue}): <br> максимальное значение можно указать <br> в промежутке от -998 до 999`;
            gameTurn(inputMaxErorr);
        }
        reEnteryLimits();
        noError = false;
    } else 
    // Конец кода, проверяющего ошибку ввода.
    if (minValue > maxValue) {
        const mismatchErorr = `Вы ошиблись (min: ${minValue} > max: ${maxValue}): <br> минимальное значение необходимо указать меньше максимального.`;
        clearText();
        gameTurn(mismatchErorr);
        reEnteryLimits();
        noError = false;
    } else if (minValue == maxValue) {
        const matchErorr = `Вы ошиблись (min: ${minValue} = max: ${maxValue}): <br> минимальное значение необходимо указать неравное максимальному.`;
        clearText();
        gameTurn(matchErorr);
        reEnteryLimits();
        noError = false;
    } else {
        noError = true
    }
}

function fixLimits() {
    function minFix() {
        minValue = -999;
        // console.log('Fixed min to -999');
    }
    function maxFix() {
        maxValue = 999;
        // console.log('Fixed max to 999');
    }
    (minValue < -999 || minValue > 998) ? minFix():
        (minValue == null || '' || undefined) ? minFix() :
        (isNaN(minValue)) ? minFix() : minValue = minValue;

    (maxValue > 999 || maxValue < -998) ?  maxFix():
        (maxValue == null || '' || undefined) ? maxFix() :
        (isNaN(maxValue)) ? maxFix() : maxValue = maxValue;
}

function discover(id) {
    let covertItem = document.getElementById(`${id}`);
    covertItem.classList.add('discovert');
    covertItem.classList.remove('covert');
}

function cover(id) {
    let discovertItem = document.getElementById(`${id}`);
    discovertItem.classList.add('covert');
    discovertItem.classList.remove('discovert');
}

function discoverAll() {
    let covertNum = document.getElementsByClassName('covert').length;
    for (let i = (covertNum - 1); i >= 0; i--) {
        let covertItem = document.getElementsByClassName('covert')[i];
        covertItem.classList.add('discovert');
        covertItem.classList.remove('covert');
        if (i > 10 || i < -10) break;
    }
}

function coverAll() {
    let discovertNum = document.getElementsByClassName('discovert').length;
    for (let i = (discovertNum - 1); i >= 0; i--) {
        let discovertItem = document.getElementsByClassName('discovert')[i];
        discovertItem.classList.add('covert');
        discovertItem.classList.remove('discovert');
        if (i > 10 || i < -10) break;
    }
}

function coverGS() {
    cover('gameSettings')
}

function startGameText() {
    const startGameText = `Загадайте любое целое число <br> от ${minValue} до ${maxValue}, <br> а я его угадаю.`;
    clearText();
    gameTurn(startGameText);
}

function checkError() {
    if (noError == true) {
        disLaunch(setValue);
        disLaunch(mistakeLimits);
        disLaunch(checkError);
        fixLimits();
        setLimits();
        newMaxInput.value = '999';
        newMinInput.value = '-999';
        newLimits.classList.add('covert');
        btnLaunch.innerText = `let\'s go!`;
        startGameText();
        retry();
        preLaunch(discoverAll);
        preLaunch(coverGS);
    }
}

preLaunch(setValue);
preLaunch(mistakeLimits);
preLaunch(checkError);

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

document.getElementById('btnRetry').addEventListener('click', retry);

function retry() {
    minValue = gameMinLimit;
    maxValue = gameMaxLimit;
    orderNumber = 0;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    gameMainQuestion();
}

document.getElementById('btnChangeLimits').addEventListener('click', changeLimits);

function changeLimits() {
    coverAll();
    discover('gameSettings');
    discover('newLimits');
    newLimitsText();
    btnLaunch.innerText = `are you ready?`
    disLaunch(discoverAll);
    disLaunch(coverGS);
    preLaunch(setValue);
    preLaunch(mistakeLimits);
    preLaunch(checkError);
    preLaunch(retry);
}

function newLimitsText() {
    const newLimitsText =`Введите новые значения для игры<br>min и max от -999 до 999.`;
    clearText();
    gameTurn(newLimitsText);
}

function gameMainQuestion() {
    const phraseRandom = Math.round(Math.random() * 3);
    let questionPhrase;
    switch (phraseRandom) {
        case 1:
            questionPhrase = `Расчитываю число... \n Игрок загадал число: \n ${answerNumber}?..\n\u{1F916}`;
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
            answerPhrase = `Вы точно загадали число между \n ${gameMinLimit} и ${gameMaxLimit}?\n\u{1F928}`;
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
}

function findLowNum() {
    maxValue = answerNumber - 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber++;
    orderNumberField.innerText = orderNumber;
    gameMainQuestion();
    numToText(answerNumber);
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
    if (gameRun) {
        gameRightAnswers();
        numToText(answerNumber);
    }
})

function numToText(answerNumber) {
    let onesArr = ["", " один", " два", " три", " четыре", " пять", " шесть", " семь", " восемь", " девять"];
    let tenTwoTenArr = [" десять", " одиннадцать", " двенадцать", " тринадцать", " четырнадцать", " пятнадцать", " шестнадцать", " семнадцать", " восемнадцать", " девятнадцать"];
    let tensArr = [" двадцать", " тридцать", " сорок", " пятьдесят", " шестьдесят", " семьдесят", " восемьдесят", " девяносто"];
    let hundredsArr = [" сто", " двести", " триста", " четыреста", " пятьсот", " шестьсот", " семьсот", " восемьсот", " девятьсот"];
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
                ((keyNum % 100) === 10) ? numText += tenTwoTenArr[0]: numText += tensArr[`${(keyNum % 100) / 10 - 2}`];
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
