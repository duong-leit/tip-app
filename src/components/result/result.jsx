import React from "react";
import { useContext } from "react";
import { dataContext, processContext } from "../Context";
import { Button } from "./Button";
import { OutputField } from "./OutputField";

const url = `https://plitter-server.vercel.app/api/`;

function TipAmount() {
  const { isCalculator, resultCal } = useContext(processContext);
  let label = {
    id: "tipPersonLabel",
    labelFor: "tipPerPerson",
    subName: ["Tip Amount", "/ person"],
  };
  let outputField = {
    id: "tipPerPerson",
    type: "text",
    name: "tipPerPerson",
    value: isCalculator ? "--:--" : resultCal.tipAmount,
  };
  return <OutputField label={label} outputField={outputField} />;
}

function TotalAmount() {
  const { resultCal, isCalculator } = useContext(processContext);
  let label = {
    id: "tipPersonLabel",
    labelFor: "totalPerPerson",
    subName: ["Total", "/ person"],
  };
  let outputField = {
    id: "totalPerPerson",
    type: "text",
    name: "totalPerPerson",
    value: isCalculator ? "--:--" : resultCal.totalAmount,
  };
  return <OutputField label={label} outputField={outputField} />;
}
function AccessBtn() {
  const { data, setData, setErr } = useContext(dataContext);
  const { setResult, setCalculator, isCalculator } = useContext(processContext);

  const onClickReset = (e) => {
    setData({ bill: 0, people: 0, tip: 0, isCustomTip: false });
    setErr({ isErr: false, message: "" });
    setResult({ tipAmount: "0.00", totalAmount: "0.00" });
  };

  const handleSubmit = async (e) => {
    try {
      if (!data.isChange) return;
      setCalculator(true);
      if (Number(data.bill) === 0) {
        setResult({
          tipAmount: "0.00",
          totalAmount: "0.00",
        });
      } else {
        if (Number(data.people) === 0) {
          setErr({
            isErr: true,
            message: "can't be zero",
          });
          setCalculator(false);
          return;
        }
        setErr({
          isErr: true,
          message: "",
        });
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
      setCalculator(false);
    } catch (error) {
      alert("try it later");
    }
  };

  return (
    <section>
      <Button
        type="button"
        id="btn-reset"
        name="RESET"
        onClick={onClickReset}
        isdisabled={isCalculator}
      />
      <Button
        type="button"
        id="btn-submit"
        name="SUBMIT"
        onClick={handleSubmit}
        isdisabled={isCalculator}
      />
    </section>
  );
}

export { TipAmount, TotalAmount, AccessBtn };
