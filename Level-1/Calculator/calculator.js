const btnsEle = document.querySelectorAll(".btns button");
const advancedBtnsEle = document.querySelectorAll(".advanced-btns button");
const inputEle = document.getElementById("result");
const advancedBtns = document.querySelector('.advanced-btns');
const basicBtns = document.querySelector('.btns');
let btnValue;

for (let i = 0; i < btnsEle.length; i++) {
    btnsEle[i].addEventListener("click", () => {
        btnValue = btnsEle[i].textContent;

        if (btnValue === "AC") {
            clearResult();
        } else if (btnValue === "=") {
            calculatorResult();
        } else if (btnValue === "Cut") {
            cutNumber();
        } else if (btnValue === "🔁") {
            toggleAdvancedOptions();
        } else if (['+', '-', '*', '/', '%','.'].includes(btnValue)) {
            setOperator(btnValue);
        } else {
            appendValue();
        }
    });
}

for (let i = 0; i < advancedBtnsEle.length; i++) {
    advancedBtnsEle[i].addEventListener("click", () => {
        btnValue = advancedBtnsEle[i].textContent;

        if (btnValue === "AC") {
            clearResult();
        } else if (btnValue === "=") {
            calculatorResult();
        } else if (btnValue === "Cut") {
            cutNumber();
        } else if (btnValue === "🔁") {
            toggleAdvancedOptions();
        } else if (['+', '-', '*', '/', '%','.'].includes(btnValue)) {
            setOperator(btnValue);
        } else if (btnValue === "sin") {
            calculateTrigFunction("sin");
        } else if (btnValue === "cos") {
            calculateTrigFunction("cos");
        } else if (btnValue === "tan") {
            calculateTrigFunction("tan");
        } else if (btnValue === "lg") {
            calculateLog("log10");
        } else if (btnValue === "ln") {
            calculateLog("log");
        } else if (btnValue === "x!") {
            calculateFactorial();
        } else if (btnValue === "1/x") {
            calculateInverse();
        } else if (btnValue === "π") {
            inputEle.value += "π";
        } else if (btnValue === "e") {
            inputEle.value += "e";
        } else if (btnValue === "x^y") {
            setOperator("^");
        } else if (btnValue === "√") {
            calculateRoot();
        } else {
            appendValue();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key >= '0' && event.key <= '9') {
        appendKeyboardValue(event.key);
    } else if (['+', '-', '*', '/', '%','.'].includes(event.key)) {
        setOperator(event.key);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        calculatorResult();
    } else if (event.key === 'Backspace') {
        cutNumber();
    } else if (event.key === 'Escape') {
        clearResult();
    }
});

function clearResult() {
    inputEle.value = "";
}

function calculatorResult() {
    let expression = inputEle.value.replace(/π/g, Math.PI).replace(/e/g, Math.E).replace(/\^/g, "");

    if (['+', '-', '*', '/', '%','.'].includes(expression.slice(-1))) {
        expression = expression.slice(0, -1);
    }

    try {
        inputEle.value = eval(expression);
    } catch {
        inputEle.value = "Error";
    }
}

function appendValue() {
    if (inputEle.value === "Error") {
        clearResult();
    }
    inputEle.value += btnValue;
}

function appendKeyboardValue(value) {
    if (inputEle.value === "Error") {
        clearResult();
    }
    inputEle.value += value;
}

function cutNumber() {
    inputEle.value = inputEle.value.slice(0, -1);
}

function setOperator(operator) {
    const lastChar = inputEle.value.slice(-1);
    if (['+', '-', '*', '%', '/', '.'].includes(lastChar)) {
        inputEle.value = inputEle.value.slice(0, -1) + operator;
    } else {
        inputEle.value += operator;
    }
}

function toggleAdvancedOptions() {
    if (basicBtns.style.display === "grid") {
        basicBtns.style.display = "none";
        advancedBtns.style.display = "grid";
    } else {
        basicBtns.style.display = "grid";
        advancedBtns.style.display = "none";
    }
}

function calculateTrigFunction(func) {
    const value = parseFloat(inputEle.value);
    const result = Math[func](value * Math.PI / 180); // Convert to radians for trig functions
    inputEle.value = result;
}

function calculateLog(logType) {
    const value = parseFloat(inputEle.value);
    const result = logType === "log10" ? Math.log10(value) : Math.log(value);
    inputEle.value = result;
}

function calculateRoot() {
    const value = parseFloat(inputEle.value);
    inputEle.value = Math.sqrt(value);
}

function calculateFactorial() {
    let value = parseInt(inputEle.value);
    if (value < 0) {
        inputEle.value = "Error";
    } else {
        let result = 1;
        for (let i = value; i > 1; i--) {
            result *= i;
        }
        inputEle.value = result;
    }
}

function calculateInverse() {
    const value = parseFloat(inputEle.value);
    inputEle.value = 1 / value;
}