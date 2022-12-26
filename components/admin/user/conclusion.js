import React from "react";
import { useQuery } from "react-query";
import { getConclusion } from "../../../lib/clientRequest/user";
import { translateType } from "../../../lib/helper";

export default function Conclusion({ lottoCurrent, userCurrent }) {
  const { isLoading, isError, data, error } = useQuery(
    ["getConclusion", lottoCurrent._id, userCurrent._id],
    getConclusion
  );
  if (isLoading) return <div>Win is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  if (!data) return <></>;
  // console.log(data);
  return (
    <div className="text-center">
      {/* <p>สรุปยอด</p> */}
      {/* <p>ยอดซื้อรวม : {data.totalPrice}</p> */}
      {data.discount !== 0 && <div>
      <p>
        ส่วนลด {data.discount}% : {data.discountPrice}
      </p>
      <p>ยอดเมื่อลดแล้ว : {data.totalPrice - data.discountPrice}</p>
      </div>}
      
      {data.numberWin.length !== 0 && 
        <table className="globals-table max-w-lg ">
          <caption className="text-green-500" style={{captionSide: 'bottom'}}>ยอดถูกรางวัล : {data.totalWinPrice}</caption>
          <thead>
            <tr><th colSpan='5' className="text-white">รายการถูกรางวัล</th></tr>
            <tr>
              <th>เลข</th>
              <th>ประเภท</th>
              <th>ราคา</th>
              <th>ราคาจ่าย</th>
              <th>ผู้บันทึก</th>
            </tr>
          </thead>
          <tbody>
            {data.numberWin.map((e) => (
              <tr key={e._id}>
                <td>{e.numberString}</td>
                <td>{translateType(e.type)}</td>
                <td>{e.price}</td>
                <td>{e.winPrice}</td>
                <td>{e.recorder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      
      <p className={`text-3xl ${data.conclusion < 0 ? 'text-green-500' : 'text-red-600'} underline`}>
        สรุปยอด {data.conclusion < 0 ? "ลูกค้ารับ" : "ลูกค้าจ่าย"}{" "}
        {Math.abs(data.conclusion)}
      </p>
    </div>
  );
}
