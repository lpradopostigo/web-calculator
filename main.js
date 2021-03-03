const addition = (a, b) => a + b;
const multiplication = (a, b) => a * b;
const division = (a, b) => a / b;
const substraction = (a, b) => a - b;

const numberButtons = document.querySelectorAll('.number');
const display = document.querySelector('#display');
let replaceFlag = true;
let lockFlag = false;

const queue = {
  data: [null, null, null],
  length: 0,

  look() {
    return this.data[0];
  },

  dequeue() {
    if (this.length !== 0) {
      this.length -= 1;
    }
    this.data.push(null);
    return this.data.shift();
  },

  enqueue(value) {
    for (let i = 0; i < this.data.length; i += 1) {
      if (this.data[i] === null) {
        this.data[i] = value;
        this.length += 1;
        return true;
      }
    }
    return false;
  },
  get isFull() {
    return this.data[2] !== null;
  },

  get isEmpty() {
    return this.data[0] === null;
  },

  clear() {
    this.data = [null, null, null];
    this.length = 0;
  },

};

function operate() {
  if (queue.isFull) {
    const a = queue.dequeue();
    const operator = queue.dequeue();
    const b = queue.dequeue();
    queue.enqueue(operator(a, b));
  }
}

function numberAction(numberButton) {
  if (
    replaceFlag
    || (display.innerText[0] === '0' && display.innerText.length === 1)
  ) {
    display.innerText = '';
    replaceFlag = false;
  }
  lockFlag = false;

  display.innerText += numberButton.innerText;
}

function operatorAction(operator) {
  replaceFlag = true;
  if (queue.length === 0) {
    queue.enqueue(Number(display.innerText));
    queue.enqueue(operator);
  } else if (queue.length === 1) {
    queue.enqueue(operator);
  } else if (!lockFlag) {
    queue.enqueue(Number(display.innerText));
    operate();
    queue.enqueue(operator);
    lockFlag = true;
    display.innerText = String(queue.look());
  }
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    numberAction(button);
  });
});

document.querySelector('#ac').onclick = () => {
  display.innerText = '0';
  queue.clear();
  replaceFlag = true;
  lockFlag = false;
};

document.querySelector('#sign').onclick = () => {
  display.innerText = String(-1 * Number(display.innerText));
};

// TODO understand classic functionality on add and subs operations
document.querySelector('#percentage').onclick = () => {
  if (queue.length === 2 && queue.data[1] === multiplication) {
    queue.enqueue(Number(display.innerText));
    operate();
    const tmp = queue.dequeue() / 100;
    queue.enqueue(tmp);
    display.innerText = String(queue.look());
  }
};

document.querySelector('#dot').onclick = () => {
  if (!display.innerText.includes('.')) {
    display.innerText += '.';
  } else if (replaceFlag) {
    display.innerText = '0.';
  }
  replaceFlag = false;
};

document.querySelector('#addition').onclick = () => {
  operatorAction(addition);
};

document.querySelector('#subtraction').onclick = () => {
  operatorAction(substraction);
};

document.querySelector('#multiplication').onclick = () => {
  operatorAction(multiplication);
};

document.querySelector('#division').onclick = () => {
  operatorAction(division);
};

// FIXME
document.querySelector('#equal').onclick = () => {
  if (queue.length !== 0) {
    queue.enqueue(Number(display.innerText));
    operate();

    display.innerText = String(queue.look());
    replaceFlag = true;
  }
};
