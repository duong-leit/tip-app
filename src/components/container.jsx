import React, { useState } from "react";
import { BillInput, TipOption, PeopleInput } from "./compute/compute";
import { TipAmount, TotalAmount, AccessBtn } from "./result/result";

const tipList = [5, 10, 15, 25, 50];
const url = `https://plitter-server.vercel.app/api/`;

function Container() {
  const [data, setData] = useState({
    bill: 0,
    people: 0,
    tip: 0,
    isCustomTip: false,
    isChange: false,
  });
  const [resultCal, setResult] = useState({
    tipAmount: "0.00",
    totalAmount: "0.00",
  });

  const [isCalculator, setCalculator] = useState(false);

  const [err, setErr] = useState({
    isErr: false,
    message: "",
  });
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let rgx = inputName !== "people" ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;
    if (rgx.test(inputValue) || inputValue === "") {
      if (Number(inputValue) <= 10 ** 16) {
        setData({ ...data, [inputName]: inputValue || 0, isChange: true });
      }
    }
  };
  const onFocusTipCustom = (e) => {
    // neu isCustomTip == true, nothing
    //false: setData
    setData({ ...data, tip: 0, isCustomTip: true, isChange: true });
  };
  const handleTipBtn = (value) => {
    if (Number(data.tip) !== parseInt(value)) {
      setData({
        ...data,
        tip: parseInt(value),
        isCustomTip: false,
      });
    } else {
      if (data.isCustomTip) setData({ ...data, isCustomTip: false });
      setData({ ...data, tip: 0, isCustomTip: false });
    }
  };
  const handleSubmit = async (e) => {
    try {
      setCalculator(true);
      if (data.isChange) {
        if (Number(data.people) === 0 && Number(data.bill) !== 0) {
          setErr({ isErr: true, message: "can't be zero" });
        } else {
          setErr({ isErr: true, message: "" });
        }

        if (Number(data.bill) === 0) {
          setResult({
            tipAmount: "0.00",
            totalAmount: "0.00",
          });
        } else {
          setData({ ...data, isChange: false });
          let results = await fetch(
            `${url}calculate?bill=${Number(data.bill)}&people=${Number(
              data.people
            )}&tipPercent=${Number(data.tip)}`
          );
          results = await results.json();
          if (results["result"]) {
            setResult({
              tipAmount: results["amount"].toFixed(2),
              totalAmount: results["total"].toFixed(2),
            });
          }
        }
      }
      setCalculator(false);
    } catch (error) {
      alert("try it later");
    }
  };
  const onClickReset = (e) => {
    setData({ bill: 0, people: 0, tip: 0, isCustomTip: false });
    setErr({ isErr: false, message: "" });
    setResult({ tipAmount: "0.00", totalAmount: "0.00" });
  };
  return (
    <section className="bill">
      <BillCompute
        className="bill__compute"
        data={data}
        handleInput={handleInput}
        messageValidata={err.message}
        handleTipBtn={handleTipBtn}
        onFocusTipCustom={onFocusTipCustom}
      />
      <BillResult
        className="bill__result"
        data={data}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        resultCal={resultCal}
        onClickReset={onClickReset}
        isCalculator={isCalculator}
      />
    </section>
  );
}

function BillCompute(props) {
  const { data, handleInput, messageValidata, handleTipBtn, onFocusTipCustom } =
    props;
  return (
    <div className="bill__compute">
      <form id="billForm" name="billForm">
        <BillInput data={data} handleInput={handleInput} />
        <TipOption
          optionList={tipList}
          minCustom="0"
          step="0.01"
          data={data}
          handleInput={handleInput}
          handleTipBtn={handleTipBtn}
          onFocusTipCustom={onFocusTipCustom}
        />
        <PeopleInput
          data={data}
          handleInput={handleInput}
          messageValidata={messageValidata}
        />
      </form>
    </div>
  );
}
function BillResult(props) {
  const { handleSubmit, resultCal, onClickReset, isCalculator } = props;
  return (
    <div className="bill__result">
      <TipAmount tipAmount={resultCal.tipAmount} isCalculator={isCalculator} />
      <TotalAmount
        totalAmount={resultCal.totalAmount}
        isCalculator={isCalculator}
      />
      <AccessBtn
        handleSubmit={handleSubmit}
        onClickReset={onClickReset}
        isCalculator={isCalculator}
      />
    </div>
  );
}
export default Container;
