const tipList = document.querySelector(".tip-list");

let billValue = 0;
let noOfPeople = 0;
let selectedTip = null;

let tips = [
  {
    label: "5%",
    value: 5,
  },
  {
    label: "10%",
    value: 10,
  },
  {
    label: "15%",
    value: 15,
  },
  {
    label: "25%",
    value: 25,
  },
  {
    label: "50%",
    value: 50,
  },
  {
    label: "Custom",
    value: -1,
  },
];

const renderTips = () => {
  let tipInfoList = "";

  tips.forEach((tip) => {
    if (tip.label === "Custom") {
      let tipItem = `<div class="tip-info custom" id=${tip.value}>${tip.label}</div>`;
      tipInfoList += tipItem;
    } else {
      let tipItem = `<div class="tip-info" id=${tip.value}>${tip.label}</div>`;
      tipInfoList += tipItem;
    }
  });

  tipList.innerHTML = tipInfoList;
};

renderTips(); // RENDER LIST OF TIPS

const resetBtn = document.querySelector(".reset-button");
const totalAmountElement = document.querySelector(".total-result h1");
const tipAmountElement = document.querySelector(".tip-result h1");
const calculatorForm = document.querySelector(".calculatorForm");
const tipInfos = document.querySelectorAll(".tip-info");
const errorMessage = document.querySelector(".error-message");

calculatorForm.addEventListener("change", (e) => {
  billValue = calculatorForm.bill.value;
  noOfPeople = calculatorForm.peopleNo.value;

  if (calculatorForm.customInput) {
    selectedTip = calculatorForm.customInput.value;

    console.log(selectedTip, "calculatorForm.customInput");
  }

  calculateTip();
});

tipList.addEventListener("click", (e) => {
  clearTipInfoActiveClass();

  if (
    e.target.classList.contains("custom") &&
    e.target.classList.contains("tip-info")
  ) {
    changeCustomLabelToInput();
  } else if (e.target.classList.contains("tip-info")) {
    changeCustomInputToLabel();
    selectedTip = Number(e.target.id);
    e.target.classList.add("active");
    calculateTip();
  }
});

const calculateTip = () => {
  if (Number(billValue) === 0) {
    calculatorForm.bill.classList.add("isInvalid");
  } else {
    calculatorForm.bill.classList.remove("isInvalid");
  }

  if (Number(noOfPeople) === 0) {
    calculatorForm.peopleNo.classList.add("isInvalid");
    errorMessage.innerHTML = "Can't be zero";
  } else {
    calculatorForm.peopleNo.classList.remove("isInvalid");
    errorMessage.innerHTML = "";
  }

  console.log(noOfPeople, billValue);

  if (billValue > 0 && noOfPeople > 0 && selectedTip > 0) {
    // CALCULATE TIP AMOUNT
    const tipAmount = (Number(billValue) * Number(selectedTip)) / 100;
    const tipPerPerson = tipAmount / noOfPeople;

    tipAmountElement.innerHTML = `${tipPerPerson.toFixed(2)}`;

    // CALCULATE TOTAL AMOUNT
    const totalAmount = (Number(tipAmount) + Number(billValue)) / noOfPeople;
    totalAmountElement.innerHTML = "$" + String(totalAmount.toFixed(2));
  }
};

resetBtn.addEventListener("click", (e) => {
  resetCalculator();
});

const resetCalculator = () => {
  tipAmountElement.textContent = "$0.00";
  totalAmountElement.textContent = "$0.00";
  calculatorForm.reset();
  clearTipInfoActiveClass();
  changeCustomInputToLabel();
};

// CLEAR ALL ACTIVE CLASS FROM TIP INFO ELEMENTS
const clearTipInfoActiveClass = () => {
  tipInfos.forEach((tipInfo) => {
    tipInfo.classList.remove("active");
  });
};

// REPLACE CUSTOM TIP LABEL TO INPUT ELEMENT
const changeCustomLabelToInput = () => {
  const customLabel = document.querySelector(".tip-info.custom");
  const input = document.createElement("input");
  input.setAttribute("class", "form-control");
  input.setAttribute("type", "number");
  input.setAttribute("id", "customInput");
  input.setAttribute("placeholder", "0");
  tipList.replaceChild(input, customLabel);
};

// REPLACE CUSTOM TIP INPUT TO LABEL ELEMENT
const changeCustomInputToLabel = () => {
  const customInput = document.querySelector("#customInput");

  if (customInput) {
    const div = document.createElement("div");
    div.setAttribute("class", "tip-info custom");
    div.setAttribute("id", "-1");
    div.textContent = "Custom";
    tipList.replaceChild(div, customInput);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  resetCalculator();
});
