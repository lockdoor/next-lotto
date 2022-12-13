import React from "react";

export default function WinTable({ data }) {
  return (
    <div className="my-5 w-60 mx-auto grid grid-cols-2 gap-3 border-2 border-green-300 p-3 rounded-md">
      <div>
        <div className="text-center">รางวัลที่1</div>
        <div className="text-center text-red-500">{data.first}</div>
      </div>
      <div>
        <div className="text-center">เลขท้าย2ตัว</div>
        <div className="text-center text-red-500">{data.last2}</div>
      </div>

      <hr className="border border-green-300" />
      <hr className="border border-green-300" />

      <div>
        <div className="text-center">เลขหน้า3ตัว</div>
        <div className="flex justify-center  gap-5">
          <div className="text-center text-red-500">{data.first3_1}</div>
          <div className="text-center text-red-500">{data.first3_2}</div>
        </div>
      </div>
      <div>
        <div className="text-center">เลขท้าย3ตัว</div>
        <div className="flex justify-center gap-5">
          <div className="text-center text-red-500">{data.last3_1}</div>
          <div className="text-center text-red-500">{data.last3_2}</div>
        </div>
      </div>
    </div>
  );
}
