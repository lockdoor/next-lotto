import React, {useState} from 'react'
import { getLottoCurrent, translateType } from '../../../lib/helper'
import { useQueryClient, useMutation } from 'react-query'
import { postKeepAll, getKeepAndSendDataByTypeAndLottoDateId } from '../../../lib/clientRequest/keepAndSend'

export default function ContentPostKeepAll({type, setShowModal, keepMaxPrice}) {
  const lottoCurrent = getLottoCurrent()
  const [price, setPrice] = useState('')

  const queryClient = useQueryClient()
  const postMutation = useMutation(postKeepAll, {
    onSuccess: (response) => {
      // console.log(response)
      setShowModal(false);
      queryClient.prefetchQuery(["getKeepAndSendDataByTypeAndLottoDateId", type, lottoCurrent._id], getKeepAndSendDataByTypeAndLottoDateId)
  }
  })

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {type, date: lottoCurrent._id, price}
    postMutation.mutate(payload)
  }

  return (
    <div className=' p-10'>
      <div className='text-center text-2xl'>ตัดทุกตัว</div>
      <div className='text-center'>{translateType(type)}</div>
      <div className="text-center" >สามารถตัดได้สูงสุดที่ {keepMaxPrice}</div>
      <form onSubmit={onSubmitHandler}>
        <input type={'number'} 
          className="mt-3 border border-pink-300 w-48 text-center outline-pink-400 block rounded-md mx-auto"
          min={1}
          max={keepMaxPrice}
          required
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
          placeholder='ระบุจำนวน'
          />
        <div className='flex flex-row justify-center gap-5 mt-5'>
          <button type='submit'
            className='border border-green-300 bg-green-300 w-24 rounded-md hover:bg-green-400 hover-border-green-400'
          >บันทึก</button>
          <button onClick={()=>setShowModal(false)}
            className='border border-pink-300 bg-pink-300 w-24 rounded-md hover:bg-pink-400 hover-border-pink-400'
          
          >ยกเลิก</button>
        </div>
        
      </form>
    </div>
  )
}
