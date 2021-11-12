import React from "react";

function Button({ btnList }) {
  return (
    <>
      {btnList.map((element, index) => (
        <button key={index} {...element.attribute}>
          {element.context}
        </button>
      ))}
    </>
  );
}

export { Button };
