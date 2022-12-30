import React, { useState } from "react";
import MyModal from "../../../components/myModal";
import ContentModalShowNumberDetail from "./contentModalShowNumberDetail";
import NumberDetailTable from "../numberDetailTable";

export default function NumberTable({ type, data, lottoCurrent }) {
  const [tableData, setTableData] = useState(
    data.filter((e) => e._id.type === type)
  );
  const [showModal, setShowModal] = useState(false);
  const [selectBet, setSelectBet] = useState(null);
  const [sortNumberFlag, setSortNumberFlag] = useState(false)
  const [sortPriceFlag, setSortPriceFlag] = useState(false)

  const onClickNumberHandler = (bet) => {
    setShowModal(true);
    setSelectBet(bet);
  };

  const sortNumberString = () => {
    setTableData(prev => {
      let sortArr
      if(sortNumberFlag){
        sortArr =  [...prev].sort((a,b) => a._id.numberString - b._id.numberString)
      } else {
        sortArr =  [...prev].sort((a,b) => b._id.numberString - a._id.numberString)
      }
      setSortNumberFlag(!sortNumberFlag)
      return sortArr
    })
  }

  const sortPrice = () => {
    setTableData(prev => {
      let sortArr
      if(sortPriceFlag){
        sortArr =  [...prev].sort((a,b) => a.totalPrice - b.totalPrice)
      } else {
        sortArr =  [...prev].sort((a,b) => b.totalPrice - a.totalPrice)
      }
      setSortPriceFlag(!sortPriceFlag)
      return sortArr
    })
  }

  return (
    <div className="w-full">

      <NumberDetailTable 
        sortNumberString={sortNumberString}
        sortPrice={sortPrice}
        onClickNumberHandler={onClickNumberHandler}
        tableData={tableData}
        type={type}
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
