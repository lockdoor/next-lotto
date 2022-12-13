import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import {
  putBet,
  deleteBet,
  getBetsLasted20,
} from "../../../lib/clientRequest/bet";
import { getUserBetDetail } from "../../../lib/clientRequest/user";
import { translateType, checkNumberInput } from "../../../lib/helper";

export default function ContentModalEdit({ bet, setShowModal, page }) {
  console.log(bet)
  const [numberString, setNumberString] = useState(bet.numberString);
  const numberLength = bet.numberString.length;
  const [price, setPrice] = useState(bet.price);
  const nickname = bet.user.nickname;

  const queryClient = useQueryClient();
  const editMutation = useMutation(putBet, {
    onSuccess: (response) => {
      // console.log(response)
      setShowModal(false);
      page === "user"
        ? queryClient.prefetchQuery(
            ["getUserBetDetail",  bet.date, bet.user._id ],
            getUserBetDetail
          )
        : queryClient.prefetchQuery("getBetsLasted20", getBetsLasted20);
    },
  });

  const deleteMutation = useMutation(deleteBet, {
    onSuccess: (response) => {
      // console.log(response)
      setShowModal(false);
      page === "user"
        ? queryClient.prefetchQuery(
            ["getUserBetDetail", bet.date, bet.user._id],
            getUserBetDetail
          )
        : queryClient.prefetchQuery("getBetsLasted20", getBetsLasted20);
    },
  });

  const onClickEditHandler = () => {
    let number = numberString;
    if (bet.type === "set3up") {
      number = numberString
        .split("")
        .sort((a, b) => a - b)
        .join("");
    }
    const payload = { _id: bet._id, numberString: number, price };
    editMutation.mutate(payload);
  };

  const onClickDeleteHandler = () => {
    deleteMutation.mutate(bet._id);
  };

  return (
    <div>
      <p className="text-center my-5 text-xl text-red-600">ต้องการแก้ไข </p>
      <div className="flex flex-row justify-around">
        <div className=" flex-1 text-center border-r-2 border-green-300">
          {nickname}
        </div>
        <div className="flex-1 text-center border-r-2 border-green-300">
          <input
            type={"String"}
            pattern="[0-9]*"
            inputMode="numeric"
            id="numberString"
            required
            value={numberString}
            minLength={numberLength}
            maxLength={numberLength}
            onChange={(e) => checkNumberInput(e, numberLength, setNumberString)}
            className="text-center w-full text-red-600 outline-red-600"
          />
        </div>
        <div className="flex-1 text-center border-r-2 border-green-300">
          {translateType(bet.type)}
        </div>
        <div className="flex-1 text-center">
          <input
            type={"number"}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-center w-full text-red-600 outline-red-600"
          />
        </div>
      </div>
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
    </div>
  );
}
