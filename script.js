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
    ++operationCount;
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

let calc_value = 0;
let operationCount = 0;

function changeZeroToFirstDigit(digit) {
    if (display.textContent == '0') {
        display.textContent = digit.textContent;
    }
    else {
        display.textContent += digit.textContent;
    }
}

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        changeZeroToFirstDigit(digit);
    })
});

function checkIfLastCharacterIsOperator(operator) {
    if (display.textContent.slice(-1).match(/[^0-9\.]/)) {
        return true;
    }
    return false
} 

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        //Check whether last input was also operator
        let operatorChanged = checkIfLastCharacterIsOperator(operator);

        if (operatorChanged) {
            display.textContent = display.textContent.slice(0, -1);
        }

        //Don't trigger if first operation or operator was changed
        if (operationCount > 0 && !operatorChanged) { 
            let expression = display.textContent;
            expression = expression.split(expression.match(/[^0-9\.]/)[0])
            calc_value = operate(Number(expression[0]), calc_operator, Number(expression[1]));
            display.textContent = calc_value;
        }

        display.textContent += operator.textContent;
    })
});

function currentNumberIsInteger() {
    if (operationCount == 0) {
        return Number.isInteger((Number(display.textContent)));
    }
    else {
        let expression = display.textContent;
        expression = expression.split(expression.match(/[^0-9\.]/)[0]);
        return Number.isInteger((Number(expression[1])));
    }
}

decimal.addEventListener('click', () => {
    if (currentNumberIsInteger()) {
        display.textContent += '.';
    }
})


clear.addEventListener('click', () => {
    //Resetting 
    display.textContent = '0';
    operationCount = 0;
    calc_value = 0;
});



backspace.addEventListener('click', () => {
    if (operationCount == 0) {
        if (calc_value == 0) {
            return;
        }
        else {
            calc_value = Number(display.textContent = display.textContent.split(0, -1));
            display.textContent = display.textContent.slice(0, -1);
        }
    }
    else {
        display.textContent = display.textContent.slice(0, -1);
    }
});

equals.addEventListener('click', evaluate);
function evaluate() {
    let expression = display.textContent;
    let operator;
    expression = expression.split(operator = expression.match(/[^0-9\.]/)[0]);
    calc_value = operate(expression[0], operator, expression[1]);
    display.textContent = calc_value;
    operationCount = 0;
}








