import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getConclusion } from "../../../lib/clientRequest/user";
import { translateType } from "../../../lib/helper";
import MyModal from "../../myModal";
import RadioNumberLength from "../bet/radioNumberLength";
import InputNumber from "../bet/inputNumber";
import { checkNumberInput } from "../../../lib/helper";
import betSubmit from "../../../lib/bet/betSubmit";
import { useSession } from "next-auth/react";
import {
  postFreeBet,
  putFreeBet,
  deleteFreeBet,
} from "../../../lib/clientRequest/bet";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri";

export default function Conclusion({ lottoCurrent, userCurrent }) {
  const [showModalPost, setShowModalPost] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectFreeBet, setSelectFreeBet] = useState(null);


  const { isLoading, isError, data, error } = useQuery(
    ["getConclusion", lottoCurrent._id, userCurrent._id],
    getConclusion
  );
  const onClickEditHandler = (freeBet) => {
    setSelectFreeBet(freeBet);
    setShowModalEdit(true);
  };
  if (isLoading) return <div>Win is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  if (!data) return <></>;
  // console.log(data);
  return (
    <div className="text-center">
      {/* <p>สรุปยอด</p> */}
      {/* <p>ยอดซื้อรวม : {data.totalPrice}</p> */}
      {data.discount !== 0 && (
        <div>
          <p className=" cursor-pointer">
            ส่วนลด {data.discount}% : {data.discountPrice}
            <button
              className="ml-3 bg-green-300 py-1 px-3 rounded-md hover:bg-green-500 hover:text-white"
              onClick={() => setShowModalPost(true)}
            >
              ใช้ส่วนลด
            </button>
          </p>
          <p>
            ยอดเมื่อลดแล้ว :{" "}
            {data.totalPrice -
              data.discountPrice +
              (data.freeBet
                ? data.freeBet.reduce((a, b) => a + b.price, 0)
                : 0)}
          </p>
          {data.freeBet && (
            <table className="globals-table max-w-sm">
              <thead>
                <tr>
                  <th colSpan={5} style={{ backgroundColor: "orange" }}>
                    [ ใช้ส่วนลดในการซื้อ :{" "}
                    {data.freeBet.reduce((a, b) => a + b.price, 0)} ] [คงเหลือ :{" "}
                    {data.discountPrice -
                      data.freeBet.reduce((a, b) => a + b.price, 0)}
                    ]
                  </th>
                </tr>
                <tr>
                  <th style={{ backgroundColor: "orange" }}>เลข</th>
                  <th style={{ backgroundColor: "orange" }}>ประเภท</th>
                  <th style={{ backgroundColor: "orange" }}>ราคา</th>
                  <th style={{ backgroundColor: "orange" }}>ผู้บันทึก</th>
                  <th style={{ backgroundColor: "orange" }}></th>
                </tr>
              </thead>
              <tbody>
                {data.freeBet.map((e) => (
                  <tr key={e._id}>
                    <td>{e.numberString}</td>
                    <td>{translateType(e.type)}</td>
                    <td>{e.price}</td>
                    <td>{e.recorder.nickname}</td>
                    <td>
                      <RiEdit2Line
                        className=" cursor-pointer"
                        onClick={() => onClickEditHandler(e)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {data.numberWin.length !== 0 && (
        <table className="globals-table max-w-lg ">
          <caption className="text-green-500" style={{ captionSide: "bottom" }}>
            ยอดถูกรางวัล : {data.totalWinPrice}
          </caption>
          <thead>
            <tr>
              <th colSpan="5" className="text-white">
                รายการถูกรางวัล
              </th>
            </tr>
            <tr>
              <th>เลข</th>
              <th>ประเภท</th>
              <th>ราคา</th>
              <th>ราคาจ่าย</th>
              <th>ผู้บันทึก</th>
            </tr>
          </thead>
          <tbody>
            {data.numberWin.map((e) => (
              <tr
                key={e._id}
                className={`${e.isForbidden ? "bg-rose-400" : "bg-inherit"}`}
              >
                <td>{e.numberString}</td>
                <td>{translateType(e.type)}</td>
                <td>{e.price}</td>
                <td>{e.winPrice}</td>
                <td>{e.recorder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p
        className={`text-3xl ${
          data.conclusion < 0 ? "text-green-500" : "text-red-600"
        } underline`}
      >
        สรุปยอด {data.conclusion < 0 ? "ลูกค้ารับ" : "ลูกค้าจ่าย"}{" "}
        {Math.abs(data.conclusion)}
      </p>
      <MyModal isOpen={showModalPost} setShowModal={setShowModalPost}>
        <PostFreeBet
          lottoCurrent={lottoCurrent}
          userCurrent={userCurrent}
          setShowModal={setShowModalPost}
        />
      </MyModal>
      <MyModal isOpen={showModalEdit} setShowModal={setShowModalEdit}>
        <EditFreeBet
          setShowModal={setShowModalEdit}
          freeBet={selectFreeBet}
          lottoCurrent={lottoCurrent}
          userCurrent={userCurrent}
        />
      </MyModal>
    </div>
  );
}

const EditFreeBet = ({ freeBet, setShowModal, lottoCurrent, userCurrent }) => {
  console.log(freeBet)
  const [price, setPrice] = useState(freeBet.price);

  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const putMutation = useMutation(putFreeBet, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        setErrorMessage(response.data.message);
      } else {
        queryClient.prefetchQuery(
          ["getConclusion", lottoCurrent._id, userCurrent._id],
          getConclusion
        );
        setErrorMessage("");
        setShowModal(false);
      }
    },
  });

  const deleteMutation = useMutation(deleteFreeBet, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        setErrorMessage(response.data.message);
      } else {
        queryClient.prefetchQuery(
          ["getConclusion", lottoCurrent._id, userCurrent._id],
          getConclusion
        );
        setErrorMessage("");
        setShowModal(false);
      }
    },
  });

  const onSubmitHandle = (e) => {
    e.preventDefault();
    if(parseInt(price) === freeBet.price) return
    const payload = {
      _id: freeBet._id,
      newPrice: price,
      oldPrice: freeBet.price,
      recorder: session.token._id,
      lottoDateId: lottoCurrent._id,
      userId: userCurrent._id
    }
    putMutation.mutate(payload)
  };
  const onClickDeleteHandler = (e) => {
    e.preventDefault();
    deleteMutation.mutate(freeBet._id)
  };
  return (
    <form className=" max-w-md mx-auto my-10" onSubmit={onSubmitHandle}>
      {errorMessage && <div className="text-error-message">{errorMessage}</div>}
      <div className="text-3xl">
        ต้องการแก้ไข {translateType(freeBet.type)} {freeBet.numberString}
      </div>

      <input
        type={"number"}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border border-green-300 text-center text-xl mt-5 py-1 w-28 rounded-md outline-green-500"
      />

      <div className="flex justify-center gap-3 mt-5">
        <button
          type="Submit"
          className="text-xl border bg-pink-300 px-8 py-2 rounded-md hover:bg-pink-400"
        >
          แก้ไข
        </button>
        <button
          className="text-xl border bg-red-500 px-8 py-2 rounded-md hover:bg-red-700"
          onClick={onClickDeleteHandler}
        >
          ลบ
        </button>
        <button
          className="text-xl border bg-green-300 px-8 py-2 rounded-md hover:bg-green-400"
          onClick={() => setShowModal(false)}
        >
          ยกเลิก
        </button>
      </div>
    </form>
  );
};

const PostFreeBet = ({ lottoCurrent, userCurrent, setShowModal }) => {
  const [numberLength, setNumberLength] = useState(2);
  const [numberString, setNumberString] = useState("");
  const [upPrice, setUpPrice] = useState("");
  const [downPrice, setDownPrice] = useState("");
  const [subsetPrice, setSubsetPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  const focusInput = useRef(null);

  const queryClient = useQueryClient();
  const postMutation = useMutation(postFreeBet, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        setErrorMessage(response.data.message);
      } else {
        queryClient.prefetchQuery(
          ["getConclusion", lottoCurrent._id, userCurrent._id],
          getConclusion
        );
        setErrorMessage("");
        setShowModal(false);
      }
    },
  });

  const onChangeRadioBtn = (e) => {
    setNumberLength(parseInt(e.target.value));
    setNumberString("");
    setUpPrice("");
    setDownPrice("");
    setSubsetPrice("");
  };
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const recorder = session.token._id;
    const lottoDateId = lottoCurrent._id;
    const numbers = betSubmit(
      userCurrent._id,
      numberLength,
      lottoDateId,
      recorder,
      numberString,
      upPrice,
      downPrice,
      subsetPrice,
      setErrorMessage,
      true
    );
    if (!numbers?.length) {
      setErrorMessage("กรุณากรอกข้อมูลให้ถูกต้อง");
      return;
    }
    console.log(numbers);
    postMutation.mutate(numbers);
  };
  return (
    <form className=" max-w-md mx-auto my-10" onSubmit={onSubmitHandle}>
      {errorMessage && <div className="text-error-message">{errorMessage}</div>}
      <div className="text-3xl">ใช้ส่วนลด</div>
      <div className="flex flex-row justify-around m-2 text-xl">
        <RadioNumberLength onChangeRadioBtn={onChangeRadioBtn} />
      </div>

      <InputNumber
        numberLength={numberLength}
        numberString={numberString}
        setNumberString={setNumberString}
        upPrice={upPrice}
        setUpPrice={setUpPrice}
        downPrice={downPrice}
        setDownPrice={setDownPrice}
        subsetPrice={subsetPrice}
        setSubsetPrice={setSubsetPrice}
        checkNumberInput={checkNumberInput}
        focusInput={focusInput}
      />
      <div className="flex justify-center gap-3 mt-5">
        <button
          type="Submit"
          className="text-xl border bg-green-300 px-10 py-1 rounded-md hover:bg-green-400"
        >
          บันทึก{" "}
        </button>
        <button
          className="text-xl border bg-pink-300 px-10 py-1 rounded-md hover:bg-pink-400"
          onClick={() => setShowModal(false)}
        >
          ยกเลิก
        </button>
      </div>
    </form>
  );
};
