import React from "react";

function Button({ data, classTip, valueTip, handleTipBtn }) {
  return (
    <div className={classTip}>
      <button
        type="button"
        className={
          "tip-option " +
          (data.isCustomTip === false && data.tip === valueTip ? "active" : "")
        }
        id={"tip-option-" + valueTip}
        name="tip"
        onClick={() => {
          handleTipBtn(valueTip);
        }}
      >
        {valueTip}%
      </button>
    </div>
  );
}

export default Button;
