import React from "react";
import { BillInput, TipOption, PeopleInput } from "./compute/compute";
import { TipAmount, TotalAmount, AccessBtn } from "./result/result";

const tipOption = [5, 10, 15, 25, 50];

function Container() {
  return (
    <section className="bill">
      <BillCompute className="bill__compute" />
      <BillResult className="bill__result" />
    </section>
  );
}

function BillCompute() {
  return (
    <div className="bill__compute">
      <form id="billForm" name="billForm">
        <BillInput />
        <TipOption optionList={tipOption} minCustom="0" step="0" />
        <PeopleInput />
      </form>
    </div>
  );
}
function BillResult() {
  return (
    <div className="bill__result">
      <TipAmount />
      <TotalAmount />
      <AccessBtn />
    </div>
  );
}
export default Container;
