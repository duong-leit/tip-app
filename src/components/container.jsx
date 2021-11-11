import React, { useContext } from "react";
import { BillInput, TipOption, PeopleInput } from "./compute/Compute";
import { TipAmount, TotalAmount, AccessBtn } from "./result/Result";
import { dataContext, IsProcessProvider } from "./Context";

const tipList = [5, 10, 15, 25, 50];

function Container() {
  return (
    <section className="bill">
      <BillCompute className="bill__compute" />
      <BillResult className="bill__result" />
    </section>
  );
}

function BillCompute(props) {
  const { messageValidata, handleTipBtn, onFocusTipCustom } = props;

  const { data, setData } = useContext(dataContext);

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let rgx = inputName !== "people" ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;
    if (rgx.test(inputValue) || inputValue === "") {
      if (Number(inputValue) <= 10 ** 16) {
        setData({
          ...data,
          [inputName]: inputValue || 0,
          isChange: true,
        });
      }
    }
  };

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
function BillResult() {
  return (
    <IsProcessProvider>
      <div className="bill__result">
        <TipAmount />
        <TotalAmount />
        <AccessBtn />
      </div>
    </IsProcessProvider>
  );
}
export default Container;
