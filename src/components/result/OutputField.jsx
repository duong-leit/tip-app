import React from "react";

function OutputField({ label, outputField }) {
  return (
    <section>
      <label>
        {label.map((element, index) => (
          <span key={index}>{element}</span>
        ))}
      </label>
      <input
        type={outputField.type}
        id={outputField.id}
        name={outputField.name}
        value={outputField.value}
        readOnly
      />
    </section>
  );
}

export { OutputField };
