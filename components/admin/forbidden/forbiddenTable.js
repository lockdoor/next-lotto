import React from "react";
import {
  translateForbiddenType,
  textColorByForbiddenType,
} from "../../../lib/helper";

export default function ForbiddenTable({data}) {

  return (
    <div className=" md:flex">
      <Card data={data.filter((e) => e.type == "A")} type="A" />
      <Card data={data.filter((e) => e.type == "B")} type="B" />
      <Card data={data.filter((e) => e.type == "C")} type="C" />
    </div>
  );
}

const Card = ({ data, type }) => {
  return (
    <div
      className={`text-${textColorByForbiddenType(
        type
      )} border border-pink-300 my-3 mx-5 rounded-md py-3 px-5 text-center flex-1
      `}
    >
      <div>{translateForbiddenType(type)}</div>
      <div className={`flex justify-center gap-3 flex-wrap `}>
        {data.map((e) => (
          <span key={e._id}>
            {e.numberString}
            {/* <span>{e.numberString}</span>
            {i !== data.length - 1 && <span> , </span>} */}
          </span>
        ))}
      </div>
    </div>
  );
};
