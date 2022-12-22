import React, {useEffect} from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/admin/layoutAdmin";
import Setting from "../../../components/admin/dashboard/setting";
import TotalBet from "../../../components/admin/dashboard/totalBet";
import BetDetail from "../../../components/admin/dashboard/betDetail";
import UserRange from "../../../components/admin/dashboard/userRange";
import NumberDetail from "../../../components/admin/dashboard/numberDetail";
import getLottoCurrent from "../../../lib/getLottoCurrent"
import { dateToInputValue } from "../../../lib/helper";



export default function DashboardPage({lottoCurrent}) {
  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/dashboard/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])
  return (
    <Layout title={"admin dashboard page"} lottoCurrent={lotto}>
      <main className="p-5">
        <div className="md:flex gap-5">
          <Setting lottoCurrent={lotto} />
          <TotalBet lottoCurrent={lotto} />
          <UserRange lottoCurrent={lotto} />
        </div>
        <BetDetail lottoCurrent={lotto} />
        <NumberDetail lottoCurrent={lotto} />
      </main>
    </Layout>
  );
}

export const getServerSideProps = async (context) => getLottoCurrent(context)
