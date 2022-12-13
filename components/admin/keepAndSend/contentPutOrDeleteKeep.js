import React, { useState } from 'react'
import { translateType, getLottoCurrent } from '../../../lib/helper'
import { useQueryClient, useMutation } from 'react-query'
import { putKeep, deleteKeep, getKeepAndSendDataByTypeAndLottoDateId } from '../../../lib/clientRequest/keepAndSend'

export default function ContentPutOrDeleteKeep({number, setShowModal}) {

  const lottoCurrent = getLottoCurrent()
  const [price, setPrice] = useState(number.keep.price) 
  const queryClient = useQueryClient()

  const putMutation = useMutation(putKeep, {
    onSuccess: (response) => {
      // console.log(response)
      setShowModal(false);
      queryClient.prefetchQuery(
        ["getKeepAndSendDataByTypeAndLottoDateId", number.type, lottoCurrent._id],
        getKeepAndSendDataByTypeAndLottoDateId
      );
    },
  });

  const deleteMutation = useMutation(deleteKeep, {
    onSuccess: (response) => {
      // console.log(response)
      // form.current.remove()
      setShowModal(false);
      queryClient.prefetchQuery(
        ["getKeepAndSendDataByTypeAndLottoDateId", number.type, lottoCurrent._id],
        getKeepAndSendDataByTypeAndLottoDateId
      );
    },
  });

  const onCancleHandler = () => {
    setShowModal(false)
  }

  const onDeleteHandler = () => {
    deleteMutation.mutate(number.keep._id)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {
      _id: number.keep._id,
      price: price
    }
    putMutation.mutate(payload)
  }

  // console.log(number)

  return (
    <div className="p-10">
      <div className="text-center text-2xl">ตัดเก็บ {number.numberString}</div>
      <div className="text-center">{translateType(number.type)}</div>
      <div className="text-center">สามารถตัดได้สูงสุดที่ {number.keep.price + number.send}</div>
      
      <form
        onSubmit={onSubmitHandler}
        // ref={form}
      >
        <input
          type={"number"}
          className="mt-3 w-48 border border-pink-300 text-center outline-pink-400 block rounded-md mx-auto"
          min={1}
          max={number.keep.price + number.send}
          required
          value={price}
          autoFocus
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
  )
}
