import React, { useState } from "react";
import RadioNumberLength from "../bet/radioNumberLength";
import RadioForbiddenType from "./radioForbiddenType";
import { checkNumberInput } from "../../../lib/helper";
import { postForbidden, getForbiddenByLottoDateId } from "../../../lib/clientRequest/forbidden";
import { useQueryClient, useMutation } from "react-query";
import { getLottoCurrent } from "../../../lib/helper";

export default function FormCreateForbiddenNumber() {

  const lottoCurrent = getLottoCurrent()
  const [numberLength, setNumberLength] = useState(2);
  const [numberString, setNumberString] = useState("");
  const [type, setType] = useState("A");
  const [errorMessage, setErrorMessage] = useState('')
  
  const queryClient =  useQueryClient()
  const postMutation = useMutation(postForbidden, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage('')
        setNumberString('')
        queryClient.prefetchQuery(["getForbiddenByLottoDateId", lottoCurrent._id], getForbiddenByLottoDateId);
      }
    },
  })

  const onChangeRadioNumberBtn = (e) => {
    setNumberLength(e.target.value);
  };

  const onChangeRadioTypeBtn = (e) => {
    setType(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const payload = {
      type,
      numberString,
      date: lottoDateId
    }
    // console.log({type, numberString})
    postMutation.mutate(payload)
  }

  return (
    <div className="text-center">
        <form onSubmit={onSubmitHandler} className="border border-green-400 inline-block my-5 p-5 rounded-md">
          <div className="flex flex-row gap-5 justify-center">
            <div className="border border-pink-300 px-5 py-3 rounded-md text-left">
              <RadioNumberLength onChangeRadioBtn={onChangeRadioNumberBtn} />
            </div>
            <div className="border border-pink-300 px-5 py-3 rounded-md text-left">
              <RadioForbiddenType onChangeRadioBtn={onChangeRadioTypeBtn} numberLength={numberLength} />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center mt-5 gap-5">
            <div>
              <label htmlFor="numberString">เลข: </label>
              <input
                id="numberString"
                className="border border-pink-300 rounded-md outline-pink-400 text-center w-20 text-2xl py-1 px-3"
                type={"String"}
                pattern="[0-9]*"
                inputMode="numeric"
                required
                value={numberString}
                minLength={numberLength}
                maxLength={numberLength}
                onChange={(e) =>
                  checkNumberInput(e, numberLength, setNumberString)
                }
              />
            </div>
            <button type="submit"
              className="border border-green-400 bg-green-300 hover:border-green-400 hover:bg-green-400 rounded-md py-2 px-10">
              บันทึก
            </button>
          </div>
        </form>
      </div>
  )
}
