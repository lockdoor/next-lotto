import React, { useState } from "react";
import MyModal from "../../myModal";
import ContentPutOrDeleteKeepAll from "./contentPutOrDeleteKeepAll";
import ContentPostKeepAll from "./contentPostKeepAll";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

export default function KeepAll({ data }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showPutOrDeleteKeepAll, setShowPutOrDeleteKeepAll] = useState(false);
  const keepMaxPrice = data.reduce(
    (previous, current) => (previous < current.send ? previous : current.send),
    Number.POSITIVE_INFINITY
  );

  // console.log('keepMaxPrice is ', keepMaxPrice)
  return (
    <div>
      <div>
        <span>ตัดทุกตัว </span>
        {data[0].keepAll?.price ? (
          <span
            onClick={() => setShowPutOrDeleteKeepAll(true)}
            className=" cursor-pointer"
          >
            {data[0].keepAll?.price} = {data[0].keepAll?.price * data.length}
            <RiEdit2Line className="inline" />
          </span>
        ) : (
          <AiOutlinePlusSquare
            onClick={() => setShowPostModal(true)}
            className="inline text-green-400 cursor-pointer"
          />
        )}
      </div>
      <MyModal isOpen={showPostModal} onClose={setShowPostModal}>
        <ContentPostKeepAll
          type={data[0].type}
          setShowModal={setShowPostModal}
          keepMaxPrice={keepMaxPrice}
        />
      </MyModal>
      <MyModal
        isOpen={showPutOrDeleteKeepAll}
        onClose={setShowPutOrDeleteKeepAll}
      >
        <ContentPutOrDeleteKeepAll
          data={data[0]}
          setShowModal={setShowPutOrDeleteKeepAll}
          keepMaxPrice={keepMaxPrice}
        />
      </MyModal>
    </div>
  );
}
