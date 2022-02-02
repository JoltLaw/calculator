// Calculator h1 display, input buttons and clear button
const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// calculate first and second values depending on the operator
const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    
    "=": (firstNumber, secondNumber) => secondNumber,
    };

// calculator veriables
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// ----Functions----

function sendNumberValue(number) {
// replace current value if first value is entered.
if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
} else {
    // if current display value is zero replace if not add the new number.
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
}
}

function addDecimal() {
// if operator pressed don't add decimal
    if (awaitingNextValue) {return}
    // if no there is no decimal add one.
    if (!calculatorDisplay.textContent.includes(".")) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


function userOperator (operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // prevent multiple operators 
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    };
    // assign firstValue if no firstValue exists.
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation
        firstValue = calculation;
    }
    // ready for next value and storing operator
    awaitingNextValue = true;
    operatorValue = operator;
}

    // reset all values and display.
    function resetAll() {
        firstValue = 0;
        operatorValue = "";
        awaitingNextValue = false;
        calculatorDisplay.textContent = "0";
    }


 // ----event listeners----

    // add event listeners for numbers operators, and decimal buttons.
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () => userOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", () => addDecimal());
    }
    });
    clearBtn.addEventListener("click", resetAll);


