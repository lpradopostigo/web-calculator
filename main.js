// TODO percent
const addition = (a, b) => a + b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const substraction = (a, b) => a - b;

const numberButtons = document.getElementsByClassName('number');
const display = document.getElementById('display');
let waitingFlag = true;
let lockFlag = false;
let queue = [];

function operate() {
  queue[0] = queue[1](queue[0], queue[2]);
}

function numberAction(numberButton) {
  if (waitingFlag || (display.innerText[0] === '0' && display.innerText.length === 1)) {
    display.innerText = '';
    waitingFlag = false;
  }
  lockFlag = false;

  display.innerText += numberButton.innerText;
}

function operatorAction(operator) {
  waitingFlag = true;
  if (queue.length < 2) {
    queue.push(Number(display.innerText));
    queue.push(operator);
  } else if (!lockFlag) {
    queue.push(Number(display.innerText));
    operate();
    queue.pop();
    queue.pop();
    queue.push(operator);
    lockFlag = true;
    [display.innerText] = queue;
  }
}

for (let i = 0; i < numberButtons.length; i += 1) {
  numberButtons[i].addEventListener('click', () => { numberAction(numberButtons[i]); });
}

document.getElementById('ac').onclick = function () {
  display.innerText = '0';
  queue = [];
  waitingFlag = true;
  lockFlag = false;
};

document.getElementById('sign').onclick = () => {
  display.innerText = String(-1 * Number(display.innerText));
};
document.getElementById('dot').onclick = function () {
  if (!display.innerText.includes('.')) {
    display.innerText += '.';
    waitingFlag = false;
  }
};

document.getElementById('addition').onclick = () => {
  operatorAction(addition);
};

document.getElementById('subtraction').onclick = () => {
  operatorAction(substraction);
};

document.getElementById('multiplication').onclick = () => {
  operatorAction(multiplication);
};

document.getElementById('division').onclick = () => {
  operatorAction(division);
};

// FIXME
document.getElementById('equal').onclick = function () {
  if (queue.length === 0) {
    display.innerText = '0';
  } else {
    queue.push(Number(display.innerText));
    operate();
    queue.pop();

    [display.innerText] = queue;
    waitingFlag = true;
  }
};
