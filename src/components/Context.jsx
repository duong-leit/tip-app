import { createContext } from "react";
import { useState } from "react";
import React from "react";

export const dataContext = createContext();
export const processContext = createContext();

function HandleDataProvider({ children }) {
  const [data, setData] = useState({
    bill: 0,
    people: 0,
    tip: 0,
    isCustomTip: false,
    isChange: false,
  });

  // isCalculator, setCalculator,
  const [err, setErr] = useState({
    isErr: false,
    message: "",
  });

  const value = {
    data,
    setData,
    err,
    setErr,
  };
  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

function IsProcessProvider({ children }) {
  const [isCalculator, setCalculator] = useState(false);
  const [resultCal, setResult] = useState({
    tipAmount: "0.00",
    totalAmount: "0.00",
  });
  const value = {
    isCalculator,
    setCalculator,
    resultCal,
    setResult,
  };
  return (
    <processContext.Provider value={value}>{children}</processContext.Provider>
  );
}

export { HandleDataProvider, IsProcessProvider };
