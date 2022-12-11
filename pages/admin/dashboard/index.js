import React from "react";
import Layout from "../../../components/admin/layoutAdmin";
import { getLottoCurrent } from "../../../lib/helper";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const lottoCurrent = getLottoCurrent();
  const router = useRouter();
  if (lottoCurrent === null) router.replace("/admin/lotto");

  return (
    <Layout title={"admin dashboard page"}>
      <div className=" cursor-pointer">Dashboard</div>
    </Layout>
  );
}