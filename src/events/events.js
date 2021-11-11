const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//url
const url = `https://plitter-server.vercel.app/api/`;

// element
let billTotal = $("#billTotal");
let numberDivision = $("#numberDivision");
let tipCustom = $(".tip-option.opt-custom");
let tipBtnArr = $$("button.tip-option");
let tipPerPerson = $("#tipPerPerson");
let totalPerPerson = $("#totalPerPerson");
let resetBtn = $("#btn-reset");
let submitBtn = $("#btn-submit");

const events = {
  initValue: function () {
    billTotal.value = 0;
    numberDivision.value = 0;
    tipCustom.value = "";
    tipPerPerson.value = "0.00";
    totalPerPerson.value = "0.00";
  },
  handleEvents: function () {
    billTotal.addEventListener("input", (e) => {
      let isValid = this.validate("#billTotal", "bill");
      if (isValid) {
        billTotal.value = billTotal.value.replace(/[e\+\-]/gi, "");
        if (parseInt(numberDivision.value) == 0) {
          if (parseInt(billTotal.value) == 0) {
            $("span.error-number").style.display = "none";
            return;
          }
          $("span.error-number").style.display = "inline";
        }
      } else {
        $("#billTotal").value = "0";
      }
    });

    numberDivision.addEventListener("input", () => {
      let isValid = this.validate("#numberDivision", "people");

      if (isValid == 1) {
        numberDivision.value = numberDivision.value.replace(/[e\+\-]/gi, "");
        let billValue = parseFloat(billTotal.value);
        if (billValue == 0) {
        } else {
          if (!parseInt(numberDivision.value)) {
            //check bill !=0, people ==0
            $("span.error-number").style.display = "inline";
          } else {
            $("span.error-number").style.display = "none";
          }
        }
      } else {
        this.resetValueInput("#numberDivision", "0");
      }
    });

    resetBtn.addEventListener("click", () => {
      let calculateList = $$(".bill input");
      let tipBtn = $(".tip-option.active");
      let resetLength = calculateList.length;
      for (let i = 0; i < resetLength; i++) {
        if (i === 2) calculateList[i].value = "0";
        else if (i === 1) calculateList[i].value = "";
        else calculateList[i].value = "0.00";
      }
      if (tipBtn) tipBtn.classList.remove("active");
    });

    tipCustom.addEventListener("focus", () => {
      let currentTipBtn = $(`button.tip-option.active`);
      if (currentTipBtn) currentTipBtn.classList.remove("active");
    });

    tipCustom.addEventListener("input", () => {
      let isValid = this.validate(".tip-option.opt-custom", "tip");
      if (isValid == 1) {
        tipCustom.value = tipCustom.value.replace(/[e\+\-]/gi, "");
        let billValue = parseFloat(billTotal.value);
        if (billValue == 0) {
        } else {
          if (!parseInt(numberDivision.value)) {
            //check bill !=0, people ==0
            $("span.error-number").style.display = "inline";
            return;
          }
          $("span.error-number").style.display = "none";
        }
      } else {
        this.resetValueInput(".tip-option.opt-custom", "0");
      }
    });

    tipBtnArr.forEach((element, index) => {
      element.addEventListener("click", (e) => {
        tipCustom.value = "";
        let currentTipBtn = $(`button.tip-option.active`);
        if (currentTipBtn) {
          if (currentTipBtn.id == e.target.id) {
            currentTipBtn.classList.remove("active");
          } else {
            currentTipBtn.classList.remove("active");
            e.target.classList.add("active");
          }
        } else {
          e.target.classList.add("active");
        }
      });
    });

    [(billTotal, numberDivision, tipCustom)].forEach((element) => {
      element.addEventListener("keypress", (e) => {
        if (["+", "-", "e"].includes(e.key)) {
          e.preventDefault();
        }
      });
    });

    submitBtn.addEventListener("click", () => {
      resetBtn.disabled = submitBtn.disabled = true;
      let bill = billTotal.value;
      let people = numberDivision.value;
      let tip = 0;
      let tipDefault = $("button.tip-option.active");
      if (tipDefault) {
        tip = tipDefault.value;
      } else if (tipCustom.value) {
        tip = tipCustom.value;
      }
      this.calculate(bill, people, tip, tipPerPerson, totalPerPerson).then(
        function () {
          resetBtn.disabled = submitBtn.disabled = false;
        }
      );
    });
  },
  validate: function (tagName = -1, typeTag) {
    //-1: notAvalable; 0: reset ; 1: calculate
    if (!tagName || tagName == -1) {
      return false;
    }
    let tagElement = $(tagName);
    let tagValue = tagElement.value;
    if (!tagValue) {
      return false;
    }
    let minValue = 0;
    switch (typeTag) {
      case "bill":
        minValue = 0;
        tagValue = parseFloat(tagValue);
        break;

      case "tip":
        minValue = 0;
        tagValue = parseFloat(tagValue);
        break;

      case "people":
        minValue = 1;
        tagValue = parseInt(tagValue);
        break;
      default:
        return -1;
    }
    if (tagValue < 0) {
      return false;
    }
    return true;
  },

  resetValueInput: function (tagName, valueReset) {
    // float: "0.00"; int "0"
    $(tagName).value = valueReset;
  },

  calculate: async function (
    billValue,
    peopleValue = 1,
    tipValue,
    tipAmount,
    totalAmount
  ) {
    try {
      billValue = billValue ? parseFloat(billValue) : 0;
      peopleValue = peopleValue ? parseInt(peopleValue) : 1;
      tipValue = peopleValue ? parseFloat(tipValue) : 0;
      let data = await this.getData(billValue, peopleValue, tipValue);
      data = await data.json();
      if (data["result"] == true) {
        tipAmount.value = data["amount"].toFixed(2);
        totalAmount.value = data["total"].toFixed(2);
      }
    } catch (error) {
      alert("try it later");
    }
  },

  isActiveTip: function (tagName, classRemove) {
    let currentTip = $(classRemove);
    let newTip = $(tagName);
    if (currentTip.id == newTip.id) {
      currentTip.classList.remove("active");
    }
    $(classRemove).classList.remove("active");
    $(tagName).classList.toggle("active");
  },

  getData: async function (bill = 0, people = 1, tip = 0) {
    return fetch(
      `${url}calculate?bill=${bill}&people=${people}&tipPercent=${tip}`
    );
  },

  resetAll: function () {
    let calculateList = $$(".bill input");
    let tipBtn = $(".tip-option.active");
    let resetLength = calculateList.length;
    for (let i = 0; i < resetLength; i++) {
      if (i === 2) calculateList[i].value = "0";
      else calculateList[i].value = "0.00";
    }
    if (tipBtn) tipBtn.classList.remove("active");
  },

  resetValueInput: function (tagName, valueReset) {
    $(tagName).value = valueReset;
  },

  start: function () {
    this.initValue();
    this.handleEvents();
  },
};

events.start();
function validate(tagName = -1, typeTag) {
  //-1: notAvalable; 0: reset ; 1: calculate
  if (!tagName || tagName == -1) {
    return false;
  }
  let tagElement = $(tagName);
  let tagValue = tagElement.value;
  if (!tagValue) {
    return false;
  }
  let minValue = 0;
  switch (typeTag) {
    case "bill":
      minValue = 0;
      tagValue = parseFloat(tagValue);
      break;

    case "tip":
      minValue = 0;
      tagValue = parseFloat(tagValue);
      break;

    case "people":
      minValue = 1;
      tagValue = parseInt(tagValue);
      break;
    default:
      return -1;
  }
  if (tagValue < 0) {
    return false;
  }
  return true;
}

function handleBillInput(e) {
  let isValid = this.validate("#billTotal", "bill");
  if (data)
    if (isValid) {
      billTotal.value = billTotal.value.replace(/[e\+\-]/gi, "");
      if (
        parseInt(numberDivision.value) === 0 ||
        parseInt(billTotal.value) === 0
      ) {
        $("span.error-number").style.display = "none";
        return;
      }
      $("span.error-number").style.display = "inline";
    } else {
      $("#billTotal").value = "0";
    }
}
export default { handleBillInput };
