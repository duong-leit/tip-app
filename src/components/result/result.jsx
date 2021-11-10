function TipAmount() {
  return (
    <section>
      <label htmlFor="tipPerPerson">
        <span>Tip Amount</span>
        <span>/ person</span>
      </label>
      <input type="text" id="tipPerPerson" value="0.00" readOnly />
    </section>
  );
}

function TotalAmount() {
  return (
    <section>
      <label htmlFor="totalPerPerson">
        <span>Total</span>
        <span>/ person</span>
      </label>
      <input
        type=" text"
        id="totalPerPerson"
        value="0.00"
        step="any"
        readOnly
      />
    </section>
  );
}
function AccessBtn() {
  return (
    <section>
      <button type="button" id="btn-reset">
        RESET
      </button>
      <button type="button" id="btn-submit">
        SUBMIT
      </button>
    </section>
  );
}
export { TipAmount, TotalAmount, AccessBtn };
