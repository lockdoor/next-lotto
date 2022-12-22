import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { formatDate, dateToInputValue } from "../../lib/helper";
import Head from "next/head";
export default function Layout({ title, children, actionIcon, lottoCurrent }) {
  const [drawerState, setDrawerState] = useState(false);
  const router = useRouter();
  const gotoPage = (page) => {
    setDrawerState(false);
    router.push(page);
  };
  const onSignOut = () => {
    localStorage.removeItem('lottoCurrent')
    signOut()
  }
  return (
    <div className=" container mx-auto">
      <Head>
        <meta name="theme-color" content="#F9A8D4" />
        <title>{title}</title>
      </Head>
      <header className="h-14 flex flex-row bg-pink-300 sticky top-0 z-10">
        {lottoCurrent &&<HiMenu
          onClick={() => setDrawerState(true)}
          className=" justify-self-start cursor-pointer ml-2 text-5xl"
        />}

        <div className="w-full text-center">
          <div>{title}</div>
          {/* <LottoDate /> */}
          {lottoCurrent && <div>{formatDate(lottoCurrent.date)}</div>}
        </div>

        <div className=" justify-self-end mr-5 text-5xl cursor-pointer">{actionIcon}</div>
      </header>
      
      {children}

      <Drawer
        open={drawerState}
        onClose={() => setDrawerState(false)}
        direction="left"
        customIdSuffix
      >
        <div className="w-full p-0 m-0">
          <div className="h-14 w-full bg-pink-300"></div>
          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/dashboard/${dateToInputValue(lottoCurrent.date)}`)}>หน้าหลัก</p>
          </div>

          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/user/${dateToInputValue(lottoCurrent.date)}`)}>ลูกค้า</p>
          </div>

          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/bet/${dateToInputValue(lottoCurrent.date)}`)}>คีย์หวย</p>
          </div>

          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/forbidden/${dateToInputValue(lottoCurrent.date)}`)}>เลขอั้น</p>
          </div>

          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/report/${dateToInputValue(lottoCurrent.date)}`)}>รายงาน</p>
          </div>

          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/keepAndSend/${dateToInputValue(lottoCurrent.date)}`)}>
              ตัดเก็บ / ตัดส่ง
            </p>
          </div>

          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/win/${dateToInputValue(lottoCurrent.date)}`)}>ตรวจหวย</p>
          </div>

          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage(`/admin/lotto/${lottoCurrent.date}`)}>งวดหวยทั้งหมด</p>
          </div>

          <div className="drawer-item-link" onClick={onSignOut}>
            ออกจากระบบ
          </div>
        </div>
      </Drawer>
    </div>
  );
}

// const LottoDate = () => {
//   const [lottoCurrent, setLottoCurrent] = useState(null)
//   useEffect(()=>{setLottoCurrent(getLottoCurrent())},[])
//   return <div>{lottoCurrent ? `${formatDate(lottoCurrent.date)}` : ""}</div>;
// };
