function TipAmount({ tipAmount }) {
  return (
    <section>
      <label htmlFor="tipPerPerson">
        <span>Tip Amount</span>
        <span>/ person</span>
      </label>
      <input type="text" id="tipPerPerson" value={tipAmount} readOnly />
    </section>
  );
}

function TotalAmount({ totalAmount }) {
  return (
    <section>
      <label htmlFor="totalPerPerson">
        <span>Total</span>
        <span>/ person</span>
      </label>
      <input
        type=" text"
        id="totalPerPerson"
        value={totalAmount}
        step="any"
        readOnly
      />
    </section>
  );
}
function AccessBtn({ handleSubmit, onClickReset }) {
  return (
    <section>
      <button type="button" id="btn-reset" onClick={onClickReset}>
        RESET
      </button>
      <button type="button" id="btn-submit" onClick={handleSubmit}>
        SUBMIT
      </button>
    </section>
  );
}
export { TipAmount, TotalAmount, AccessBtn };
