function add(a, b) {
    return parseFloat((a + b).toFixed(4));
}

function subtract(a, b) {
    return parseFloat((a - b).toFixed(4));
}

function multiply(a, b) {
    return parseFloat((a * b).toFixed(4));
}

function divide(a, b) {
    return parseFloat((a / b).toFixed(4));
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

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        if (display.textContent == '0') {
            display.textContent = digit.textContent;
        }
        else {
            display.textContent += digit.textContent;
        }
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
            let calc_operator;
            expression = expression.split(calc_operator = expression.match(/[^0-9\.]/)[0]);
            calc_value = operate(Number(expression[0]), calc_operator, Number(expression[1]));
            display.textContent = calc_value;
        }
        else {
            ++operationCount;
        }

        display.textContent += operator.textContent;
    })
});

function currentNumberContainsDecimal() {
    if (operationCount == 0) {
        return display.textContent.match(/\./);
    }
    else {
        let expression = display.textContent;
        expression = expression.split(expression.match(/[^0-9\.]/)[0]);
        return expression[1].match(/\./);
    }
}

decimal.addEventListener('click', () => {
    if (!currentNumberContainsDecimal()) {
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
    calc_value = operate(Number(expression[0]), operator, Number(expression[1]));
    display.textContent = calc_value;
    operationCount = 0;
}

//Enabling keypad input
window.addEventListener('keyup', (event) => {
    const key = event.key;
    if (parseInt(key)) {
        digits[Number(key)].click();
    }
    else if (key == '+') {
        document.querySelector('.add').click();
    }
    else if (key == '-') {
        document.querySelector('.subtract').click();
    }
    else if (key == '*') {
        document.querySelector('.multiply').click();
    }
    else if (key == '/') {
        document.querySelector('.divide').click();
    }
    else if (key == 'Backspace') {
        document.querySelector('.backspace').click();
    }
    else if (key == 'Enter') {
        document.querySelector('.equals').click();
    }
    else if (key == 'c') {
        document.querySelector('.clear').click();
    }
    else if (key == '.') {
        document.querySelector('.decimal').click();
    }
    
})







