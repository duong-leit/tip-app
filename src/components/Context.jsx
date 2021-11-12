import { createContext } from "react";
import { useState } from "react";
import React from "react";

export const dataContext = createContext();

const url = `https://plitter-server.vercel.app/api/`;

function HandleDataProvider({ children }) {
  const [data, setData] = useState({
    bill: 0,
    people: 0,
    tip: 0,
    isCustomTip: false,
    isChange: false,
  });

  const [err, setErr] = useState({
    isErr: false,
    message: "",
  });

  const [canProcess, setProcess] = useState({
    isCalculator: false,
    isChange: false,
  });

  const [resultCal, setResult] = useState({
    tipAmount: "0.00",
    totalAmount: "0.00",
  });

  const onClickReset = () => {
    setData({ bill: 0, people: 0, tip: 0 });
    setErr({ isErr: false, message: "" });
    setResult({ tipAmount: "0.00", totalAmount: "0.00" });
    setProcess({ isCalculator: false, isChange: false });
  };

  const handleSubmit = async (e) => {
    try {
      if (canProcess.isChange && !canProcess.isCalculator) {
        //is Change Input
        setProcess({ ...canProcess, isChange: false });
        if (Number(data.people) === 0) {
          if (Number(data.bill) === 0) {
            alert("bill and people cannot be empty.");
            onClickReset();
          } else {
            setErr({
              isErr: true,
              message: "can't be zero",
            });
          }
          return;
        }
        setErr({
          isErr: true,
          message: "",
        });
        setProcess({ ...canProcess, isCalculator: true });

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
        } else {
          alert("something wrong.");
        }
        // }
        setProcess({ isChange: false, isCalculator: false });
      } else {
        alert("bill and people cannot be empty.");
        onClickReset();
      }
    } catch (error) {
      alert("try it later");
    }
  };

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let rgx = inputName !== "people" ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;
    if (rgx.test(inputValue) || inputValue === "") {
      if (Number(inputValue) <= 10 ** 16) {
        setData({
          ...data,
          [inputName]: inputValue || 0,
        });
        if (!(inputName === "tip" && data.bill === 0 && data.people === 0)) {
          setProcess({
            ...canProcess,
            isChange: true,
          });
        }
      }
    }
  };

  const value = {
    data,
    err,
    canProcess,
    resultCal,
    setData,
    setErr,
    setProcess,
    setResult,
    onClickReset,
    handleSubmit,
    handleInput,
  };
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export { HandleDataProvider };
