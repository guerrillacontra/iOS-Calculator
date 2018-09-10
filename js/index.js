class Calculator {
  constructor() {
    this._value = 0;
    this._buffer = "";
    this.outputChanged = output => {};
    this.ac = this.ac.bind(this);
    this.invert = this.invert.bind(this);
    this.equals = this.equals.bind(this);
    this.appendNumber = this.appendNumber.bind(this);
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
    this.mult = this.mult.bind(this);
    this.div = this.div.bind(this);
    this.percentage = this.percentage.bind(this);
  }

  ac() {
    this._value = 0;
    this._buffer = "";
    this.outputChanged(this._value);
  }

  equals() {
    this._value += eval(this._buffer);
    this._buffer = "";
    this.outputChanged(this._value);
  }

  invert() {
    this._buffer = -eval(this._buffer);
    this.outputChanged(this._buffer);
  }
  
  percentage(){
    const val = eval(this._buffer);
    const p = val / 100.0;
    this._buffer = p;
    this.outputChanged(this._buffer);
  }

  appendNumber(value) {
    this._buffer += value;
    this.outputChanged(this._buffer);
  }

  add() {
    this._buffer += "+";
    this.outputChanged(this._buffer);
  }

  sub() {
    this._buffer += "-";
    this.outputChanged(this._buffer);
  }

  mult() {
    this._buffer += "*";
    this.outputChanged(this._buffer);
  }

  div() {
    this._buffer += "/";
    this.outputChanged(this._buffer);
  }
}

const onLoad = () => {
  const calculator = new Calculator();

  const output = document.getElementById("output");

  calculator.outputChanged = val => {
    output.value = "" + val;
  };

  calculator.ac();

  const buttons = document.querySelectorAll("input[type=button]");

  const actionMap = new Map();
  actionMap.set("AC", calculator.ac);
  actionMap.set("+/-", calculator.invert);
  actionMap.set("%", calculator.percentage);
  actionMap.set("0", calculator.appendNumber);
  actionMap.set("1", calculator.appendNumber);
  actionMap.set("2", calculator.appendNumber);
  actionMap.set("3", calculator.appendNumber);
  actionMap.set("4", calculator.appendNumber);
  actionMap.set("5", calculator.appendNumber);
  actionMap.set("6", calculator.appendNumber);
  actionMap.set("7", calculator.appendNumber);
  actionMap.set("8", calculator.appendNumber);
  actionMap.set("9", calculator.appendNumber);
  actionMap.set("+", calculator.add);
  actionMap.set("-", calculator.sub);
  actionMap.set("x", calculator.mult);
  actionMap.set("÷", calculator.div);
  actionMap.set("=", calculator.equals);

  const onButtonClick = args => {
    const actionKey = args.target.value;

    const action = actionMap.get(actionKey);

    if (action) action(actionKey);
  };

  buttons.forEach(button => {
    button.addEventListener("click", onButtonClick);
  });
};

document.addEventListener("DOMContentLoaded", onLoad, false);
