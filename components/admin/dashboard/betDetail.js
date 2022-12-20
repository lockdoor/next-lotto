import React from "react";
import { useQuery } from "react-query";
import { getBetDetail } from "../../../lib/clientRequest/dashboard";
import { translateType, numberWithCommas, ratio } from "../../../lib/helper";
import NullData from "./nullData";
export default function BetDetail({ lottoCurrent }) {
  const { isLoading, isError, error, data } = useQuery(
    ["getBetDetail", lottoCurrent?._id],
    getBetDetail
  );
  if (isLoading) return <div>BetDetail is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  if (!data?.bet.length) return <NullData title={'รวมตามประเภท'} />
  // console.log(data)
  return (
    <div className="border-4 border-green-300 rounded-md p-5 my-5 bg-white text-center">
      <div className="text-dashboard-header1">รวมตามประเภท</div>
      <div className="lg:flex gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 justify-center">
        {data.bet.map((bet) => {
          return (
            <div
              key={bet._id}
              className="w-full border-2 border-pink-300 rounded-md text-center my-3 p-5"
            >
              <div className="text-dashboard-header2">{ translateType(bet._id) }</div>
              <div>รวม <span className="text-blue-600">{ numberWithCommas(bet.totalPrice) }</span></div>
              <div>{bet.amount} / {ratio(bet._id)}</div>
              <div>มากสุด <span className="text-blue-600">{ numberWithCommas(bet.max) }</span></div>
              <div>น้อยสุด <span className="text-blue-600">{ numberWithCommas(bet.min) }</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
