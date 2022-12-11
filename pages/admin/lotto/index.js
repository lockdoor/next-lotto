import React, {useState} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import {BiAddToQueue} from 'react-icons/bi'
import FormCreateLotto from '../../../components/admin/lotto/formCreateLotto'
import LottoTable from '../../../components/admin/lotto/lottosTable'

export default function LottoPage() {

  const [formCreateLottoState, setFormCreateLottoState] = useState(false)

  const actionIcon = (
    <BiAddToQueue 
      onClick={()=>setFormCreateLottoState(!formCreateLottoState)} 
    />
  );

  return (
    <Layout title={"งวดหวย"} actionIcon={actionIcon}>
      
      {/* FormCreateLotto */}
      { formCreateLottoState && <FormCreateLotto setFormCreateLottoState={setFormCreateLottoState}/> }

      {/* lotto table */}
      <LottoTable />

    </Layout>
    
  )
}
