import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { postWin, getWinByLottoDateId } from "../../../lib/clientRequest/win";
import { checkNumberInput } from "../../../lib/helper";

export default function ContentModalPost({ setShowModal, lottoCurrent }) {
  const [first, setFirst] = useState("");
  const [last2, setLast2] = useState("");
  const [first3_1, setFirst3_1] = useState("");
  const [first3_2, setFirst3_2] = useState("");
  const [last3_1, setLast3_1] = useState("");
  const [last3_2, setLast3_2] = useState("");

  const queryClient = useQueryClient();
  const postMutation = useMutation(postWin, {
    onSuccess: () => {
      queryClient.prefetchQuery(
        ["getWinByLottoDateId", lottoCurrent._id],
        getWinByLottoDateId
      );
      setShowModal(false);
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      date: lottoCurrent._id,
      first, first3_1, first3_2, last3_1, last3_2, last2
    }
    // console.log(payload);
    postMutation.mutate(payload);
  };

  return (
    <div>
      <form 
      onSubmit={onSubmitHandler}
      >
        
        <div className="my-3 flex justify-center gap-10">
          <div>
            <div className="text-center">รางวัลที่1</div>
            <Input id={'first'} length={6} value={first} setValue={setFirst} focus={true} />
          </div>
          <div>
            <div className="text-center">เลขท้าย2ตัว</div>
            <Input id={'last2'} length={2} value={last2} setValue={setLast2} />
          </div>
        </div>

        <div className="flex justify-center gap-5">
          <div>
            <div className="text-center">เลขหน้า3ตัว</div>
            <div className="flex gap-5">
              <Input id={'first3_1'} length={3} value={first3_1} setValue={setFirst3_1} />
              <Input id={'first3_2'} length={3} value={first3_2} setValue={setFirst3_2} />
            </div>
          </div>
          <div>
            <div className="text-center">เลขท้าย3ตัว</div>
            <div className="flex gap-5">
              <Input id={'last3_1'} length={3} value={last3_1} setValue={setLast3_1} />
              <Input id={'last3_2'} length={3} value={last3_2} setValue={setLast3_2} />
            </div>
          </div>
          
          
        </div>
        <div className="my-5 flex justify-center gap-5">
          <button
            type="submit"
            className="border border-green-300 bg-green-300 w-20 rounded-md hover:border-green-400 hover:bg-green-400"
          >
            บันทึก
          </button>
          <button
            type="button"
            className="border border-red-300 bg-red-300 w-20 rounded-md hover:border-red-400 hover:bg-red-400"
            onClick={() => setShowModal(false)}
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}

export const Input = ({id, length, focus = false, value, setValue }) => {
  return (
    <input
      type={"text"}
      id={id}
      className=" block mx-auto w-16 border border-pink-300 text-center rounded-md outline-pink-400"
      pattern="[0-9]*"
      inputMode="numeric"
      required
      maxLength={length}
      minLength={length}
      autoFocus={focus}
      value={value}
      onChange={(e) => checkNumberInput(e, length, setValue)}
    />
  );
};
