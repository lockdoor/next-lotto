import React, {useState, useEffect} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import RadioSelectType from '../../../components/admin/keepAndSend/radioSelectType'
import Advice from '../../../components/admin/keepAndSend/advice'
import Table from '../../../components/admin/keepAndSend/table'
import getLottoCurrent from '../../../lib/getLottoCurrent'
import { getLottoById } from '../../../lib/clientRequest/lotto'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { dateToInputValue } from '../../../lib/helper'

export default function KeepAndSend({lottoCurrent}) {

  const [selectType, setSelectType] = useState("");
  const [showAdvice, setShowAdvice] = useState(false)

  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/keepAndSent/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])

  const {isError, isLoading, data, error} = useQuery(
    ["getLottoById", lotto._id],
    getLottoById
  );

  if (isLoading) return <div>KeepAndSend is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;


  return (
    <Layout title={'ตัดเก็บ/ตัดส่ง'} lottoCurrent={lotto}>
      
      <div className="text-center my-3 text-sm text-blue-400 cursor-pointer" 
        onClick={()=>setShowAdvice(!showAdvice)}
      >
        {showAdvice ?'ปิดวิธีใช้':'แสดงวิธีใช้'}
      </div>
      {showAdvice && <Advice />}

      {/* redio button select type */}
      <RadioSelectType setSelectType={setSelectType} />

      {/* table */}
      {selectType && <Table type={selectType} lottoCurrent={data} />}

    </Layout>
    
  )
}

export const getServerSideProps = async (context) => getLottoCurrent(context)



