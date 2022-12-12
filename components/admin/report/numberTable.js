import React, { useState, useRef } from "react";
import { FaSort, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { translateType, useOutsideAlerter } from "../../../lib/helper";
import MyModal from "../../../components/myModal";
import ContentModalShowNumberDetail from "./contentModalShowNumberDetail";

export default function NumberTable({ type, data }) {
  const [showSort, setShowSort] = useState(false);
  const [tableData, setTableData] = useState(data.filter(e => e._id.type === type));
  const [showModal, setShowModal] = useState(false);
  const [selectBet, setSelectBet] = useState(null);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowSort);

  const onClickNumberHandler = (bet) => {
    setShowModal(true);
    setSelectBet(bet);  
  };

  const sortByKey = (key) => {
    switch (key) {
      case "NUMBERGRATE":
        setTableData( prev => {
          const arr = [...prev].sort((a, b) => b._id.numberString - a._id.numberString)
          return arr
        })
        break;
      case "NUMBERLESS":
        setTableData( prev => {
          const arr = [...prev].sort((a, b) => a._id.numberString - b._id.numberString)
          return arr
        })
        break;
      case "PRICEGRATE":
        setTableData( prev => {
          const arr = [...prev].sort((a, b) => b.totalPrice - a.totalPrice)
          return arr
        })
        break;
      case "PRICELESS":
        setTableData( prev => {
          const arr = [...prev].sort((a, b) => a.totalPrice - b.totalPrice)
          return arr
        })
        break;
      default:
        break;
    }
    setShowSort(false);
  };

  // console.log(tableData);
  return (
    <div className="border border-pink-300 py-2 px-1 mt-3 rounded-md flex-1 text-center w-2/3 mx-auto">
      
      {/* header */}
      <div>
        <span>{translateType(type)}</span>
        <FaSort
          className="inline cursor-pointer"
          onClick={() => setShowSort(!showSort)}
        />
      </div>

      {/* show sorting */}
      {showSort && (
        <ul
          className=" relative border border-pink-300 rounded-md bg-white p-3"
          ref={wrapperRef}
        >
          <li
            className="flex flex-row justify-between items-center text-xl border-b-2 border-green-200 cursor-pointer"
            onMouseDown={() => sortByKey("NUMBERGRATE")}
          >
            <span>เลข</span> <FaAngleUp className="inline text-blue-500" />
          </li>
          <li
            className="flex flex-row justify-between items-center text-xl border-b-2 border-green-200  cursor-pointer"
            onMouseDown={() => sortByKey("NUMBERLESS")}
          >
            <span>เลข</span> <FaAngleDown className="inline text-red-900" />
          </li>
          <li
            className="flex flex-row justify-between items-center text-xl border-b-2 border-green-200  cursor-pointer"
            onMouseDown={() => sortByKey("PRICEGRATE")}
          >
            <span>ราคา</span> <FaAngleUp className="inline text-blue-500" />
          </li>
          <li
            className="flex flex-row justify-between items-center text-xl border-b-2 border-green-200  cursor-pointer"
            onMouseDown={() => sortByKey("PRICELESS")}
          >
            <span>ราคา</span> <FaAngleDown className="inline text-red-900" />
          </li>
        </ul>
      )}

      {/* show summery for report page */}
      <div>จำนวนเลขทั้งหมด {tableData.length}</div>
      
      {/* table */}
      {tableData.map((bet, i) => (
        <div
          key={i}
          onClick={() => onClickNumberHandler(bet)}
          className=" cursor-pointer flex flex-row justify-around px-10 md:px-1"
        >
          <div className="flex-1 text-start">{bet._id.numberString}</div>
          <div className="flex-1">=</div>
          <div className="flex-1 text-end">{bet.totalPrice}</div>
        </div>
      ))}
           
      <MyModal isOpen={showModal} setShowModal={setShowModal}>
        <ContentModalShowNumberDetail bet={selectBet} />
      </MyModal>
     
    </div>
  );
}
