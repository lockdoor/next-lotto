import React from "react";

export default function RadioForbiddenType({ onChangeRadioBtn, numberLength }) {
  return (
    <>
      <div>
        <input
          type={"radio"}
          name="forbiddenType"
          id="TypeA"
          value={"A"}
          defaultChecked
          onChange={onChangeRadioBtn}
        />
        <label htmlFor="TypeA"> จ่ายครึ่ง</label>
      </div>
      <div>
        <input
          type={"radio"}
          name="forbiddenType"
          id="TypeB"
          value={"B"}
          onChange={onChangeRadioBtn}
        />
        <label htmlFor="TypeB"> ไม่รับ</label>
      </div>
      {numberLength === '3' && <div>
        <input
          type={"radio"}
          name="forbiddenType"
          id="TypeC"
          value={"C"}
          onChange={onChangeRadioBtn}
        />
        <label htmlFor="TypeC"> ตรงไม่รับโต๊ดจ่ายครึ่ง</label>
      </div>}
    </>
  );
}
