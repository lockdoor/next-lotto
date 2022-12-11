import React, {useState} from 'react'
import { postLotto, getLottos } from '../../../lib/clientRequest/lotto'
import { useQueryClient, useMutation } from "react-query";
// import { useDispatch } from 'react-redux';
// import { closeFormCreateLotto } from '../../../redux/lottoSlice';


export default function FormCreateLotto({setFormCreateLottoState}) {
  // const dispatch = useDispatch()
  const [date, setDate] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const queryClient = useQueryClient();
  const addMutation = useMutation(postLotto, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        setErrorMessage(response.data.message);
      } else {
        setFormCreateLottoState(false)
        setErrorMessage(null)
        queryClient.prefetchQuery("getLottos", getLottos);
      }
    },
  });


  const onSubmitHandler = (e) => {
    e.preventDefault()
    if(!date){
      setErrorMessage('กรุณาป้อนวันที่')
    }else{
      
      const playload = {date}
      
      addMutation.mutate(playload);
    }
    
  }
  return (
    <div className='text-center py-10 border-b-2 border-gray-200'>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <form onSubmit={onSubmitHandler}>
        <div>
          <input type='date' className='text-xl cursor-pointer border border-green-400 px-5 py-2 rounded-md'
            onChange={e=>setDate(e.target.value)}
          />
          
        </div>
        <button type='submit'
          className='mt-5 py-2 px-5 border border-pink-400 bg-pink-400 rounded-md cursor-pointer '
        >เพิ่มงวดหวย</button>
      </form>
    </div>
  )
}
