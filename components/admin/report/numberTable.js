import React, { useState } from "react";
import MyModal from "../../../components/myModal";
import ContentModalShowNumberDetail from "./contentModalShowNumberDetail";
import NumberDetailTable from "../numberDetailTable";

export default function NumberTable({ type, data, lottoCurrent }) {
  const [showSort, setShowSort] = useState(false);
  const [tableData, setTableData] = useState(
    data.filter((e) => e._id.type === type)
  );
  const [showModal, setShowModal] = useState(false);
  const [selectBet, setSelectBet] = useState(null);

  // const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef, setShowSort);

  const onClickNumberHandler = (bet) => {
    setShowModal(true);
    setSelectBet(bet);
  };

  const sortByKey = (key) => {
    switch (key) {
      case "NUMBERGRATE":
        setTableData((prev) => {
          const arr = [...prev].sort(
            (a, b) => b._id.numberString - a._id.numberString
          );
          return arr;
        });
        break;
      case "NUMBERLESS":
        setTableData((prev) => {
          const arr = [...prev].sort(
            (a, b) => a._id.numberString - b._id.numberString
          );
          return arr;
        });
        break;
      case "PRICEGRATE":
        setTableData((prev) => {
          const arr = [...prev].sort((a, b) => b.totalPrice - a.totalPrice);
          return arr;
        });
        break;
      case "PRICELESS":
        setTableData((prev) => {
          const arr = [...prev].sort((a, b) => a.totalPrice - b.totalPrice);
          return arr;
        });
        break;
      default:
        break;
    }
    setShowSort(false);
  };

  // console.log(tableData);
  return (
    <div className="w-full">

      <NumberDetailTable 
        sortByKey={sortByKey}
        onClickNumberHandler={onClickNumberHandler}
        tableData={tableData}
        setTableData={setTableData}
        type={type}
        setShowSort={setShowSort}
        showSort={showSort}
      />
      {/* <table className="globals-table">

        <caption>
          <div>
            <span>{translateType(type)}</span>
            <FaSort
              className="inline cursor-pointer"
              onClick={() => setShowSort(!showSort)}
            />
          </div>


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
                <span>ราคา</span>{" "}
                <FaAngleDown className="inline text-red-900" />
              </li>
            </ul>
          )}


          <div>จำนวนเลข {tableData.length}</div>
        </caption>

        <thead>
          <tr>
            <th>เลข</th>
            <th>ราคา</th>
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
              <td className="text-center">{bet._id.numberString}</td>

              <td className="text-center">{bet.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <MyModal isOpen={showModal} setShowModal={setShowModal}>
        <ContentModalShowNumberDetail
          bet={selectBet}
          lottoCurrent={lottoCurrent}
        />
      </MyModal>
    </div>
  );
}
