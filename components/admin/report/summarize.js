// สรุปรวมตัวเลขแต่ละตัวพร้อมราคา
import React, { useEffect, useState } from "react";
import NumberTable from "./numberTable";
import CheckboxType from "./checkboxType";
// import { selectByTypeForReport, selectByTypeForUser } from "../../../lib/helper";

export default function Summarize({ data }) {
  // const [up3, setUp3] = useState([]);
  // const [set3up, setSet3up] = useState([]);
  // const [down3, setDown3] = useState([]);
  // const [up2, setUp2] = useState([]);
  // const [down2, setDown2] = useState([]);
  // const [uprun, setUprun] = useState([]);
  // const [downrun, setDownrun] = useState([]);
  const [showUp3, setShowUp3] = useState(false);
  const [showDown3, setShowDown3] = useState(false);
  const [showSet3up, setShowSet3up] = useState(false);
  const [showUp2, setShowUp2] = useState(false);
  const [showDown2, setShowDown2] = useState(false);
  const [showUprun, setShowUprun] = useState(false);
  const [showDownrun, setShowDownrun] = useState(false);

  // useEffect(() => {
  //   // console.log(page)
  //   if(page === 'report'){
  //     setUp3(selectByTypeForReport(data, "up3"));
  //     setSet3up(selectByTypeForReport(data, "set3up"));
  //     setDown3(selectByTypeForReport(data, "down3"));
  //     setUp2(selectByTypeForReport(data, "up2"));
  //     setDown2(selectByTypeForReport(data, "down2"));
  //     setUprun(selectByTypeForReport(data, "uprun"));
  //     setDownrun(selectByTypeForReport(data, "downrun"));
  //   }
  //   if(page === 'user'){
  //     setUp3(selectByTypeForUser(data, "up3"));
  //     setSet3up(selectByTypeForUser(data, "set3up"));
  //     setDown3(selectByTypeForUser(data, "down3"));
  //     setUp2(selectByTypeForUser(data, "up2"));
  //     setDown2(selectByTypeForUser(data, "down2"));
  //     setUprun(selectByTypeForUser(data, "uprun"));
  //     setDownrun(selectByTypeForUser(data, "downrun"));
  //   }
    
  // }, [data]);

  // useEffect(() => {
  //   // if(page === 'user'){
  //     setShowUp3(up3.length !== 0 ? true : false)
  //     setShowDown3(down3.length !== 0 ? true : false)
  //     setShowSet3up(set3up.length !== 0 ? true : false)
  //     setShowUp2(up2.length !== 0 ? true : false)
  //     setShowDown2(down2.length !== 0 ? true : false)
  //     setShowUprun(uprun.length !== 0 ? true : false)
  //     setShowDownrun(downrun.length !== 0 ? true : false)
  //   // }
  // }, [up3, set3up, down3, up2, down2, uprun, downrun ])

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
