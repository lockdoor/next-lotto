import React from "react";

export default function InputNumber({numberString, setNumberString, numberLength, focusInput, checkNumberInput, upPrice, setUpPrice, downPrice, setDownPrice, subsetPrice, setSubsetPrice}) {
  return (
    <div className="flex flex-row justify-around gap-4">
      <div>
        <label htmlFor="numberString">เลข</label>
        <input
          name="numberString"
          className="input-bet-number text-center"
          type={"String"}
          pattern="[0-9]*"
          inputMode="numeric"
          id="numberString"
          required
          value={numberString}
          minLength={numberLength}
          maxLength={numberLength}
          ref={focusInput}
          autoFocus
          onChange={(e) => checkNumberInput(e, numberLength, setNumberString)}
        />
      </div>
      <div>
        <label>บน</label>
        <input
          type={"number"}
          className="input-bet-number text-right"
          id="upPrice"
          value={upPrice}
          pattern="[0-9]*"
          inputMode="numeric"
          min={1}
          onChange={(e) => setUpPrice(e.target.value)}
        />
      </div>
      <div>
        <label>ล่าง</label>
        <input
          type={"number"}
          className="input-bet-number text-right"
          id="downPrice"
          value={downPrice}
          pattern="[0-9]*"
          inputMode="numeric"
          min={1}
          onChange={(e) => setDownPrice(e.target.value)}
        />
      </div>
      {numberLength != 1 && (
        <div>
          <label>กลับ/โต๊ด </label>
          <input
            type={"number"}
            className="input-bet-number text-right"
            id="subsetPrice"
            value={subsetPrice}
            pattern="[0-9]*"
            inputMode="numeric"
            min={1}
            onChange={(e) => setSubsetPrice(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
