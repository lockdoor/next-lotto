// สรุปรวมตัวเลขแต่ละตัวพร้อมราคา
import React, { useEffect, useState } from "react";
import NumberTable from "./numberTable";
import CheckboxType from "./checkboxType";

export default function Summarize({ data, lottoCurrent }) {
  const [showUp3, setShowUp3] = useState(true);
  const [showDown3, setShowDown3] = useState(true);
  const [showSet3up, setShowSet3up] = useState(true);
  const [showUp2, setShowUp2] = useState(true);
  const [showDown2, setShowDown2] = useState(true);
  const [showUprun, setShowUprun] = useState(true);
  const [showDownrun, setShowDownrun] = useState(true);

  // console.log(data)

  return (
    <>
      <div className="flex flex-row justify-around flex-wrap px-5 py-3 mx-3 gap-3 border border-green-300 rounded-md">
        <CheckboxType type="up3" checked={showUp3} setChecked={setShowUp3} />
        <CheckboxType type="set3up" checked={showSet3up} setChecked={setShowSet3up} />
        <CheckboxType type="down3" checked={showDown3} setChecked={setShowDown3} />
        <CheckboxType type="up2" checked={showUp2} setChecked={setShowUp2} />
        <CheckboxType type="down2" checked={showDown2} setChecked={setShowDown2} />
        <CheckboxType type="uprun" checked={showUprun} setChecked={setShowUprun} />
        <CheckboxType type="downrun" checked={showDownrun} setChecked={setShowDownrun} />
      </div>
      <div className="md:flex md:flex-row md:gap-2 px-5">
        {showUp3 && <NumberTable type="up3" data={data} lottoCurrent={lottoCurrent}/>}
        {showSet3up && <NumberTable type="set3up" data={data} lottoCurrent={lottoCurrent}/>}
        {showDown3 && <NumberTable type="down3" data={data} lottoCurrent={lottoCurrent}/>}
        {showUp2 && <NumberTable type="up2" data={data} lottoCurrent={lottoCurrent}/>}
        {showDown2 && <NumberTable type="down2" data={data} lottoCurrent={lottoCurrent}/>}
        {showUprun && <NumberTable type="uprun" data={data} lottoCurrent={lottoCurrent}/>}
        {showDownrun && <NumberTable type="downrun" data={data} lottoCurrent={lottoCurrent}/>}
      </div>
    </>
  );
}
