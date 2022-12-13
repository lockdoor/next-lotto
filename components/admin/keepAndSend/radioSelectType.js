import React from "react";
import { translateType } from "../../../lib/helper";
const type = ["up3", "set3up", "down3", "up2", "down2", "uprun", "downrun"];

export default function RadioSelectType({ setSelectType }) {
  return (
    <>
      {/* <div>radioSelectType</div> */}
      <div className="flex flex-row justify-center flex-wrap my-3">
        {type.map((e) => (
          <Radio key={e} type={e} setSelectType={setSelectType} />
        ))}
      </div>
    </>
  );
}

const Radio = ({ type, setSelectType }) => {
  return (
    <>
      <label htmlFor={type} className="inline-block mx-3">
        <input
          type={"radio"}
          id={type}
          name="type"
          value={type}
          onChange={(e) => setSelectType(e.target.value)}
        />{" "}
        {translateType(type)}
      </label>
    </>
  );
};
