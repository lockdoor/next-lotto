import React, { useState } from "react";
import { getUsers } from "../../../lib/clientRequest/user";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export default function Autocomplete({user, setUser, setUserId}) {
  const [showOption, setShowOption] = useState(false);
  const [options, setOptions] = useState([]);

  const router = useRouter();

  const { isLoading, isError, data, error } = useQuery("getUsers", getUsers);
  if (isLoading) return <div>Users is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  // console.log(data)

  const onFocusHandler = () => {
    setOptions(filter());
    setShowOption(true);
  };

  const onChangeHandler = (e) => {
    setOptions(filter(e.target.value));
    setUserId('')
    setUser(e.target.value)
  };

  const onSelectUser = (nickname, _id) =>{
    setUser(nickname)
    // console.log(_id)
    setUserId(_id)
  }

  const gotoUserPage = () => {
    router.replace("/admin/users");
  };

  const filter = (word = user) => {
    if (word !== "") {
      const regex = new RegExp(`${word}`);
      const auto = data.filter((e) => regex.test(e.nickname));
      return auto;
    } else {
      return data;
    }
  };

  return (
    <div className=" relative w-80 mx-auto mt-3">
      <input
        placeholder="เลือกลูกค้า"
        onFocus={onFocusHandler}
        onBlur={() => setShowOption(false)}
        onChange={onChangeHandler}
        value={user}
        required
        className=" w-full block mx-auto px-3 py-2 border border-green-300 rounded outline-green-400"
      />

      {showOption && (
        <ul className=" absolute w-full h-80 shadow-xl overflow-scroll">
          {options.length !== 0 ? (
            options.map((user) => (
              <li
                key={user._id}
                onMouseDown={() => onSelectUser(user.nickname, user._id)}
                className="bg-gray-50 py-2 pl-4 cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-black"
              >
                {user.nickname}
              </li>
            ))
          ) : (
            <li
              onMouseDown={gotoUserPage}
              className="bg-gray-50 py-2 pl-4 cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-black"
            >
              ไม่พบลูกค้า คลิกที่นี่เพื่อสร้างลูกค้าใหม่
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
