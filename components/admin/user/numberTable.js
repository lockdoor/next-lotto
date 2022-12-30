import React, { useState, useEffect } from "react";
import MyModal from "../../../components/myModal";
import ContentModalEdit from "../bet/contentModalEdit";
import NumberDetailTable from "../numberDetailTable";

export default function NumberTable({ type, data }) {
  const [sortNumberFlag, setSortNumberFlag] = useState(false);
  const [sortPriceFlag, setSortPriceFlag] = useState(false);
  const [tableData, setTableData] = useState(
    data.filter((e) => e.type === type)
  );
  const [showModal, setShowModal] = useState(false);
  const [selectBet, setSelectBet] = useState(null);

  const onClickNumberHandler = (e) => {
    setSelectBet(e);
    setShowModal(true);
  };

  const sortNumberString = () => {
    setTableData((prev) => {
      let sortArr;
      if (sortNumberFlag) {
        sortArr = [...prev].sort((a, b) => a.numberString - b.numberString);
      } else {
        sortArr = [...prev].sort((a, b) => b.numberString - a.numberString);
      }
      setSortNumberFlag(!sortNumberFlag);
      return sortArr;
    });
  };

  const sortPrice = () => {
    setTableData((prev) => {
      let sortArr;
      if (sortPriceFlag) {
        sortArr = [...prev].sort((a, b) => a.price - b.price);
      } else {
        sortArr = [...prev].sort((a, b) => b.price - a.price);
      }
      setSortPriceFlag(!sortPriceFlag);
      return sortArr;
    });
  };

  useEffect(() => {
    setTableData(data.filter((e) => e.type === type));
  }, [data]);

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
        <ContentModalEdit
          bet={selectBet}
          setShowModal={setShowModal}
          page={"user"}
        />
      </MyModal>
    </div>
  );
}
