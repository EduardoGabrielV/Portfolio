function updateDisplay(buttonValue) {
    let display = document.getElementsByClassName('calculator-screen')[0];
    if (display.value === "0") {
        display.value = buttonValue;
    } else {
        display.value += buttonValue;
    }
}

function clearDisplay() {
    let display = document.getElementsByClassName('calculator-screen')[0];
    display.value = "0";
}


function calculateResult() {
    let display = document.getElementsByClassName('calculator-screen')[0];
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Erro";
    }
}
