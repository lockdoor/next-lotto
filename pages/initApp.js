/* 
  การเริ่มต้นแอพจะต้องมีการสร้าง user คนแรก ซึ่งจะกลายเป็น admin โดยอัตโนมัต
  หน้า init จะทำการ fetch ก่อนว่าเคยมี user ถูกสร้างหรือยัง
  ถ้ามีการสร้าง user แล้วจะทำการ redirect ไปที่หน้า login
*/

import React, { useState } from "react";
import connectDB from "../database/connectDB";
import User from "../model/user"
import { signIn } from "next-auth/react";
import { postAdmin } from "../lib/clientRequest/user";

export default function Create(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("")
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await postAdmin({ username, password, nickname });
    if (response.data.hasError) {
      setErrorMessage(response.data.message);
    }
    else {
      signIn()
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-md mx-auto px-5 flex flex-col justify-center h-screen"
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
          required
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
          required
        />
      </div>

      <div className="input-type">
        <label className="text-xl text-pink-500" htmlFor="nickname">
          ชื่อเล่น :{" "}
        </label>
        <input
          className="input-text1"
          id="nickname"
          type={"text"}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="border bg-pink-300 py-4 rounded-md mt-3 text-white text-xl hover:bg-pink-400"
      >
        สมัครสมาชิก
      </button>
    </form>
  );
}


export const getServerSideProps = async () => { 
  try{
    await connectDB()
    const user = await User.findOne()
    if(user){
      return {
        redirect: {
          permanent: false,
          destination: '/'
        },
        props: {}
      }
    }else{
      return { props: {} }
    }
  }
  catch(error){
    console.log(error)
  }
}
