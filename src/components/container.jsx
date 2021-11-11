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

  const [err, setErr] = useState({
    isErr: false,
    message: "",
  });
  const handleInput = (e) => {
    if (e.target.name === "billInput") {
      // neu data.people === 0 show message
      if (Number(data.people) === 0 && Number(e.target.value) !== 0) {
        setErr({ isErr: true, message: "can't be zero" });
      } else {
        setErr({ isErr: true, message: "" });
      }
      setData({ ...data, bill: e.target.value || 0, isChange: true });
    }
    if (e.target.name === "peopleInput") {
      if (Number(data.bill) !== 0 && Number(e.target.value) === 0) {
        setErr({ isErr: true, message: "can't be zero" });
      } else {
        setErr({ isErr: true, message: "" });
      }
      setData({ ...data, people: e.target.value || 0, isChange: true });
    }
    if (e.target.name === "tipCustom") {
      setData({ ...data, tip: e.target.value || 0, isChange: true });
    }
  };
  console.log(data);
  const onFocusTipCustom = (e) => {
    setData({ ...data, tip: 0, isCustomTip: true });
    console.log("abc:", data);
  };
  const handleTipBtn = (e) => {
    let tipBtnValue = e.target.id.slice(11);
    if (Number(data.tip) !== Number(tipBtnValue)) {
      setData({ ...data, tip: Number(tipBtnValue), isCustomTip: false });
    } else {
      setData({ ...data, tip: 0, isCustomTip: false });
    }
  };
  const handleSubmit = async (e) => {
    try {
      if (!data.isChange) {
        return;
      }
      if (Number(data.bill) === 0) {
        setResult({
          tipAmount: "0.00",
          totalAmount: "0.00",
        });
      } else {
        // setData({ ...data, isChange: false });
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
    } catch (error) {
      alert("try it later");
    }
  };
  const onClickReset = (e) => {
    setData({ bill: 0, people: 0, tip: 0, isCustomTip: false });
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
          step="0"
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
  const { handleSubmit, resultCal, onClickReset } = props;
  return (
    <div className="bill__result">
      <TipAmount tipAmount={resultCal.tipAmount} />
      <TotalAmount totalAmount={resultCal.totalAmount} />
      <AccessBtn handleSubmit={handleSubmit} onClickReset={onClickReset} />
    </div>
  );
}
export default Container;
