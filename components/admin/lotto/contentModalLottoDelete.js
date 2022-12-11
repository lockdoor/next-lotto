import React, { useState } from 'react'
import { deleteLotto, getLottos } from '../../../lib/clientRequest/lotto'
import { useQueryClient, useMutation } from "react-query";
import { formatDate } from '../../../lib/helper';
import { getLottoCurrent } from '../../../lib/helper';


export default function ContentModalLottoDelete({data, setShowModal}) {

  const lottoCurrent = getLottoCurrent()
  const [errorMessage, setErrorMessage] = useState('')
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(deleteLotto, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        console.log(response.data?.hasError)
      } else {
        setShowModal(false)
        queryClient.prefetchQuery("getLottos", getLottos);
      }
    },
  })

  const onSubmitDeleteHandler = (e) => {
    e.preventDefault()
    if(data._id === lottoCurrent._id){
      setErrorMessage('ไม่สามารถลบงวดหวยที่กำลังใช้อยู่')
      return
    }
    deleteMutation.mutate(data._id)
  }
  return (
    <div>
          <p className='text-center'>ต้องการลบวันที่ {formatDate(data.date)}</p>
          {errorMessage && <p className='text-red-400 text-center'>{errorMessage}</p>}
          <form onSubmit={onSubmitDeleteHandler} className="text-center my-5">
            
            <button
              type="submit"
              className="mt-5 mx-2 py-2 px-5 border border-pink-400 bg-pink-400 rounded-md cursor-pointer "
            >
              ลบ
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="mt-5 mx-2 py-2 px-5 border border-green-400 bg-green-400 rounded-md cursor-pointer "
            >
              ยกเลิก
            </button>
          </form>
        </div>
  )
}
