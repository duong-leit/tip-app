import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context";
import InputField from "./InputField";
import Button from "./TipButton";
import dollar from "../../assets/img/icon-dollar.svg";
import person from "../../assets/img/icon-person.svg";
function BillInput(props) {
  const { data, handleInput } = props;
  const labelInput = {
    htmlFor: "billTotal",
    name: "Bill",
    id: "billLabel",
  };
  const option = (
    <span>
      <img src={dollar} alt="cannot find" />
    </span>
  );
  const section = {
    className: "bill-total--details",
    span: option,
    input: {
      className: "billTotal",
      id: "billTotal",
      value: data.bill || "",
      name: "bill",
      placeholder: "0.00",
      onChange: handleInput,
    },
  };

  return (
    <InputField
      className="bill-total"
      labelOption=""
      labelInput={labelInput}
      section={section}
    />
  );
}

function TipOption(props) {
  const { handleInput, optionList } = props;
  const { data, setData } = useContext(dataContext);

  const onFocusTipCustom = (e) => {
    setData({ ...data, tip: 0, isCustomTip: true, isChange: true });
  };

  const handleTipBtn = (value) => {
    if (Number(data.tip) !== parseInt(value)) {
      setData({
        ...data,
        tip: parseInt(value),
        isCustomTip: false,
        isChange: true,
      });
    } else {
      if (data.isCustomTip) setData({ ...data, isCustomTip: false });
      setData({ ...data, tip: 0, isCustomTip: false });
    }
  };

  let tipListBtn = [];
  let optionLength = optionList.length;
  for (let i = 0; i < optionLength; i++) {
    tipListBtn.push(
      <Button
        key={i}
        data={data}
        classTip="percent-tip__option"
        valueTip={optionList[i]}
        handleTipBtn={handleTipBtn}
      />
    );
  }
  return (
    <div className="bill-tip">
      <label htmlFor="tipCustom">Select Tip %</label>
      <section className="percent-tip">
        {tipListBtn}
        <div className="percent-tip__option">
          <input
            className="tip-option opt-custom"
            id="tipCustom"
            name="tip"
            type="text"
            placeholder="Custom"
            onChange={handleInput}
            value={data.isCustomTip ? data.tip : ""}
            onFocus={onFocusTipCustom}
          />
        </div>
      </section>
    </div>
  );
}

function PeopleInput(props) {
  const { data, handleInput } = props;
  const { err } = useContext(dataContext);

  //declare information of peopleInput
  const labelInput = {
    htmlFor: "numberDivision",
    name: "Number of People",
    id: "peopleLabel",
  };
  const option = (
    <span>
      <img src={person} alt="cannot find" />
    </span>
  );
  const labelOption = <span className="error-number">{err.message}</span>;
  const section = {
    className: "bill-total--details",
    span: option,
    input: {
      className: "numberDivision",
      id: "numberDivision",
      value: data.people || "",
      name: "people",
      placeholder: "0",
      onChange: handleInput,
    },
  };

  return (
    <InputField
      className="number-people"
      labelOption={labelOption}
      labelInput={labelInput}
      section={section}
    />
  );
}

export { BillInput, TipOption, PeopleInput };
