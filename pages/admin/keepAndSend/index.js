import React, {useState} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import RadioSelectType from '../../../components/admin/keepAndSend/radioSelectType'
import Advice from '../../../components/admin/keepAndSend/advice'
import Table from '../../../components/admin/keepAndSend/table'

export default function KeepAndSend() {

  const [selectType, setSelectType] = useState("");
  const [showAdvice, setShowAdvice] = useState(false)

  return (
    <Layout title={'ตัดเก็บ/ตัดส่ง'}>
      <div className="text-center my-3 text-sm text-blue-400 cursor-pointer" 
      onClick={()=>setShowAdvice(!showAdvice)}>{showAdvice ?'ปิดวิธีใช้':'แสดงวิธีใช้'}</div>
      {showAdvice && <Advice />}

      {/* redio button select type */}
      <RadioSelectType setSelectType={setSelectType} />

      {/* table */}
      {selectType && <Table type={selectType} />}

    </Layout>
    
  )
}
