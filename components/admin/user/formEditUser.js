import React, { useState } from "react";
import {
  getUsersWithTotalBetByLottoDateId,
  putUser
} from "../../../lib/clientRequest/user";
import { useQueryClient, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { closeFormEditUser } from "../../../redux/userSlice";
// import { getLottoCurrent } from "../../../lib/helper";

export default function FormEditUser({ user, lottoCurrent }) {
  // console.log(userId);
  // const lottoCurrent = getLottoCurrent();
  const [nickname, setNickname] = useState(user.nickname);
  const [discount, setDiscount] = useState(user.discount);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [credit, setCredit] = useState(user.credit)
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkForCreateLoginAccount, setCheckForCreateLoginAccount] =
    useState(false);

  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const putMutation = useMutation(putUser, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        setErrorMessage(response.data.message);
      } else {
        dispatch(closeFormEditUser())
        setNickname('')
        setDiscount(0)
        setUsername('')
        setPassword('')
        setCredit('')
        setCheckForCreateLoginAccount(false)
        queryClient.prefetchQuery(["getUsersWithTotalBetByLottoDateId", lottoCurrent._id],
        getUsersWithTotalBetByLottoDateId);
      }
    },
  });

  const onSumitHandler = async (e) => {
    e.preventDefault();
    const payload = checkForCreateLoginAccount
      ? { nickname, discount, username, password, _id: user._id, credit, lottoDateId: lottoCurrent._id }
      : { nickname, discount, _id: user._id, lottoDateId: lottoCurrent._id };
    putMutation.mutate(payload);
  };

  const onChangeCheckBox = () => {
    setCheckForCreateLoginAccount(prev => !prev);
    setUsername("")
    setPassword("")
    
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-96 bg-white p-5 border-2 border-green-300 rounded-md">
      <form className="w-full" onSubmit={onSumitHandler}>
        <fieldset>
          <legend className="text-center">แก้ไขลูกค้า</legend>
          {errorMessage && (
            <p className="text-red-500 text-center underline capitalize">
              {errorMessage}
            </p>
          )}
          <div>
            <label htmlFor="name">ชื่อ: </label>
            <input
              type={"text"}
              id="name"
              value={nickname}
              required
              onChange={(e) => setNickname(e.target.value)}
              className="input-formCreateCustomer"
            />
          </div>

          
          <div className="flex gap-2">
            <div>
              <label htmlFor="discount">ส่วนลด: </label>
              <input
                type={"number"}
                id="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="input-formCreateCustomer"
              />
            </div>
            <div>
            <label htmlFor="username">เครดิต: </label>
            <input
              type={"Number"}
              id="username"
              value={credit}
              required={checkForCreateLoginAccount}
              onChange={(e) => setCredit(e.target.value)}
              disabled={!checkForCreateLoginAccount}
              className="input-formCreateCustomer"
            />
          </div>
          </div>

          

          <div className="flex items-center my-4">
            <input
              type={"checkbox"}
              checked={checkForCreateLoginAccount}
              onChange={onChangeCheckBox}
              id="checkForCreateLoginAccount"
              className="accent-green-400 mr-3"
            />
            <label htmlFor="checkForCreateLoginAccount">
              อณุญาติให้ลูกค้าเข้าสู่ระบบ หรือแก้ไขรหัสผ่าน
            </label>
          </div>
          <div>
            <label htmlFor="username">ชื่อบัญชี: </label>
            <input
              type={"text"}
              id="username"
              value={username}
              required={checkForCreateLoginAccount}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!checkForCreateLoginAccount}
              className="input-formCreateCustomer"
            />
          </div>
          <div>
            <label htmlFor="password">รหัสผ่าน: </label>
            <input
              type={"text"}
              id="password"
              value={password}
              required={checkForCreateLoginAccount}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!checkForCreateLoginAccount}
              className="input-formCreateCustomer"
            />
          </div>
          
          <div className="flex gap-5 justify-center">
            <button
              type="submit"
              className="border border-green-400 bg-green-400 text-white w-full py-2 mt-4 cursor-pointer rounded-md hover:bg-green-300 hover:border-green-300 hover:text-green-400"
            >
              แก้ไขลูกค้า
            </button>
            <button type="button"
              className="border border-red-400 bg-red-400 text-white w-full py-2 mt-4 cursor-pointer rounded-md hover:bg-red-300 hover:border-red-300 hover:text-green-400"
              onClick={()=>dispatch(closeFormEditUser())}
            >ยกเลิก</button>
          </div>

          
        </fieldset>
      </form>
    </div>
  );
}
