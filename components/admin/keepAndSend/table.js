import React, { useState } from "react";
import { translateType, ratio } from "../../../lib/helper";
import { getKeepAndSendDataByTypeAndLottoDateId } from "../../../lib/clientRequest/keepAndSend";
import { useQuery } from "react-query";
import { FaSort } from "react-icons/fa";
import KeepAll from "./keepAll";
import Keep from "./keep";
// import MyModal from "../../myModal";

export default function Table({ type, lottoCurrent }) {

  // sort case = totalAsc, totalDesc, numberAsc, numberDesc
  const [sort, setSort] = useState("totalAsc");
  // const [showSendModal, setShowSendModal] = useState(false)

  const { isLoading, isError, data, error } = useQuery(
    ["getKeepAndSendDataByTypeAndLottoDateId", type, lottoCurrent._id],
    getKeepAndSendDataByTypeAndLottoDateId
  );

  if (isLoading) return <div>Bets is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  const sortTotalPrice = () => {
    setSort((prev) => (prev === "totalAsc" ? "totalDesc" : "totalAsc"));
  };
  const sortNumber = () => {
    setSort((prev) => {
      if (prev === "numberAsc") {
        return "numberDesc";
      } else {
        return "numberAsc";
      }
    });
  };
  const sortKeep = () => {
    setSort((prev) => {
      if (prev === "keepAsc") {
        return "keepDesc";
      } else {
        return "keepAsc";
      }
    });
  };
  const sortSend = () => {
    setSort((prev) => {
      if (prev === "sendAsc") {
        return "sendDesc";
      } else {
        return "sendAsc";
      }
    });
  };

  if (data.length === 0) {
    return <div className="text-center">ยังไม่มีรายการ</div>;
  }
  return (
    <>
      <table className="mx-auto w-full max-w-lg border-2 border-pink-300">
        <caption className="text-2xl">
          <div>{translateType(type)}</div>
          {/* onClick open modal to add number save to keepAll model */}
          <KeepAll data={data} lottoCurrent={lottoCurrent}/>
        </caption>
        <thead className="border-2 border-pink-300 bg-lime-300">
          <tr>
            <th
              onClick={sortNumber}
              className="cursor-pointer border-x-2 border-pink-300"
            >
              <span>เลข </span>
              <FaSort className=" inline" />
            </th>
            <th
              onClick={sortTotalPrice}
              className="cursor-pointer border-x-2 border-pink-300"
            >
              <span>ยอดรวม</span>
              <FaSort className=" inline" />
            </th>
            <th
              onClick={sortKeep}
              className="cursor-pointer border-x-2 border-pink-300"
            >
              <span>ตัดรายตัว</span>
              <FaSort className=" inline" />
            </th>
            {/* onClick open new page with only its */}
            <th onClick={sortSend} className="cursor-pointer border-x-2 border-pink-300">
              <span>ตัดส่ง</span>
              <FaSort className=" inline" />
            </th>
          </tr>
          <tr>
            <th className="border-x-2 border-pink-300">{data.length} / {ratio(type)}</th>
            <th className="border-x-2 border-pink-300">
              {data.reduce((a, b) => a + b.totalPrice, 0)}
            </th>
            <th className="border-x-2 border-pink-300">
              {data.reduce((a, b) => a + (b.keep?.price || 0), 0)}
            </th>
            <th className="border-x-2 border-pink-300">
              {data.reduce((a, b) => a + b.send, 0)}
            </th>
          </tr>
        </thead>
        <DataSort data={data} sort={sort} lottoCurrent={lottoCurrent}/>
      </table>
      {/* <MyModal isOpen={showSendModal} onClose={setShowSendModal}><div></div></MyModal> */}
    </>
  );
}

const DataSort = ({ data, sort, lottoCurrent }) => {
  // console.log(sort);
  const sortData = (data, sort) => {
    // sort case = totalAsc, totalDesc, numberAsc, numberDesc
    switch (sort) {
      case "numberAsc":
        return data.sort((a, b) => a.numberString - b.numberString);
      case "numberDesc":
        return data.sort((a, b) => b.numberString - a.numberString);
      case "totalAsc":
        return data.sort((a, b) => a.totalPrice - b.totalPrice);
      case "totalDesc":
        return data.sort((a, b) => b.totalPrice - a.totalPrice);
      case "keepAsc":
        return data.sort((a, b) => a.keep.price - b.keep.price);
      case "keepDesc":
        return data.sort((a, b) => b.keep.price - a.keep.price);
      case "sendAsc":
        return data.sort((a, b) => a.send - b.send);
      case "sendDesc":
        return data.sort((a, b) => b.send - a.send);
      default:
        return data.sort((a, b) => a.numberString - b.numberString);
    }
  };

  return (
    <tbody>
      {sortData(data, sort).map((e, index) => (
        <tr
          className={`${index % 2 == 0 ? "bg-lime-100" : "bg-lime-50"}`}
          key={e.numberString}
        >
          <td className="text-center border-x-2 border-pink-300">
            {e.numberString}
          </td>
          <td className="text-center border-x-2 border-pink-300">
            {e.totalPrice}
          </td>
          <td>
            <Keep number={e} lottoCurrent={lottoCurrent}/>
          </td>
          <td className="text-center border-x-2 border-pink-300">{e.send}</td>
        </tr>
      ))}
    </tbody>
  );
};
