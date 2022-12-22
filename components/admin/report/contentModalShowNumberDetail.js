import React from "react";
import { useQuery } from "react-query";
import { getNumberDetail } from "../../../lib/clientRequest/report";
import { translateType} from "../../../lib/helper";
import Link from "next/link";

export default function ContentModalShowNumberDetail({bet, lottoCurrent}) {
  // const lottoCurrent = getLottoCurrent()
  const { isLoading, isError, data, error } = useQuery(
    ["getNumberDetail", lottoCurrent._id, bet._id.type, bet._id.numberString],
    getNumberDetail
  );
  
  // console.log(data)
  return (
    <>
      {isLoading && <div>Bets is Loading</div>}
      {isError && <div>Got Error {error}</div>}
      {data?.length && (
        <>
          <p className="text-center text-xl text-blue-500">
            {translateType(bet._id.type)} {bet._id.numberString}
          </p>
          <p className="text-center text-xl text-blue-500">
            ราคารวม {bet.totalPrice}
          </p>
          <hr className="my-5 mx-20 border-pink-300" />
          <div className=" w-2/3 mx-auto">
            {data.map((e, i) => (
              <div key={i} className="flex flex-row justify-between">
                <span>
                  <Link href={`../user/betDetail/${lottoCurrent._id}/${e.user._id}`}>
                    {e.user.nickname}
                  </Link>
                </span>
                <span>=</span>
                <span>{e.price}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
