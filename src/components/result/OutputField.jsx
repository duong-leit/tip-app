import React from "react";

function OutputField({ label, outputField }) {
  return (
    <section>
      <label htmlFor={label.labelFor}>
        {label.subName.map((element) => (
          <span key={element}>{element}</span>
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
