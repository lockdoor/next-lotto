import React, { useState } from "react";
import { translateType } from "../../../lib/helper";
import { useQueryClient, useMutation } from "react-query";
import {
  postKeepByTypeNumberLottoDateId,
  getKeepAndSendDataByTypeAndLottoDateId,
} from "../../../lib/clientRequest/keepAndSend";

export default function ContentPostKeep({ number, setShowModal, lottoCurrent }) {

  const [price, setPrice] = useState("");
  const queryClient = useQueryClient();
  const postMutation = useMutation(postKeepByTypeNumberLottoDateId, {
    onSuccess: () => {
      setShowModal(false);
      queryClient.prefetchQuery(
        ["getKeepAndSendDataByTypeAndLottoDateId", number.type, lottoCurrent._id],
        getKeepAndSendDataByTypeAndLottoDateId
      );
    },
  });
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      date: lottoCurrent._id,
      type: number.type,
      numberString: number.numberString,
      price: price,
    };

    postMutation.mutate(payload);
  };

  return (
    <div className=" p-10">
      <div className="text-center text-2xl">ตัดเก็บ {number.numberString}</div>
      <div className="text-center">{translateType(number.type)}</div>
      <div className="text-center">สามารถตัดได้สูงสุดที่ {number.send}</div>

      <form onSubmit={onSubmitHandler}>
        <input
          type={"number"}
          className="mt-3 w-48 border border-pink-300 text-center outline-pink-400 block rounded-md mx-auto"
          min={1}
          max={number.send}
          required
          value={price}
          autoFocus
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ระบุจำนวน"
        />
        <div className="flex flex-row justify-center gap-5 mt-5">
          <button
            type="submit"
            className="border border-green-300 bg-green-300 w-24 rounded-md hover:bg-green-400 hover-border-green-400"
          >
            บันทึก
          </button>
          <button
            // type='reset'
            onClick={() => setShowModal(false)}
            className="border border-pink-300 bg-pink-300 w-24 rounded-md hover:bg-pink-400 hover-border-pink-400"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
