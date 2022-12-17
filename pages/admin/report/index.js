import React, {useState, useEffect} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import { useQuery } from "react-query";
import { getAllBetsGroupNumberTotalPrice } from "../../../lib/clientRequest/report";
import TotalPrice from "../../../components/admin/report/totalPrice";
import Summarize from "../../../components/admin/report/summarize";

export default function ReportPage() {
  const [lottoCurrent, setLottoCurrent] = useState(null)
  useEffect(()=>{
    setLottoCurrent(JSON.parse(localStorage.getItem('lottoCurrent')))
  },[])
  const { isLoading, isError, data, error } = useQuery(
    ["getAllBetsGroupNumberTotalPrice", lottoCurrent?._id],
    getAllBetsGroupNumberTotalPrice
  );

  if (isLoading) return <div>Bets is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  // console.log(data)

  return (
    <Layout title={'รายงาน'}>
      <main>
        {/* <div>ReportPage</div> */}
        <TotalPrice data={data} />
        <Summarize data={data}/>
      </main>
    </Layout>
    
  )
}
