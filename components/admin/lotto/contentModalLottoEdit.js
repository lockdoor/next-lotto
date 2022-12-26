import React, {useState} from 'react'
import { formatDate, dateToInputValue } from '../../../lib/helper'
import { useQueryClient, useMutation } from 'react-query'
import { putLottoDate, getLottos } from '../../../lib/clientRequest/lotto'
import InputNumber from './inputNumber'
export default function ContentModalLottoEdit({data, setShowModal}) {

  const [newDate, setNewDate] = useState(dateToInputValue(data.date))
  const [up3, setUp3] = useState(data.up3)
  const [down3, setDown3] = useState(data.down3)
  const [set3up, setSet3up] = useState(data.set3up)
  const [down2, setDown2] = useState(data.down2)
  const [up2, setUp2] = useState(data.up2)
  const [uprun, setUprun] = useState(data.uprun)
  const [downrun, setDownrun] = useState(data.downrun)
  const queryClient = useQueryClient();
  const editMutation = useMutation(putLottoDate, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        console.log(response.data?.hasError)
      } else {
        setShowModal(false)
        setNewDate(null)
        queryClient.prefetchQuery("getLottos", getLottos);
      }
    },
  });

  const onSubmitEditHandler = e => {
      e.preventDefault();
    const playload = {
      _id: data._id,
      date: newDate, up3, down3, set3up, down2, up2, uprun, downrun
    }
    editMutation.mutate(playload)
  }

  return (
    <div className='text-center'>
          <p className='text-center'>ต้องการแก้ไข</p>
          <p className='text-center'>{formatDate(data.date)}</p>
          <form onSubmit={onSubmitEditHandler} className="text-center my-5 inline-block">
            <div>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                className="text-xl cursor-pointer border border-green-400 px-5 py-2 rounded-md"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>
            <InputNumber label="3ตัวบน: " value={up3} setValue={setUp3}/>
            <InputNumber label="3ตัวโต๊ด: " value={set3up} setValue={setSet3up}/>
            <InputNumber label="3ตัวล่าง: " value={down3} setValue={setDown3}/>
            <InputNumber label="2ตัวบน: " value={up2} setValue={setUp2}/>
            <InputNumber label="2ตัวล่าง: " value={down2} setValue={setDown2}/>
            <InputNumber label="วิ่งบน: " value={uprun} setValue={setUprun}/>
            <InputNumber label="วิ่งล่าง: " value={downrun} setValue={setDownrun}/>
            <button
              type="submit"
              className="mt-5 mx-2 py-2 px-5 border border-green-400 bg-green-400 rounded-md cursor-pointer "
            >
              บันทึก
            </button>
            <button
              onClick={()=>setShowModal(false)}
              className="mt-5 mx-2 py-2 px-5 border border-pink-400 bg-pink-400 rounded-md cursor-pointer "
            >
              ยกเลิก
            </button>
          </form>
        </div>
  )
}
