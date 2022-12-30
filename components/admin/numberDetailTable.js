import React from "react";
import { FaSort } from "react-icons/fa";
import { translateType } from "../../lib/helper";

export default function NumberDetailTable({
  type,
  tableData,
  onClickNumberHandler,
  sortNumberString,
  sortPrice
}) {
 

  return (
  <>
  {tableData.length > 0 && <table className="globals-table">
    <caption>
      <div>
        <span>{translateType(type)}</span>
      </div>

      <div>จำนวนเลข {tableData?.length}</div>
    </caption>

    <thead>
      <tr>
        <th>
          <p onClick={sortNumberString} className="cursor-pointer">
            <span>เลข</span>
            <FaSort className="inline" />
          </p>
        </th>
        <th>
         <p onClick={sortPrice} className="cursor-pointer">
            <span>ราคา</span>
            <FaSort className="inline" />
          </p> 
        </th>
      </tr>
    </thead>
    <tbody>
      {tableData.map((bet, index) => (
        <tr
          key={index}
          onClick={() => onClickNumberHandler(bet)}
          className={`${
            index % 2 == 0 ? "bg-blue-50" : "bg-blue-100"
          } cursor-pointer`}
        >
          <td className="text-center">
            {bet._id.numberString || bet.numberString}
          </td>

          <td className="text-center">{bet.totalPrice || bet.price}</td>
        </tr>
      ))}
    </tbody>
  </table>}
  </>
    
    
  );
}
