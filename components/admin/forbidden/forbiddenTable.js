import React from "react";
import {
  translateForbiddenType,
  textColorByForbiddenType,
} from "../../../lib/helper";

export default function ForbiddenTable({forbidden}) {

  return (
    <div className=" md:flex">
      <Card forbidden={forbidden.filter((e) => e.type == "A")} type="A" />
      <Card forbidden={forbidden.filter((e) => e.type == "B")} type="B" />
      <Card forbidden={forbidden.filter((e) => e.type == "C")} type="C" />
    </div>
  );
}

const Card = ({ forbidden, type }) => {
  return (
    <div
      className={`text-${textColorByForbiddenType(
        type
      )} border border-pink-300 bg-white my-3 mx-5 rounded-md py-3 px-5 text-center flex-1
      `}
    >
      <div>{translateForbiddenType(type)}</div>
      <div className={`flex justify-center gap-3 flex-wrap `}>
        {forbidden.map((e) => (
          <span key={e._id}>
            {e.numberString}
            {/* <span>{e.numberString}</span>
            {i !== forbidden.length - 1 && <span> , </span>} */}
          </span>
        ))}
      </div>
    </div>
  );
};
