const resultElement = document.getElementById("result");
const clearBtn = document.getElementById("clear-button");
const dltBtn = document.getElementById("delete-button");
const divideBtn = document.getElementById("divide-button");
const subBtn = document.getElementById("sub-button");
const addBtn = document.getElementById("add-button");
const resBtn = document.getElementById("result-button");
const decBtn = document.getElementById("point-button");
const mulBtn = document.getElementById("multiply-button");
const numberBtns = document.querySelectorAll(".number");

let result = "";
let operation = "";
let previousOperand = "";

const appendNumber = (number) => {
  if (number === "." && result.includes(".")) return; 
  result += number;
  updateDisplay();
};


const updateDisplay = () => {
  if (operation && previousOperand) {
    resultElement.innerText = `${previousOperand} ${operation} ${result}`;
  } else {
    resultElement.innerText = result || "0"; 
  }
};


const selectOperator = (operatorValue) => {
  if (result === "") return; 

  if (operation !== "" && previousOperand !== "") {
    calculateResult(); 
  }

  operation = operatorValue;
  previousOperand = result;
  result = "";
  updateDisplay();
};


const calculateResult = () => {
  let evaluatedResult;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(result);

  if (isNaN(prev) || isNaN(current)) return; 
  switch (operation) {
    case "+":
      evaluatedResult = prev + current;
      break;
    case "-":
      evaluatedResult = prev - current;
      break;
    case "/":
      evaluatedResult = current !== 0 ? prev / current : "Error"; 
      break;
    case "*":
      evaluatedResult = prev * current;
      break;
    default:
      return;
  }

  result = evaluatedResult.toString();
  operation = "";
  previousOperand = "";
  updateDisplay();
};


const clearDisplay = () => {
  result = "";
  previousOperand = "";
  operation = "";
  updateDisplay();
};


const dltLastDigit = () => {
  if (result) {
    result = result.slice(0, -1);
  } else if (operation) {
    operation = "";
    result = previousOperand;
    previousOperand = "";
  }
  updateDisplay();
};


numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
  });
});


decBtn.addEventListener("click", () => appendNumber("."));
addBtn.addEventListener("click", () => selectOperator("+"));
subBtn.addEventListener("click", () => selectOperator("-"));
divideBtn.addEventListener("click", () => selectOperator("/"));
mulBtn.addEventListener("click", () => selectOperator("*"));
resBtn.addEventListener("click", () => {
  if (result === "") return;
  calculateResult();
});
clearBtn.addEventListener("click", clearDisplay);
dltBtn.addEventListener("click", dltLastDigit);
