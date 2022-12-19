import React from "react";
import { useQuery } from "react-query";
import { getUserRange } from "../../../lib/clientRequest/dashboard";

export default function UserRange({ lottoCurrent }) {
  const { isLoading, isError, error, data } = useQuery(
    ["getUserRange", lottoCurrent?._id],
    getUserRange
  );
  if (isLoading) return <div>Forbidden is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  // console.log(data)
  return (
    <div className="w-full border-4 border-green-300 rounded-md p-5 my-5 bg-white text-center">
      <div className="text-dashboard-header1">ลูกค้าซื้อมากสุด</div>
      <div className="text-center">
        <ol className="list-decimal inline-block text-start">
          {data.bet.map((user) => (
            <li key={user._id.nickname}>
              <span>{user._id.nickname}</span>
              <span>{" = "}</span>
              <span className="text-blue-600">{user.totalPrice}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
