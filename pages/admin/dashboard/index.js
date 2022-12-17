import React, {useState, useEffect} from "react";
import Layout from "../../../components/admin/layoutAdmin";
// import { getLottoCurrent } from "../../../lib/helper";
// import { useRouter } from "next/router";
import Setting from "../../../components/admin/dashboard/setting";

  // const router = useRouter();
  // if (lottoCurrent === null) router.replace("/admin/lotto");

export default function DashboardPage() {

  // const lottoCurrent = getLottoCurrent();

  const [lottoCurrent, setLottoCurrent] = useState(null)
  useEffect(()=>{
    setLottoCurrent(JSON.parse(localStorage.getItem("lottoCurrent")))
  }, [])

  return (
    <Layout title={"admin dashboard page"}>
      <div className=" cursor-pointer">Dashboard</div>
      <Setting lottoCurrent={lottoCurrent}/>
    </Layout>
  );
}
