// สรุปรวมตัวเลขแต่ละตัวพร้อมราคา
import React, { useState } from "react";
import NumberTable from "./numberTable";
import CheckboxType from "../../../components/admin/report/checkboxType";

const checked = (data, type) => {
  const hasData = data.find(a => a.type === type)
  return hasData ? true : false
}

export default function Summarize({ data }) {
  const [showUp3, setShowUp3] = useState(checked(data, "up3"));
  const [showDown3, setShowDown3] = useState(checked(data, "set3up"));
  const [showSet3up, setShowSet3up] = useState(checked(data, "down3"));
  const [showUp2, setShowUp2] = useState(checked(data, "up2"));
  const [showDown2, setShowDown2] = useState(checked(data, "down2"));
  const [showUprun, setShowUprun] = useState(checked(data, "uprun"));
  const [showDownrun, setShowDownrun] = useState(checked(data, "downrun"));

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
      <div className="md:flex md:flex-row md:gap-2">
        {showUp3 && <NumberTable type="up3" data={data}/>}
        {showSet3up && <NumberTable type="set3up" data={data}/>}
        {showDown3 && <NumberTable type="down3" data={data}/>}
        {showUp2 && <NumberTable type="up2" data={data}/>}
        {showDown2 && <NumberTable type="down2" data={data}/>}
        {showUprun && <NumberTable type="uprun" data={data}/>}
        {showDownrun && <NumberTable type="downrun" data={data}/>}
      </div>
    </>
  );
}
