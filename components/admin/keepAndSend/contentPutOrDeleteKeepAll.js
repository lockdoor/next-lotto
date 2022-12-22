import React, { useState } from "react";
import { translateType } from "../../../lib/helper";
import { useQueryClient, useMutation } from "react-query";
import {
  putKeepAll,
  getKeepAndSendDataByTypeAndLottoDateId,
  deleteKeepAll,
} from "../../../lib/clientRequest/keepAndSend";

// component นี้จะทำให้มีการแนะนำต่าง ๆ ว่ามีเลขเท่าไหร่ควรตัดที่เท่าไหร่ กำไรเท่าไหร่
export default function ContentPutOrDeleteKeepAll({ data, setShowModal, keepMaxPrice, lottoCurrent }) {
  const [price, setPrice] = useState(data.keepAll.price);
  // const form = useRef(null)
  const queryClient = useQueryClient();
  const putMutation = useMutation(putKeepAll, {
    onSuccess: (response) => {
      // console.log(response)
      setShowModal(false);
      queryClient.prefetchQuery(
        ["getKeepAndSendDataByTypeAndLottoDateId", data.type, lottoCurrent._id],
        getKeepAndSendDataByTypeAndLottoDateId
      );
    },
  });

  const deleteMutation = useMutation(deleteKeepAll, {
    onSuccess: (response) => {
      // console.log(response)
      // form.current.remove()
      setShowModal(false);
      queryClient.prefetchQuery(
        ["getKeepAndSendDataByTypeAndLottoDateId", data.type, lottoCurrent._id],
        getKeepAndSendDataByTypeAndLottoDateId
      );
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = { _id: data.keepAll._id, price };
    putMutation.mutate(payload);
  };

  const onDeleteHandler = () => {
    // e.preventDefault()
    deleteMutation.mutate(data.keepAll._id);
  };

  const onCancleHandler = () => {
    // form.current.remove()
    // console.log(form.current)
    setShowModal(false);
  };

  return (
    <div className="p-10">
      <div className="text-center text-2xl">ตัดทุกตัว</div>
      <div className="text-center">{translateType(data.type)}</div>
      <div className="text-center" >สามารถตัดได้สูงสุดที่ {data.keepAll.price + keepMaxPrice}</div>
      <form
        onSubmit={onSubmitHandler}
        // ref={form}
      >
        <input
          type={"number"}
          className="mt-3 border border-pink-300 w-48 text-center outline-pink-400 block rounded-md mx-auto"
          min={1}
          max={keepMaxPrice + data.keepAll.price}
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="ระบุจำนวน"
        />
        <div className="flex flex-row justify-center gap-5 mt-5">
          <button
            onClick={onDeleteHandler}
            className="border border-red-300 bg-red-300 w-24 rounded-md hover:bg-red-400 hover-border-red-400"
          >
            ลบ
          </button>
          <button
            type="submit"
            // onClick={onEditHandler}
            className="border border-green-300 bg-green-300 w-24 rounded-md hover:bg-green-400 hover-border-green-400"
          >
            บันทึก
          </button>
          <button
            onClick={onCancleHandler}
            className="border border-pink-300 bg-pink-300 w-24 rounded-md hover:bg-pink-400 hover-border-pink-400"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
