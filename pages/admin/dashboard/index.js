import React, { useState, useEffect } from "react";
import Layout from "../../../components/admin/layoutAdmin";
import Setting from "../../../components/admin/dashboard/setting";
import TotalBet from "../../../components/admin/dashboard/totalBet";
import BetDetail from "../../../components/admin/dashboard/betDetail";
import UserRange from "../../../components/admin/dashboard/userRange";
import NumberDetail from "../../../components/admin/dashboard/numberDetail";

export default function DashboardPage() {
  const [lottoCurrent, setLottoCurrent] = useState(null);
  useEffect(() => {
    setLottoCurrent(JSON.parse(localStorage.getItem("lottoCurrent")));
  }, []);

  return (
    <Layout title={"admin dashboard page"}>
      <main className="p-5">
        <div className="md:flex gap-5">
          <Setting lottoCurrent={lottoCurrent} />
          <TotalBet lottoCurrent={lottoCurrent} />
          <UserRange lottoCurrent={lottoCurrent} />
        </div>
        <BetDetail lottoCurrent={lottoCurrent} />
        <NumberDetail lottoCurrent={lottoCurrent} />
      </main>
    </Layout>
  );
}
