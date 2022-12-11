import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { signOut } from 'next-auth/react' 
import { useRouter } from "next/router";
export default function Layout({ title, children, actionIcon }) {
  const [drawerState, setDrawerState] = useState(false);

  const router = useRouter();
  const gotoPage = (page) => {
    setDrawerState(false)
    router.push(page);
  };
  return (
    <div className=" container mx-auto">
      <header className="flex flex-row bg-pink-300 border ">
        
          <HiMenu
            onClick={() => setDrawerState(true)}
            className=" justify-self-start cursor-pointer ml-2 text-3xl"
          />
        
        <div className="w-full text-center">
          <div>{title}</div>

          {/* <LottoDate /> */}
        </div>
        <div className=" justify-self-end mr-5 text-3xl">
          <span>
            {actionIcon}
          </span>
        </div>
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
            <p onMouseDown={() => gotoPage("/admin/dashboard")}>หน้าหลัก</p>
          </div>
          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage("/admin/users")}>ลูกค้า</p>
          </div>
          
          <div className="drawer-item-link" onClick={() => signOut()}>
            ออกจากระบบ
          </div>
        </div>
      </Drawer>
    </div>
  );
}


{/* <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage("/admin/bet")}>คีย์หวย</p>
          </div>
          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage("/admin/forbidden")}>เลขอั้น</p>
          </div>
          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage("/admin/report")}>รายงาน</p>
          </div>
          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage("/admin/keepAndSend")}>
              ตัดเก็บ / ตัดส่ง
            </p>
          </div>
          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage("/admin/win")}>ตรวจหวย</p>
          </div>
          <div className="drawer-item-link">
            <p onMouseDown={() => gotoPage("/admin/lotto")}>งวดหวยทั้งหมด</p>
          </div> */}