import React, {useState} from "react";
import {
  translateType,
  translateForbiddenType,
  textColorByForbiddenType,
} from "../../../lib/helper";
import { useQuery, useQueryClient, useMutation } from "react-query";
import {
  getBetByForbiddenNumber,
  deleteBet,
} from "../../../lib/clientRequest/forbidden";
import { RiDeleteBin2Line } from "react-icons/ri";
import MyModal from "../../myModal";
import Link from "next/link";

export default function ForbiddenBetTable({ lottoCurrent }) {

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [selectBet, setSelectBet] = useState(null);
    const { isLoading, isError, data, error } = useQuery(
    ["getBetByForbiddenNumber", lottoCurrent._id],
    getBetByForbiddenNumber
  );

    const onClickDelete = (bet) => {
    // console.log(bet)
    setSelectBet(bet);
    setShowModalDelete(true);
  };

  if (isLoading) return <div>Forbidden is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    // <div className="px-5 lg:columns-3 lg:gap-8">
    <div className="px-5 md:grid md:grid-cols-2 xl:grid-cols-3 gap-3 mt-10">
      {data.forbidden.map((forbidden) => {
        if (!forbidden.bet.length) return <span key={forbidden._id} className='hidden'></span>;
        return (
          <table key={forbidden._id} className="globals-table">
            <caption
              className={`${textColorByForbiddenType(
                forbidden.type
              )}`}
            >
              {forbidden.numberString} {translateForbiddenType(forbidden.type)}{" "}
              = {forbidden.bet.reduce((a, b) => a + b.price, 0)}
            </caption>
            <thead>
              <tr>
                <th>เลข</th>
                <th>ราคา</th>
                <th>ประเภท</th>
                <th>ลูกค้า</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {forbidden.bet.map((e, index) => {
                return (
                  <tr
                    key={e._id}
                    className={`${index % 2 == 0 ? "bg-blue-50" : "bg-blue-100"}`}
                  >
                    <td className="py-2 pl-3 w-14">{e.numberString}</td>
                    <td className="py-2 text-end pr-3 w-16">{e.price}</td>
                    <td className="py-2 pl-3 w-20">{translateType(e.type)}</td>
                    <td className="py-2 pl-3">
                      <Link href={`../user/betDetail/${lottoCurrent._id}/${e.user._id}`}>{e.user.nickname}</Link>
                    </td>
                    <td className="py-2 w-20 text-center">
                      <RiDeleteBin2Line
                        className=" inline-block text-red-500 text-lg cursor-pointer"
                        onClick={() => onClickDelete(e)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
      <MyModal isOpen={showModalDelete} onClose={setShowModalDelete}>
        <ModalDelete
          onClose={setShowModalDelete}
          bet={selectBet}
          lottoCurrent={lottoCurrent}
        />
      </MyModal>
    </div>
  );
}

const ModalDelete = ({ onClose, bet, lottoCurrent }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteBet, {
    onSuccess: (response) => {
      // console.log(response)
      onClose(false);

      queryClient.prefetchQuery(
        ["getBetByForbiddenNumber", lottoCurrent._id],
        getBetByForbiddenNumber
      );
    },
  });

  const onClickDeleteHandler = () => {
    deleteMutation.mutate(bet._id);
  };
  return (
    <div className=" max-w-sm mx-auto my-10 ">
      <table className="w-full">
        <caption className="text-2xl text-red-500 mb-5">ต้องการลบ</caption>
        <thead>
          <tr>
            <th className="py-2 bg-blue-300">เลข</th>
            <th className="py-2 bg-blue-300">ราคา</th>
            <th className="py-2 bg-blue-300">ประเภท</th>
            <th className="py-2 bg-blue-300">ลูกค้า</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <td className="py-2 pl-3 w-14">{bet.numberString}</td>
            <td className="py-2 text-end pr-3 w-16">{bet.price}</td>
            <td className="py-2 pl-3 w-20">{translateType(bet.type)}</td>
            <td className="py-2 pl-3">{bet.user.nickname}</td>
          </tr>
        </thead>
      </table>
      <div className="flex flex-row justify-center gap-10 mt-5">
        <button
          className="w-28 border border-red-500 bg-red-500 rounded-md py-2"
          onClick={onClickDeleteHandler}
        >
          ลบ
        </button>
        <button
          className="w-28 border border-green-500 bg-green-500 rounded-md py-2"
          onClick={() => onClose(false)}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};
