import React from "react";
import { translateType } from "../../../lib/helper";
import { useQuery } from "react-query";
import { getWinner } from "../../../lib/clientRequest/win";
import Link from "next/link";

export default function WinnerTable({ lottoCurrent }) {
  const { isLoading, isError, data, error } = useQuery(
    [`getWinner`, lottoCurrent?._id],
    getWinner
  );

  if (isLoading) return <div>WinnerTable is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  console.log(data);
  return (
    <div className="px-5">
      {data.win.map(({ _id, bet }) => {
        return (
          <table key={_id} className="globals-table">
            <caption className="text-center">{translateType(_id)}</caption>
            <thead>
              <tr>
                <th className="py-2 bg-blue-300">เลข</th>
                <th className="py-2 bg-blue-300">ลูกค้า</th>
                <th className="py-2 bg-blue-300">ราคา</th>
                <th className="py-2 bg-blue-300">ผู้บันทึก</th>
              </tr>
            </thead>
            <tbody>
              {bet.map((e, index) => {
                return (
                  <tr key={index} className={`${index % 2 == 0 ? "bg-blue-50" : "bg-blue-100"}`}>
                    <td className="py-2 w-14 text-center">{e.numberString}</td>
                    <td className="py-2 text-center ">{e.user.nickname}</td>
                    <td className="py-2 pr-3 w-20 text-center">{e.price}</td>
                    <td className="py-2 text-center">{e.recorder.nickname}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
