// screen reset flag
let screenResetFlag = false;

// buttons
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const infoButton = document.getElementById("info-button")
const lowerScreen = document.getElementById("lower-screen");
const upperScreen = document.getElementById("upper-screen");

// event listeners
numberButtons.forEach((btn) => {
    btn.addEventListener('click', () => checkScreenReset())
    btn.addEventListener('click', () => updateScreenNumber(btn.textContent))
});

operationButtons.forEach((btn) => {
    console.log(btn);
    btn.addEventListener('click', () => updateScreenOperation(btn.textContent));
});

clearButton.addEventListener('click', clearScreen);
equalsButton.addEventListener('click', displayResults);
infoButton.addEventListener('click', showInfo);
window.addEventListener('keydown', getKeyboardInput);

// TODO 
// (1) fix negative number issue
// (2) decimal support
// (3) exponent/factorial support
// (4) keyboard functionality

// basic math
function add(a, b) {
    return Number(a) + Number(b);
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

// calculator operations
// appends the number to the screen
function updateScreenNumber(num) {
    screenResetFlag = false;
    upperScreen.textContent += num;
}

// appends the operator to the screen
// conducts the current operation if need be 
function updateScreenOperation(oper) {
    // operand1 = lowerScreen.textContent;
    // currentOper = oper;
    upperScreen.textContent;
    if (upperScreen.textContent.search(/[+-/x]/) != -1) {
        setNextOperation(oper);
    } 
    upperScreen.textContent += oper;
    screenResetFlag = false; // stop screen reset if chaining operations
}

function clearScreen() {
    upperScreen.textContent = '';
    lowerScreen.textContent = '';
}

// conducts the current operation
function setNextOperation() {
    upperScreen.textContent = operate();
}

// function to actually perform the operation 
function operate() {
    let currentOpArr = upperScreen.textContent.split(/(\d+)/g).filter(n => n);

    // adjusts the first element of the operation array to a negative number
    if (currentOpArr[0] == '-') {
        currentOpArr[1] = '-' + currentOpArr[1];
        currentOpArr.shift();
    }

    console.log(currentOpArr);
    let operator = currentOpArr[1];
    switch (operator) {
        case '+':
            return add(currentOpArr[0], currentOpArr[2]);
        case '-':
            return subtract(currentOpArr[0], currentOpArr[2]);
        case 'x':
            return multiply(currentOpArr[0], currentOpArr[2]);
        case '/':
            if (currentOpArr[2] == 0) {
                handleZeroDivision();
            } else {
                return divide(currentOpArr[0], currentOpArr[2]);
            }
    }
} 

// try it, see what happens
function handleZeroDivision() {
    clearScreen();
    document.getElementById('calcContainer').innerHTML = "<iframe title='YouTube video player' type=\'text/html\' width='640' height='390' src='https://www.youtube.com/embed/t6pqzBuaePI?controls=0&autoplay=1' frameborder='0' allowFullScreen></iframe>"
}

function displayResults() {
    screenResetFlag = true;
    lowerScreen.textContent = operate();
}

function checkScreenReset() {
    if (screenResetFlag) {
        // only clear the main screen
        // lowerScreen.textContent = '';
        clearScreen();
    }
}

function getKeyboardInput(e) {
    let keyPressed = e.key;
    switch (keyPressed) {
        case '=':
        case 'Enter':
            displayResults();
            break;
        case 'Backspace':
            clearScreen();
            break;
        case '+':
        case '-':
        case '/':
        case 'x':
            updateScreenOperation(keyPressed);
            break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            updateScreenNumber(keyPressed);
            break;
    }
}

// let resetInfo = false;
function showInfo(e) {
    let info1 = document.createElement("p");
    let info2 = document.createElement("p");
    info1.textContent = "This calculator doesn't handle decimals or offer ability to input negatives (gotta subtract first)."
    info2.textContent = "It does annihilate the world if you divide by zero."
    e.target.parentNode.appendChild(info1);
    e.target.parentNode.appendChild(info2);

    let resetInfo = document.createElement("button");
    resetInfo.textContent = "Got it";
    resetInfo.setAttribute('class', 'btn')
    resetInfo.addEventListener('click', (e) =>{
        e.target.parentNode.removeChild(info1);
        e.target.parentNode.removeChild(info2);
        e.target.parentNode.removeChild(resetInfo);
    });

    e.target.parentNode.appendChild(resetInfo);
    
}