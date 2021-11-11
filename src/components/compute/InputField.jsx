import React from "react";

function InputField({ className, labelOption, labelInput, section }) {
  return (
    <div className={className}>
      <label id={labelInput.id} htmlFor={labelInput.htmlFor}>
        {labelInput.name}
        {labelOption}
      </label>
      <section className={section.className}>
        {section.span}
        <input {...section.input} />
      </section>
    </div>
  );
}
export default InputField;
