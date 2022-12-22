import React, {useEffect} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import FormCreateForbiddenNumber from "../../../components/admin/forbidden/formCreateForbiddenNumber";
import ForbiddenTable from "../../../components/admin/forbidden/forbiddenTable";
import ForbiddenBetTable from "../../../components/admin/forbidden/forbiddenBetTable";
import { useQuery } from "react-query";
import getLottoCurrent from '../../../lib/getLottoCurrent';
import { useRouter } from 'next/router';
import { dateToInputValue } from '../../../lib/helper';
import { getLottoById } from '../../../lib/clientRequest/lotto'

export default function Forbidden({lottoCurrent}) {

  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/forbidden/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])

  const {isError, isLoading, data, error} = useQuery(
    ["getLottoById", lotto._id],
    getLottoById
  );


  if (isLoading) return <div>ForBidden is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  
  return (
    <Layout title={'เลขอั้น'} lottoCurrent={lotto}>
      {/* form */}
      <FormCreateForbiddenNumber lottoCurrent={data} />

      {/* table */}
      <ForbiddenTable lottoCurrent={data}/>

      {/* bet table */}
      <ForbiddenBetTable lottoCurrent={data}/>

    </Layout>
    
  )
}

export const getServerSideProps = async (context) => getLottoCurrent(context)

