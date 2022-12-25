import React, {useState} from 'react'
import { numberWithCommas } from '../../../lib/helper'
import { useQueryClient, useMutation } from 'react-query'
import { postPayment, putPayment, getUsersWithTotalBetByLottoDateId } from '../../../lib/clientRequest/user'
import { useSession } from "next-auth/react";


// input text only digit with comma
export default function Payment({userData, lottoDateId, setErrorMessage}) {
  // console.log(lottoDateId)
  const { data: session } = useSession();
  const[input, setInput] = useState(numberWithCommas(userData.payment?.payment) || '')
  const queryClient = useQueryClient()
  const postMutation = useMutation(postPayment, {
    onSuccess: (response) => {
      if(response.data?.hasError){
        setInput("")
        setErrorMessage(response.data.message)
      }
      else{
        setErrorMessage('')
        queryClient.prefetchQuery(
          ["getUsersWithTotalBetByLottoDateId", lottoDateId],
          getUsersWithTotalBetByLottoDateId)
      }
      
    }
  })

  // console.log(userData)

  const putMutation = useMutation(putPayment, {
    onSuccess: (response) => {
      if(response.data?.hasError){
        setInput(numberWithCommas(userData.payment?.payment))
        setErrorMessage(response.data.message)
      }
      else{
        queryClient.prefetchQuery(
          ["getUsersWithTotalBetByLottoDateId", lottoDateId],
          getUsersWithTotalBetByLottoDateId)
      }
      
    }
  })

  const onChangeHandle = (e) => {
    // e.preventDefault()
    const regexNumber = /[^0-9||\,]/g;
    if(regexNumber.test(e.target.value)){
      e.target.value = e.target.value.replace(e.target.value[e.target.value.length - 1], "")
    }else {
      e.target.value = e.target.value.replace(/[\,]/g, "")
      setInput(numberWithCommas(e.target.value))
    }
  }

  const onBlurHandler = () => {
    const payment = input.replace(/[\,]/g, "")
    if(userData.payment){
      const payload = {
        paymentId: userData.payment._id,
        recorder: session.token._id,
        payment: payment,
        lottoDateId: lottoDateId,
        userId: userData._id,
      }
      putMutation.mutate(payload)
    }
    else {
      const payload = {
        userId: userData._id,
        lottoDateId: lottoDateId,
        recorder: session.token._id,
        payment: payment
      }
      postMutation.mutate(payload)
    }
  }

  return (
    <input 
      type={'text'}
      // pattern="[0-9]*"
      inputMode="numeric"
      value={input}
      onChange={onChangeHandle}
      onBlur={onBlurHandler}
      className={`max-w-[96px] border-b-2 ${userData.payment?.isFinish ? 'border-green-300' : 'border-pink-300'} text-start outline-none px-2`}
    />   
  )
}
