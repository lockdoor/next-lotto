import React, { useState, useRef, useEffect} from "react";
import Layout from "../../../components/admin/layoutAdmin";
import Autocomplete from "../../../components/admin/bet/autocomplete";
import Advice from "../../../components/admin/bet/advice";
import BetTable from "../../../components/admin/bet/betTable";
import RadioNumberLength from "../../../components/admin/bet/radioNumberLength";
import InputNumber from "../../../components/admin/bet/inputNumber";
import { checkNumberInput } from "../../../lib/helper";
import { useSession } from "next-auth/react";
import betSubmit from "../../../lib/bet/betSubmit";
import { getBetsLasted20, postBet } from "../../../lib/clientRequest/bet";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useRouter } from "next/router";
import getLottoCurrent from "../../../lib/getLottoCurrent";
import { dateToInputValue } from "../../../lib/helper";
import { getLottoById } from "../../../lib/clientRequest/lotto";


export default function Bet({lottoCurrent}) {
  const { data: session } = useSession();
  const [numberLength, setNumberLength] = useState(2);
  const [numberString, setNumberString] = useState("");
  const [upPrice, setUpPrice] = useState("");
  const [downPrice, setDownPrice] = useState("");
  const [subsetPrice, setSubsetPrice] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const focusInput = useRef(null);
  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/bet/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])

  const queryClient = useQueryClient();
  const {isLoading, isError, data, error} = useQuery(['getLottoById', lotto._id], getLottoById)


  const postMutation = useMutation(postBet, {
    onSuccess: (response) => {
      if (response.data?.hasError) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage(null);
        setNumberString("");
        setUpPrice("");
        setDownPrice("");
        setSubsetPrice("");
        focusInput.current.focus();
        queryClient.prefetchQuery("getBetsLasted20", getBetsLasted20);
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
    if (!userId) {
      setErrorMessage("กรุณาเลือกลูกค้าจากรายชื่อ");
      return;
    }
    const recorder = session.token._id;
    const lottoDateId = data._id;
    const numbers = betSubmit(
      userId,
      numberLength,
      lottoDateId,
      recorder,
      numberString,
      upPrice,
      downPrice,
      subsetPrice,
      setErrorMessage     
    );
    if (!numbers?.length) {
      setErrorMessage("กรุณากรอกข้อมูลให้ถูกต้อง");
      return;
    }
    console.log(numbers);
    postMutation.mutate(numbers);
  };

  if (isLoading) return <div>Bet is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  console.log(data)
  return (
    <Layout title={"คีย์หวย"} lottoCurrent={data}>
      {data.isOpen ? (
        <main className="px-2">
          <div className="flex flex-col  xl:flex-row justify-around">
            {/* form */}

            <form onSubmit={onSubmitHandle} className="flex-1">
              {errorMessage && (
                <p className="text-center text-red-500">{errorMessage}</p>
              )}
              <Autocomplete
                setUser={setUser}
                user={user}
                setUserId={setUserId}
                // errorMessage={errorMessage}
              />

              {/* radio button */}
              <div className="flex flex-row justify-around m-2 text-xl">
                <RadioNumberLength onChangeRadioBtn={onChangeRadioBtn} />
              </div>

              {/* input number */}
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

              <button
                type="Submit"
                className="block mx-auto my-3 text-xl border bg-pink-300 px-16 py-2 rounded-md hover:bg-pink-400"
              >
                บันทึก{" "}
              </button>

              <Advice />
            </form>

            {/* table */}
            <BetTable lottoCurrent={data}/>
          </div>
        </main>
      ) : (
        <div className="text-center">หวยงวดนี้ทำการปิดแล้ว</div>
      )}
    </Layout>
  );
}

export const getServerSideProps = async (context) => getLottoCurrent(context)
