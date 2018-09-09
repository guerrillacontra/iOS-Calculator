var onLoad = function onLoad() {
  var output = document.getElementById("output");

  var buttons = document.querySelectorAll("input[type=button]");

  var total = 0;

  var buffer = "";
  var currentPush = "";
  var operatorCount = 0;

  var setOutput = function setOutput(val) {
    output.value = "" + val;
  };

  setOutput(total);

  var ac = function ac(args) {
    total = 0;
    buffer = "";
    operatorCount = 0;
    setOutput(total);
  };

  var pushNumber = function pushNumber(args) {
    buffer += args;
    currentPush += args;
    setOutput(currentPush);
  };

  //higher order wrapper around all operations
  var operatorWrap = function operatorWrap(action) {
    return function (args) {
      operatorCount++;

      if (operatorCount != 0) {
        valueEquals(args);
        operatorCount = 0;
      }

      currentPush = "";

      action(args);
    };
  };

  var add = function add(args) {
    buffer += "+";
  };

  var subtract = function subtract(args) {
    buffer += "-";
  };

  var divide = function divide(args) {
    var current = Number(eval(buffer));

    if (current == 0) {
      ac(args);
      return;
    }

    buffer += "/";
    operatorCount++;
    if (operatorCount == 2) {
      valueEquals(args);
    }
  };

  var multiply = function multiply(args) {
    buffer += "*";
    operatorCount++;
    if (operatorCount == 2) {
      valueEquals(args);
    }
  };

  var valueEquals = function valueEquals(args) {
    total = eval(buffer);
    buffer = "" + total;
    operatorCount = 0;
    currentPush = "";
    setOutput(total);
  };

  var actionMap = new Map();
  actionMap.set("AC", ac);
  actionMap.set("0", pushNumber);
  actionMap.set("1", pushNumber);
  actionMap.set("2", pushNumber);
  actionMap.set("3", pushNumber);
  actionMap.set("4", pushNumber);
  actionMap.set("5", pushNumber);
  actionMap.set("6", pushNumber);
  actionMap.set("7", pushNumber);
  actionMap.set("8", pushNumber);
  actionMap.set("9", pushNumber);
  actionMap.set("+", operatorWrap(add));
  actionMap.set("-", operatorWrap(subtract));
  actionMap.set("÷", operatorWrap(divide));
  actionMap.set("x", operatorWrap(multiply));
  actionMap.set("=", valueEquals);

  var onButtonClick = function onButtonClick(args) {
    var actionKey = args.target.value;

    var action = actionMap.get(actionKey);

    if (action) action(actionKey);
  };

  buttons.forEach(function (button) {
    button.addEventListener("click", onButtonClick);
  });
};

document.addEventListener("DOMContentLoaded", onLoad, false);