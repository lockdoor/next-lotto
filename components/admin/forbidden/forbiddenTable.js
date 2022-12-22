import React, { useState } from "react";
import {
  translateForbiddenType,
  textColorByForbiddenType,
} from "../../../lib/helper";
import { useQueryClient, useMutation } from "react-query";
import {
  deleteForbidden,
  getForbiddenByLottoDateId,
  getBetByForbiddenNumber
} from "../../../lib/clientRequest/forbidden";
import MyModal from "../../../components/myModal";
import { useQuery } from "react-query";

export default function ForbiddenTable({ lottoCurrent }) {
  const [showModal, setShowModal] = useState(false);
  const [selectForbidden, setSelectForbidden] = useState(null);

  const {isError, isLoading, data, error} = useQuery(
    ["getForbiddenByLottoDateId", lottoCurrent._id],
    getForbiddenByLottoDateId
  );

  if (isLoading) return <div>ForBidden is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  const onClickForbiddenHandler = (e) => {
    setSelectForbidden(e);
    setShowModal(true);
  };

  return (
    <>
      {data ? (
        <div className=" md:flex">
          <Card
            forbidden={data.filter((e) => e.type == "A")}
            type="A"
            onClickForbiddenHandler={onClickForbiddenHandler}
          />
          <Card
            forbidden={data.filter((e) => e.type == "B")}
            type="B"
            onClickForbiddenHandler={onClickForbiddenHandler}
          />
          <Card
            forbidden={data.filter((e) => e.type == "C")}
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
      className={`${textColorByForbiddenType(
        type
      )} border border-pink-300 bg-white my-3 mx-5 rounded-md py-3 px-5 text-center flex-1
      `}
    >
      <div>{translateForbiddenType(type)}</div>
      <div className={`flex justify-center gap-3 flex-wrap `}>
        {forbidden.map((e) => {
          
          return e.isMain ? (
            <span
              key={e._id}
              onClick={() => onClickForbiddenHandler(e)}
              className="cursor-pointer"
            >
              {e.numberString}
            </span>
          ) : (
            <span key={e._id} className='hidden'></span>
          );
        })}
      </div>
    </div>
  );
};

const ContentModalForbiddenEdit = ({ forbidden, setShowModal }) => {
  const { type, date, numberString, set } = forbidden;
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteForbidden, {
    onSuccess: () => {
      setShowModal(false);
      queryClient.prefetchQuery(
        ["getForbiddenByLottoDateId", date],
        getForbiddenByLottoDateId
      );
      queryClient.prefetchQuery(["getBetByForbiddenNumber", date],
      getBetByForbiddenNumber)
    },
  });

  const onClickDeleteHandler = () => {
    const payload = { date, type, set };
    deleteMutation.mutate(payload);
  };

  return (
    <div className="text-center">
      <div className="my-3">ต้องการแก้ไขลบเลขอั้น</div>
      <div className="my-3">{translateForbiddenType(type)}</div>
      <div className="my-3">{numberString}</div>
      <div className="text-center my-5">
        <button
          onClick={onClickDeleteHandler}
          className="mt-5 mx-2 py-2 px-5 border border-red-6 bg-red-600 rounded-md cursor-pointer "
        >
          ลบ
        </button>

        <button
          onClick={() => setShowModal(false)}
          className="mt-5 mx-2 py-2 px-5 border border-green-400 bg-green-400 rounded-md cursor-pointer "
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};
