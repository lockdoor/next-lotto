import React from "react";

export default function RadioNumberLength({ onChangeRadioBtn }) {
  return (
    <>
      <div>
        <input
          type={"radio"}
          name="numberLength"
          id="value2"
          value={2}
          defaultChecked
          onChange={onChangeRadioBtn}
        />
        <label htmlFor="value2"> 2 ตัว</label>
      </div>
      <div>
        <input
          type={"radio"}
          name="numberLength"
          id="value3"
          value={3}
          onChange={onChangeRadioBtn}
        />
        <label htmlFor="value3"> 3 ตัว</label>
      </div>
      <div>
        <input
          type={"radio"}
          name="numberLength"
          id="value1"
          value={1}
          onChange={onChangeRadioBtn}
        />
        <label htmlFor="value1"> วิ่ง</label>
      </div>
    </>
  );
}
