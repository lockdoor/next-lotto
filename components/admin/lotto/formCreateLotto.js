import React, {useState} from 'react'
import { postLotto, getLottos } from '../../../lib/clientRequest/lotto'
import { useQueryClient, useMutation } from "react-query";
import InputNumber from './inputNumber';

export default function FormCreateLotto({setFormCreateLottoState}) {
  const [date, setDate] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [up3, setUp3] = useState(550)
  const [down3, setDown3] = useState(150)
  const [set3up, setSet3up] = useState(100)
  const [down2, setDown2] = useState(60)
  const [up2, setUp2] = useState(60)
  const [uprun, setUprun] = useState(3)
  const [downrun, setDownrun] = useState(4)
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
      
      const playload = {date, up3, down3, set3up, down2, up2, uprun, downrun}
      
      addMutation.mutate(playload);
    }
    
  }
  return (
    <div className='text-center py-10 border-b-2 border-gray-200'>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      <form onSubmit={onSubmitHandler} 
        className="border border-green-300 inline-block p-10 rounded-md bg-white">
        {/* <div> */}
          <input type='date' className='block mx-auto text-xl cursor-pointer border border-green-400 px-5 py-2 rounded-md'
            onChange={e=>setDate(e.target.value)}
          />
          <InputNumber label="3ตัวบน: " value={up3} setValue={setUp3}/>
          <InputNumber label="3ตัวโต๊ด: " value={set3up} setValue={setSet3up}/>
          <InputNumber label="3ตัวล่าง: " value={down3} setValue={setDown3}/>
          <InputNumber label="2ตัวบน: " value={up2} setValue={setUp2}/>
          <InputNumber label="2ตัวล่าง: " value={down2} setValue={setDown2}/>
          <InputNumber label="วิ่งบน: " value={uprun} setValue={setUprun}/>
          <InputNumber label="วิ่งล่าง: " value={downrun} setValue={setDownrun}/>
          
          
        {/* </div> */}
        <button type='submit'
          className='mt-5 py-2 px-5 border border-pink-400 bg-pink-400 rounded-md cursor-pointer '
        >เพิ่มงวดหวย</button>
      </form>
    </div>
  )
}

// const InputNumber = ({label, value, setValue }) => {

//   return (
//     <div className='my-3 flex'>
//       <label className='flex-1 text-start'>{label}</label>
//       <input 
//         className='flex-1 border border-green-300 rounded-md w-16 text-center p-1'
//         type="number"
//         value={value}
//         onChange={setValue}
//         required
//       />
//     </div>
//   )
// }
