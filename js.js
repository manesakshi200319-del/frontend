const resultElement = document.getElementById("result");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");
const buttons = document.querySelectorAll(".buttons button");

function parseValues() {
  const firstValue = parseFloat(input1.value);
  const secondValue = parseFloat(input2.value);
  return {
    a: firstValue,
    b: secondValue,
    valid: !Number.isNaN(firstValue) && !Number.isNaN(secondValue),
  };
}

function resetResultStyle() {
  resultElement.style.color = "";
}

function showResult(value) {
  resetResultStyle();
  resultElement.textContent = `Result: ${value}`;
}

function showError(message) {
  resultElement.style.color = "#b91c1c";
  resultElement.textContent = message;
}

function calculate(operation) {
  if (operation === "clear") {
    input1.value = "";
    input2.value = "";
    showResult(0);
    return;
  }

  const { a, b, valid } = parseValues();

  if (!valid) {
    showError("Please enter both numbers to calculate.");
    return;
  }

  let answer;
  switch (operation) {
    case "add":
      answer = a + b;
      break;
    case "subtract":
      answer = a - b;
      break;
    case "multiply":
      answer = a * b;
      break;
    case "divide":
      if (b === 0) {
        showError("Cannot divide by zero.");
        return;
      }
      answer = a / b;
      break;
    default:
      return;
  }

  const formatted = Number.isInteger(answer)
    ? answer
    : answer.toFixed(6).replace(/\.0+$|(?<=[0-9])0+$/, "");
  showResult(formatted);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => calculate(button.dataset.op));
});

input1.addEventListener("keydown", handleEnterKey);
input2.addEventListener("keydown", handleEnterKey);

function handleEnterKey(event) {
  if (event.key === "Enter") {
    calculate("add");
  }
}
