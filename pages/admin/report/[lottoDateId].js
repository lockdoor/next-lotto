import React, {useEffect} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import { useQuery } from "react-query";
import { getAllBetsGroupNumberTotalPrice } from "../../../lib/clientRequest/report";
import TotalPrice from "../../../components/admin/report/totalPrice";
import Summarize from "../../../components/admin/report/summarize";
import getLottoCurrent from '../../../lib/getLottoCurrent';
import { useRouter } from 'next/router';
import { dateToInputValue } from '../../../lib/helper';

export default function ReportPage({lottoCurrent}) {
  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/report/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])
  const { isLoading, isError, data, error } = useQuery(
    ["getAllBetsGroupNumberTotalPrice", lotto?._id],
    getAllBetsGroupNumberTotalPrice
  );

  if (isLoading) return <div>Bets is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  // console.log(data)

  return (
    <Layout title={'รายงาน'} lottoCurrent={lotto}>
      <main>
        {/* <div>ReportPage</div> */}
        <TotalPrice data={data} />
        <Summarize data={data}/>
      </main>
    </Layout>
    
  )
}

export const getServerSideProps = async (context) => getLottoCurrent(context)
