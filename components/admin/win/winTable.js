import React, { useState } from "react";
import MyModal from "../../myModal";
import { Input } from "./contentModalPost";
import { useQueryClient, useMutation } from "react-query";
import { putWin, getWinByLottoDateId } from "../../../lib/clientRequest/win";
export default function WinTable({ data }) {
  const {date, first, first3_1, first3_2, last2, last3_1, last3_2} = data
  // console.log(data)
  const [showModal, setShowModal] = useState(false)
  const [selectNum, setSelectNum] = useState('')
  const [selectType, setSelectType] = useState('')
  const [length, setLength] = useState(0)

  const queryClient = useQueryClient()
  const putMutation = useMutation(putWin, {
    onSuccess: () => {
      queryClient.prefetchQuery(['getWinByLottoDateId', data.date], getWinByLottoDateId)
      setShowModal(false)
    }
  })

  const onClickEdit = (obj) => {
    // console.log(translateWinKey(obj))
    const type = Object.keys(obj)[0]
    setSelectType(type)
    setSelectNum(obj[type])
    setLength(obj[type].length)
    setShowModal(true)
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    const payload = [{date}, ]
    const obj = {}
    obj[selectType] = selectNum
    payload.push(obj)
    if(obj[selectType] === data[selectType]){
      console.log('not change')
      return
    }
    console.log(payload)
    putMutation.mutate(payload)
  }
  return (
    <div className="my-5 w-60 mx-auto grid grid-cols-2 gap-3 border-2 border-green-300 p-3 rounded-md">
      <div>
        <div className="text-center">รางวัลที่1</div>
        <div className="text-center text-red-500 cursor-pointer hover:text-red-700" onClick={()=>onClickEdit({first})}>{first}</div>
      </div>
      <div>
        <div className="text-center">เลขท้าย2ตัว</div>
        <div className="text-center text-red-500 cursor-pointer hover:text-red-700" onClick={()=>onClickEdit({last2})}>{last2}</div>
      </div>

      <hr className="border border-green-300" />
      <hr className="border border-green-300" />

      <div>
        <div className="text-center">เลขหน้า3ตัว</div>
        <div className="flex justify-center  gap-5">
          <div className="text-center text-red-500 cursor-pointer hover:text-red-700" onClick={()=>onClickEdit({first3_1})}>{first3_1}</div>
          <div className="text-center text-red-500 cursor-pointer hover:text-red-700" onClick={()=>onClickEdit({first3_2})}>{first3_2}</div>
        </div>
      </div>
      <div>
        <div className="text-center">เลขท้าย3ตัว</div>
        <div className="flex justify-center gap-5">
          <div className="text-center text-red-500 cursor-pointer hover:text-red-700" onClick={()=>onClickEdit({last3_1})}>{last3_1}</div>
          <div className="text-center text-red-500 cursor-pointer hover:text-red-700" onClick={()=>onClickEdit({last3_2})}>{last3_2}</div>
        </div>
      </div>
      <MyModal isOpen={showModal} setShowModal={setShowModal}>
        <div>
          <div className="text-center">ต้องการแก้ไข</div>
          <div className="text-center">{translateWinKey(selectType)}</div>
          <form className="mt-5" onSubmit={onSubmitHandler}>
            <Input length={length} focus={true} value={selectNum} setValue={setSelectNum}/>
            <div className="flex justify-center gap-5 my-5">
              <button type="submit"
                className="w-20 border border-pink-300 rounded-md bg-pink-300 hover:bg-pink-400 hover:border-pink-400"
                >แก้ไข</button>
              <button
                type="button"
                onClick={()=>setShowModal(false)}
                className="w-20 border border-green-300 rounded-md bg-green-300 hover:bg-green-400 hover:border-green-400"
              
              >ยกเลิก</button>
            </div>
          </form>
        </div>
      </MyModal>
    </div>
  );
}

const translateWinKey = (type) => {
  switch(type){
    case 'first': return 'รางวัลที่1'
    case 'last2': return 'เลขท้าย2ตัว'
    case 'first3_1': case 'first3_2': return 'เลขหน้า3ตัว'
    case 'last3_1': case 'last3_3': return 'เลขท้าย39ตัว'
    default: break
  }
}