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
  if (queue.length < 2) {
    queue.enqueue(Number(display.innerText));
    queue.enqueue(operator);
  } else if (!lockFlag) {
    queue.enqueue(Number(display.innerText));
    operate();
    queue.enqueue(operator);
    lockFlag = true;
    display.innerText = queue.look();
  }
}

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    numberAction(button);
  });
});

document.getElementById('ac').onclick = function () {
  display.innerText = '0';
  queue.clear();
  replaceFlag = true;
  lockFlag = false;
};

document.getElementById('sign').onclick = () => {
  display.innerText = String(-1 * Number(display.innerText));
};

// document.getElementById('percentage').onclick = () => {
//   if (queue.length === 0) {
//     display.innerText = '0';
//   } else if (queue.length === 2 && queue[1] === multiplication) {
//     queue.push(Number(display.innerText));
//     operate();
//     queue.pop();
//     queue.pop();
//     queue[0] /= 100;
//     [display.innerText] = queue;
//   }
// };

document.getElementById('dot').onclick = function () {
  if (!display.innerText.includes('.')) {
    display.innerText += '.';
    replaceFlag = false;
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

// document.getElementById('equal').onclick = function () {
//   if (queue.length === 0) {
//     display.innerText = '0';
//   } else {
//     queue.push(Number(display.innerText));
//     operate();
//     queue.pop();

//     [display.innerText] = queue;
//     replaceFlag = true;
//   }
// };
