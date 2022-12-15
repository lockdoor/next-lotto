import React from "react";
import { translateType } from "../../../lib/helper";
import { useQuery } from "react-query";
import { getWinnerByLottoDateIdAndTypeAndNumberString } from "../../../lib/clientRequest/win";
import { getLottoCurrent } from "../../../lib/helper";
import Link from "next/link";

const sortSet3Up = (numberString) => {
  const arr = numberString.split("");
  return arr.sort((a, b) => a - b).join("");
};

const typeTofindWinNumber = (type, data) => {
  switch (type) {
    case "up3":
    case "uprun":
      return data.first.slice(3);
    case "set3up":
      return sortSet3Up(data.first.slice(3));
    case "down3":
      return [data.first3_1, data.first3_2, data.last3_1, data.last3_2].join(
        ""
      );
    case "up2":
      return data.first.slice(4);
    case "down2":
    case "downrun":
      return data.last2;
    default:
      break;
  }
};

export default function WinnerTable({ type, win }) {
  const numberString = typeTofindWinNumber(type, win);
  const lottoCurrent = getLottoCurrent();

  // console.log(type, numberString)

  const { isLoading, isError, data, error } = useQuery(
    [
      `getWinnerByLottoDateIdAndTypeAndNumberString${type}`,
      lottoCurrent._id,
      type,
      numberString,
    ],
    getWinnerByLottoDateIdAndTypeAndNumberString
  );

  if (isLoading) return <div>WinnerTable is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  // console.log(data);
  return (
    <div className="w-60 mx-auto p-5">
      <div className="text-center">{translateType(type)}</div>
      {
      data?.length
        ? data.map((e, i) => (
        <div key={i} className="text-red-400 flex ">
          <span className="flex-1 text-center">{e.numberString}</span>
          <span className="flex-1 text-center">
            <Link
              href={`../admin/user/betDetail/${e.date}/${e.user._id}/${e.user.nickname}`}
            >
              {e.user.nickname}
            </Link>
          </span>
          <span className="flex-1 text-center">{e.price}</span>
        </div>
      )) : <div>ไม่มีผู้ถูกรางวัล</div>
    }
    </div>
  );
}
