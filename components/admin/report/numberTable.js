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
      
      <MyModal isOpen={showModal} setShowModal={setShowModal}>
        <ContentModalShowNumberDetail
          bet={selectBet}
          lottoCurrent={lottoCurrent}
        />
      </MyModal>
    </div>
  );
}
