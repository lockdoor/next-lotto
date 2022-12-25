import React, { useState } from "react";
import { getUsersWithTotalBetByLottoDateId } from "../../../lib/clientRequest/user";
import { useQuery } from "react-query";
import { FaChessKnight, FaChessQueen, FaChessPawn } from "react-icons/fa";
import Link from "next/link";
import { RiEdit2Line } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleFormEditUser, selectUser } from "../../../redux/userSlice";
import Payment from "./payment";
import { numberWithCommas } from "../../../lib/helper";

export default function UsersTable({ lottoCurrent }) {
  const [userData, setUserData] = useState(null);
  const [userSearch, setUserSearch] = useState("");
  const { isLoading, isError, data, error } = useQuery(
    ["getUsersWithTotalBetByLottoDateId", lottoCurrent._id],
    getUsersWithTotalBetByLottoDateId,
    {
      onSuccess: (response) => {
        setUserData(response);
      },
    }
  );

  const onChangeUserSearch = (e) => {
    if (e.target.value === "") {
      setUserData(data);
    } else {
      const userFilter = userData.filter((user) =>
        user.nickname.includes(e.target.value)
      );
      setUserData(userFilter);
    }
    setUserSearch(e.target.value);
  };

  if (isLoading) return <div>Users is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  // console.log(data)

  return (
    <>
      <div className="text-center my-5">
        <input
          type={"text"}
          placeholder="ค้นหาลูกค้า"
          value={userSearch}
          onChange={onChangeUserSearch}
          className="border border-green-300 rounded-md text-center outline-green-400"
        />
        <MdPersonSearch className="inline text-2xl ml-3 " />
      </div>
      <div className=" grid md:grid-cols-2 xl:grid-cols-3 gap-2 mt-5">
        {userData?.length ? (
          userData.map((data, index) => {
            return (
              <Card data={data} key={index} lottoDateId={lottoCurrent._id} />
            );
          })
        ) : (
          <div>ไม่พบลูกค้า</div>
        )}
      </div>
    </>
  );
}

function Card({ data, lottoDateId }) {
  const { nickname, discount, role, username, total, _id, payment } = data;
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();
  const onClickEditHandler = () => {
    dispatch(selectUser(data));
    dispatch(toggleFormEditUser());
  };

  return (
    <div className={`border-2 ${
      total === 0 
        ? 'border-gray-300 text-gray-300'
        : payment?.isFinish 
          ? 'border-green-300 text-green-500' 
          : 'border-pink-300 text-pink-500'} 
        bg-white px-5 py-5 mx-3 rounded-md`} >
      {errorMessage && <div className="text-error-message">{errorMessage}</div>}
      <div className=" min-[500px]:flex">
        <div className="flex-1">
          <Name onClickEditHandler={onClickEditHandler} {...data} />
          <Total {...data} lottoDateId={lottoDateId} />
        </div>
        <div className="flex-1">
          {!(discount === 0 || !discount) && (
            <p>
              ส่วนลด: {discount}% ={" "}
              {numberWithCommas(total - (total * discount) / 100)}
            </p>
          )}
          <div>
            <span className="">ยอดชำระ: </span>
            <Payment userData={data} lottoDateId={lottoDateId} setErrorMessage={setErrorMessage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const Name = ({ onClickEditHandler, role, nickname, username }) => {
  return (
    <p>
      <span>
        {role === "admin" ? (
          <FaChessQueen className="inline" color="red" />
        ) : role === "subadmin" ? (
          <FaChessKnight className="inline" color="blue" />
        ) : username ? (
          <FaChessPawn className="inline" color="green" />
        ) : (
          "ชื่อ"
        )}
      </span>
      {" : " + nickname + " "}
      <RiEdit2Line
        className="inline cursor-pointer"
        onClick={onClickEditHandler}
      />
    </p>
  );
};

const Total = ({ lottoDateId, total, _id }) => {
  return (
    <p>
      ยอดรวม:{" "}
      {total != 0 ? (
        <Link href={`../user/betDetail/${lottoDateId}/${_id}`} prefetch={false}>
          <span>{numberWithCommas(total)}</span>
        </Link>
      ) : (
        <span>{total}</span>
      )}
    </p>
  );
};
