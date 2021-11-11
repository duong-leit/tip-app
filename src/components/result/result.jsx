function TipAmount({ tipAmount, isCalculator }) {
  return (
    <section>
      <label htmlFor="tipPerPerson">
        <span>Tip Amount</span>
        <span>/ person</span>
      </label>
      <input
        type="text"
        id="tipPerPerson"
        value={isCalculator ? "--:--" : tipAmount}
        readOnly
      />
    </section>
  );
}

function TotalAmount({ totalAmount, isCalculator }) {
  return (
    <section>
      <label htmlFor="totalPerPerson">
        <span>Total</span>
        <span>/ person</span>
      </label>
      <input
        type=" text"
        id="totalPerPerson"
        value={isCalculator ? "--:--" : totalAmount}
        step="any"
        readOnly
      />
    </section>
  );
}
function AccessBtn({ handleSubmit, onClickReset, isCalculator }) {
  return (
    <section>
      <button
        type="button"
        id="btn-reset"
        onClick={onClickReset}
        disabled={isCalculator}
      >
        RESET
      </button>
      <button
        type="button"
        id="btn-submit"
        onClick={handleSubmit}
        disabled={isCalculator}
      >
        SUBMIT
      </button>
    </section>
  );
}
export { TipAmount, TotalAmount, AccessBtn };
