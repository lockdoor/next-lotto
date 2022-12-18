import { useQuery } from "react-query";
import { getBetsLasted20 } from "../../../lib/clientRequest/bet";
import { getForbiddenByLottoDateId } from "../../../lib/clientRequest/forbidden"
import {
  translateType,
  formatDateWithTime,
  formatDate,
  isForbidden,
  textColorByForbiddenType,
  getLottoCurrent
} from "../../../lib/helper";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";
import MyModal from "../../myModal";
import ContentModalEdit from "./contentModalEdit";
import Link from "next/link";
import React, { useState } from "react";

export default function BetTable() {
  // console.log(forbidden)

  const lottoCurrent = getLottoCurrent()
  const { isLoading, isError, data, error } = useQuery(
    "getBetsLasted20",
    getBetsLasted20
  );
  
  const forbidden = useQuery(
    ["getForbiddenByLottoDateId", lottoCurrent._id],
    getForbiddenByLottoDateId
  );
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectBet, setSelectBet] = useState({});

  if (isLoading) return <div>Bets is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  if (!data?.length) return <div>Someting Wrong!</div>

  const onClickEditHandler = (e) => {
    setSelectBet(e);
    setShowModalEdit(true);
  };

  console.log(data)
  return (
    <div className="flex-1 flex flex-col gap-2 border border-pink-300 py-5 mt-3 rounded-md">
      <p className="text-center text-3xl font-extrabold">ล่าสุด</p>
      {data?.length && (
        <>
          {data.map((e) => (
            <div
              key={e._id}
              className=" border border-green-300 bg-white mx-5 p-4 rounded-xl"
            >
              <div className="flex flex-row justify-around">
                <div className=" flex-1 text-center border-r-2 border-green-300">
                  <Link
                    href={`../admin/users/betDetail/${e.date._id}/${e.user._id}/${e.user.nickname}`}
                  >
                    {e.user.nickname}
                  </Link>
                </div>
                <div
                  className={`flex-1 text-center border-r-2 border-green-300 ${textColorByForbiddenType(
                    isForbidden(e.numberString, forbidden.data)
                  )}`}
                >
                  {e.numberString}
                </div>
                <div className="flex-1 text-center border-r-2 border-green-300">
                  {translateType(e.type)}
                </div>
                <div className="flex-1 text-center">{e.price}</div>
              </div>
              <div className=" h-4 border-b-2 border-green-300"></div>
              <div className="flex flex-row justify-around mt-4 items-center">
                <div></div>

                <div className="text-center text-xs">
                  <p>ผู้บันทึก: {e.recorder?.nickname}</p>
                  <p>{formatDateWithTime(e.updatedAt)}</p>
                  <p>งวดหวย: {formatDate(e.date.date)}</p>
                </div>

                <div>
                  <RiEdit2Line
                    size={30}
                    color="brown"
                    className=" cursor-pointer"
                    onClick={() => onClickEditHandler(e)}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <MyModal isOpen={showModalEdit} setShowModal={setShowModalEdit}>
        <ContentModalEdit bet={selectBet} setShowModal={setShowModalEdit} />
      </MyModal>
    </div>
  );
}
