import React, { useState } from "react";
import { getUsersWithTotalBetByLottoDateId } from "../../../lib/clientRequest/user";
import { useQuery } from "react-query";
import { FaChessKnight, FaChessQueen, FaChessPawn } from "react-icons/fa";
import Link from "next/link";
import { getLottoCurrent } from "../../../lib/helper";
import { RiEdit2Line } from "react-icons/ri";
import { MdPersonSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toggleFormEditUser, selectUser } from "../../../redux/userSlice";


export default function UsersTable() {
  const lottoCurrent = getLottoCurrent();
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

  // console.log(data);

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
  const {nickname, discount, role, username, total, _id} = data
  const dispatch = useDispatch();
  const onClickEditHandler = () => {
    // console.log('edit ', _id)
    dispatch(selectUser(data));
    dispatch(toggleFormEditUser());
  }

  return (
    <div className=" border-2 border-pink-300 bg-white px-10 py-5 mx-3 rounded-md">
      <div className="flex flex-row justify-between">
        <p
          onClick={onClickEditHandler}
          className="cursor-pointer"
        >
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
          <RiEdit2Line className="inline" />
        </p>
        {/* <p>ส่วนลด: {discount}</p> */}
      </div>

      <div className="flex flex-row justify-between">
        <p>
          ยอดรวม:{" "}
          {total != 0 ? (
            <Link
              href={`../admin/user/betDetail/${lottoDateId}/${_id}/${nickname}`}
              prefetch={false}
            >
              <span className="text-green-600">{total}</span>
            </Link>
          ) : (
            <span className="text-red-600">{total}</span>
          )}
        </p>
      </div>
    </div>
  );
}
