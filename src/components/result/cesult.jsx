import React from "react";
import { useContext } from "react";
import { dataContext } from "../Context";
import { Button } from "./Button";
import { OutputField } from "./OutputField";

function BillResult() {
  const { resultCal, canProcess, onClickReset, handleSubmit } =
    useContext(dataContext);
  const label = [
    ["Tip Amount", "/ person"],
    ["Total", "/ person"],
  ];

  const imformOutput = {
    type: "text",
    value: canProcess.isCalculator ? "--:--" : resultCal.totalAmount,
  };

  //define inform button list
  const btnList = [
    {
      attribute: {
        type: "button",
        id: "btn-reset",
        onClick: onClickReset,
        disabled: canProcess.isCalculator,
      },
      context: "RESET",
    },
    {
      attribute: {
        type: "button",
        id: "btn-SUBMIT",
        onClick: handleSubmit,
        disabled: canProcess.isCalculator,
      },
      context: "SUBMIT",
    },
  ];

  return (
    <div className="bill__result">
      <OutputField
        label={label[0]}
        outputField={{
          ...imformOutput,
          id: "tipPerPerson",
          name: "tipPerPerson",
        }}
      />
      <OutputField
        label={label[1]}
        outputField={{
          ...imformOutput,
          id: "tipPerPerson",
          name: "tipPerPerson",
        }}
      />
      <section>
        <Button btnList={btnList} />
      </section>
    </div>
  );
}

export { BillResult };
