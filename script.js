function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '×':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            console.log(`Error: Invalid operator ${operator}`);
            return;
    }
}

const display = document.querySelector('.display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const equals = document.querySelector('.equals');

let calc_operator;
let decimalEnabled = true;

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (display.textContent == '0') {
            display.textContent = digit.textContent;
        }
        else {
            display.textContent += digit.textContent;    
        }
        calc_operator = null;
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (calc_operator) {
            display.textContent = display.textContent.slice(0, -1);
        }
        calc_operator = operator.textContent;
        display.textContent += calc_operator;
        decimalEnabled = true;
    })
});

decimal.addEventListener('click', () => {
    if (decimalEnabled) {
        display.textContent += '.';
        decimalEnabled = false;
    }
})

clear.addEventListener('click', () => {
    display.textContent = '0';
    decimalEnabled = true;
});

backspace.addEventListener('click', () => {
    const length = display.textContent.length;
    if (display.textContent[length - 1] == '.')
        decimalEnabled = true;
    if (length == 1) {
        display.textContent = '0';
    }
    else
        display.textContent = display.textContent.slice(0, -1);
});

equals.addEventListener('click', evaluate);
function evaluate() {
    let expression = display.textContent;
    let calc_value = 0;
    let operator;
    let nextOperator;
    while (true) {
        operator = expression.match(/[^0-9\.]/); //Finding next operator
        const a = Number(expression.slice(0, operator.index));
        expression = expression.slice(operator.index + 1);
        nextOperator = expression.match(/[^0-9\.]/);
        if (!nextOperator) {
            const b = Number(expression);
            display.textContent = operate(a, operator[0], b);
            break;
        }
        const b = Number(expression.slice(0, nextOperator.index));
        expression = expression.slice(nextOperator.index);
        calc_value = operate(a, operator[0], b);
        expression = calc_value + expression;
    }
    
}








