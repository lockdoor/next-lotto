import React, { useState } from "react";
import {
  translateForbiddenType,
  textColorByForbiddenType,
  checkNumberInput,
} from "../../../lib/helper";
import { useQueryClient, useMutation } from "react-query";
import { putForbidden, deleteForbidden, getForbiddenByLottoDateId } from "../../../lib/clientRequest/forbidden";
import MyModal from "../../../components/myModal";

export default function ForbiddenTable({ forbidden }) {
  const [showModal, setShowModal] = useState(false);
  const [selectForbidden, setSelectForbidden] = useState(null);

  const onClickForbiddenHandler = (e) => {
    setSelectForbidden(e);
    setShowModal(true);
  };

  return (
    <>
      {forbidden ? (
        <div className=" md:flex">
          <Card
            forbidden={forbidden.filter((e) => e.type == "A")}
            type="A"
            onClickForbiddenHandler={onClickForbiddenHandler}
          />
          <Card
            forbidden={forbidden.filter((e) => e.type == "B")}
            type="B"
            onClickForbiddenHandler={onClickForbiddenHandler}
          />
          <Card
            forbidden={forbidden.filter((e) => e.type == "C")}
            type="C"
            onClickForbiddenHandler={onClickForbiddenHandler}
          />
          <MyModal isOpen={showModal} setShowModal={setShowModal}>
            <ContentModalForbiddenEdit
              forbidden={selectForbidden}
              setShowModal={setShowModal}
            />
          </MyModal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

const Card = ({ forbidden, type, onClickForbiddenHandler }) => {
  return (
    <div
      className={`text-${textColorByForbiddenType(
        type
      )} border border-pink-300 bg-white my-3 mx-5 rounded-md py-3 px-5 text-center flex-1
      `}
    >
      <div>{translateForbiddenType(type)}</div>
      <div className={`flex justify-center gap-3 flex-wrap `}>
        {forbidden.map((e) => (
          <span
            key={e._id}
            onClick={() => onClickForbiddenHandler(e)}
            className="cursor-pointer"
          >
            {e.numberString}
          </span>
        ))}
      </div>
    </div>
  );
};

const ContentModalForbiddenEdit = ({
  forbidden,
  setShowModal,
}) => {
  const { _id, type, date } = forbidden;
  const [numberString, setNumberString] = useState(forbidden.numberString)
  const numberLength = forbidden.numberString.length
  const queryClient = useQueryClient()
  const putMutation = useMutation(putForbidden, {
    onSuccess: () => {
      setShowModal(false)
      queryClient.prefetchQuery(
        ["getForbiddenByLottoDateId", date],
        getForbiddenByLottoDateId
      );
    }
  })

  const deleteMutation = useMutation(deleteForbidden, {
    onSuccess: () => {
      setShowModal(false)
      queryClient.prefetchQuery(
        ["getForbiddenByLottoDateId", date],
        getForbiddenByLottoDateId
      );
    }
  })

  const onClickDeleteHandler = () => {
    const payload = {_id, date}
    deleteMutation.mutate(payload)
  }

  const onClickEditHandler = () => {
    const payload = {_id, numberString, date}
    putMutation.mutate(payload)
  }


  return (
    <div className="text-center">
      {/* <form className="text-center"> */}
        <div className="my-3">ต้องการแก้ไขเลขอั้น</div>
        <div className="my-3">{translateForbiddenType(type)}</div>
        <input
          id="numberString"
          className="border border-pink-300 rounded-md outline-pink-400 text-center w-20 text-2xl py-1 px-3"
          type={"String"}
          pattern="[0-9]*"
          inputMode="numeric"
          required
          value={numberString}
          minLength={numberLength}
          maxLength={numberLength}
          onChange={(e) => checkNumberInput(e, numberLength, setNumberString)}
        />
        <div className="text-center my-5">
        <button
          onClick={onClickDeleteHandler}
          className="mt-5 mx-2 py-2 px-5 border border-red-6 bg-red-600 rounded-md cursor-pointer "
        >
          ลบ
        </button>
        <button
          onClick={onClickEditHandler}
          className="mt-5 mx-2 py-2 px-5 border border-pink-400 bg-pink-400 rounded-md cursor-pointer "
        >
          แก้ไข
        </button>
        <button
          onClick={() => setShowModal(false)}
          className="mt-5 mx-2 py-2 px-5 border border-green-400 bg-green-400 rounded-md cursor-pointer "
        >
          ยกเลิก
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};
