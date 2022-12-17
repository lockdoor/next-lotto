import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
// import { getLottoCurrent } from "../lib/helper";

// หน้าแรกสำหรับการเข้าสู่ระบบ หากเป็นการใช้งานครั้งแรกยังไม่มี username สร้างขึ้นมาในฐานข้อมูล ให้เข้าไปที่ /create เพื่อสร้าง user คนแรกก่อน โดยการสร้างจะเป็นลูกค้าทั้งหมด ต้องเข้าไปที่ฐานข้อมูลเพื่อไปกำหนดสิทธิ์

export default function Signin() {
  
  const [lottoCurrent, setLottoCurrent] = useState(null)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    setLottoCurrent(JSON.parse(localStorage.getItem("lottoCurrent")))
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const playload = { username, password };
    const result = await signIn("credentials", {
      ...playload,
      redirect: false,
    });
    if (!result.error) {
      const session = await getSession();
      setErrorMessage(null);
      switch (session.token.role) {
        case "admin":
          lottoCurrent === null 
            ? router.replace("/admin/lotto")
            : router.replace("/admin/dashboard/");
          break;
        case "subadmin":
          router.replace("/subadmin/");
          break;
        case "customer":
          router.replace("/user/")
        default:
          router.replace("/");
          break;
      }
    } else {
      setErrorMessage(result.error);
    }
  };


  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-md mx-auto flex flex-col justify-center h-screen px-5"
    >
      <div className="wellcome-text">
        <p className="text-center text-bold text-4xl mb-10 text-pink-500">
          โปรแกรมเจ้ามือหวย
        </p>
        <p className="text-center text-bold text-3xl mb-10 text-pink-500">
          ยินดีต้อนรับ
        </p>
      </div>

      {errorMessage && (
        <p className="text-center text-red-600 capitalize underline">
          {errorMessage}
        </p>
      )}

      <div className="input-type">
        <label className="text-xl text-pink-500" htmlFor="username">
          Username :{" "}
        </label>
        <input
          className="input-text1"
          id="username"
          type={"text"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-type">
        <label className="text-xl text-pink-500" htmlFor="password">
          Password :{" "}
        </label>
        <input
          className="input-text1"
          id="password"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="border bg-pink-300 py-4 rounded-md mt-3 text-white text-xl hover:bg-pink-400"
      >
        เข้าสู่ระบบ
      </button>
    </form>
  );
}
