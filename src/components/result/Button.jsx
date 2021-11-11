import React from "react";

function Button({ typeBtn, id, name, onClick, isdisabled }) {
  return (
    <button type={typeBtn} id={id} onClick={onClick} disabled={isdisabled}>
      {name}
    </button>
  );
}

export { Button };
