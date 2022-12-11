import React, {useState} from 'react'
import { formatDate, dateToInputValue } from '../../../lib/helper'
import { useQueryClient, useMutation } from 'react-query'
import { putLotto, getLottos } from '../../../lib/clientRequest/lotto'

export default function ContentModalLottoEdit({data, setShowModal}) {

  const [newDate, setNewDate] = useState(dateToInputValue(data.date))
  const queryClient = useQueryClient();
  const editMutation = useMutation(putLotto, {
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
      date: newDate
    }
    editMutation.mutate(playload)
  }

  return (
    <div>
          <p className='text-center'>ต้องการแก้ไข</p>
          <p className='text-center'>{formatDate(data.date)}</p>
          <form onSubmit={onSubmitEditHandler} className="text-center my-5">
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
