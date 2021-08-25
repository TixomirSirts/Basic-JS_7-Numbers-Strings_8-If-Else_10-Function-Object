let lastOperand = 0;
let operation = null;

const inputWindow = document.getElementById('inputWindow');


document.getElementById('btn_1').addEventListener('click', function () {
    inputWindow.value += 1;
})

document.getElementById('btn_sum').addEventListener('click', function () {
    lastOperand = parseInt(inputWindow.value);
    operation = 'sum';
    inputWindow.value = '';
})

document.getElementById('btn_dif').addEventListener('click', function () {
    lastOperand = parseInt(inputWindow.value);
    operation = 'dif';
    inputWindow.value = '';    
})

document.getElementById('btn_calc').addEventListener('click', function () {
    if (operation === 'sum') {
        const result = lastOperand + parseInt(inputWindow.value);
        operation = null;
        lastOperand = 0;
        inputWindow.value = result;
    }
    if (operation === 'dif') {
        const result = lastOperand - parseInt(inputWindow.value);
        operation = null;
        lastOperand = 0;
        inputWindow.value = result;
    }
})

document.getElementById('btn_clr').addEventListener('click', function () {
    lastOperand = 0;
    operation = null;
    inputWindow.value = '';
})

