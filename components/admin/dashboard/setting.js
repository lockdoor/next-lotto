import React, { useState, useEffect } from "react";
import { putLottoSettings } from "../../../lib/clientRequest/dashboard";

export default function Setting({ lottoCurrent }) {
  const [isOpen, setIsOpen] = useState("");
  const [userBet, setUserBet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const lottoCurrent = JSON.parse(localStorage.getItem("lottoCurrent"));
    setIsOpen(lottoCurrent.isOpen);
    setUserBet(lottoCurrent.userBet);
  }, []);

  const onChangeSwitch = async (feature) => {
    const payload =
      feature === "isOpen"
        ? { isOpen: !isOpen, userBet, _id: lottoCurrent._id }
        : { isOpen: isOpen, userBet: !userBet, _id: lottoCurrent._id };
    const response = await putLottoSettings(payload);
    if (response?.data?.hasError) {
      setErrorMessage(response.data.message);
    } else {
      localStorage.setItem("lottoCurrent", JSON.stringify(response));
      setErrorMessage("");
      setIsOpen(response.isOpen);
      setUserBet(response.userBet);
    }
  };

  return (
    <div className="border-4 border-green-300 w-full my-5 p-5 rounded-md bg-white text-center">
      <div className="text-dashboard-header1">ตั้งค่า</div>
      {errorMessage && <div>{errorMessage}</div>}
      {/* <div className="inline-block text-start" > */}
      <div className="md:relative inline-block md:translate-y-1/2 text-start" >
        <ToggleSwitch
          checked={isOpen}
          setChecked={() => onChangeSwitch("isOpen")}
          title={"เปิดใช้งาน"}
        />
        <ToggleSwitch
          checked={userBet}
          setChecked={() => onChangeSwitch("userBet")}
          title={"เปิดให้ลูกค้าซื้อ"}
        />
      </div>
    </div>
  );
}

const ToggleSwitch = ({ checked, setChecked, title }) => {
  return (
    <div >
      <label
        htmlFor={title}
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          id={title}
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span
          className={`ml-3 text-sm font-medium ${
            checked ? "text-gray-900" : "text-gray-300"
          }`}
        >
          {title}
        </span>
      </label>
    </div>
  );
};

/*
https://flowbite.com/docs/forms/toggle/
<label class="inline-flex relative items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer" checked>
  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Checked toggle</span>
</label>
*/
