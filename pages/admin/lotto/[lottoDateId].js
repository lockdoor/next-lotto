import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/admin/layoutAdmin'
import {BiAddToQueue} from 'react-icons/bi'
import FormCreateLotto from '../../../components/admin/lotto/formCreateLotto'
import LottoTable from '../../../components/admin/lotto/lottosTable'
import getLottoCurrent from '../../../lib/getLottoCurrent'
import { dateToInputValue } from '../../../lib/helper'

export default function LottoPage({lottoCurrent}) {
  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/dashboard/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])

  const [formCreateLottoState, setFormCreateLottoState] = useState(false)

  const actionIcon = (
    <BiAddToQueue id='btn-create-lotto'
      onClick={()=>setFormCreateLottoState(!formCreateLottoState)} 
    />
  );

  return (
    <Layout title={"งวดหวย"} actionIcon={actionIcon} lottoCurrent={lotto}>
      
      {/* FormCreateLotto */}
      { formCreateLottoState && <FormCreateLotto setFormCreateLottoState={setFormCreateLottoState}/> }

      {/* lotto table */}
      <LottoTable />

    </Layout>
    
  )
}

export const getServerSideProps = async (context) => getLottoCurrent(context)
