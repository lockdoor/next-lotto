import { useEffect } from "react";

export function useOutsideAlerter(ref, setShow) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

// export function getLottoCurrent() {
//   // return typeof window !== "undefined"
//   //   ? JSON.parse(localStorage.getItem("lottoCurrent")) 
//   //   : "";
//   return JSON.parse(localStorage.getItem("lottoCurrent")) || ''
// }

export function formatDate(dateString) {
  const option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", option);
}

export function dateToInputValue(dateString) {
  const arr = dateString.split("T");
  return arr[0];
}

export function formatDateWithTime(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear() + 543;
  const hour = date.getHours().toString();
  const minute = date.getMinutes().toString();
  const second = date.getSeconds().toString();
  const add0ifLength1 = (str) => {
    return str.length === 1 ? `0${str}` : str;
  };
  return `${add0ifLength1(day)}/${add0ifLength1(month)}/${year}-${add0ifLength1(
    hour
  )}:${add0ifLength1(minute)}:${add0ifLength1(second)}`;
}

export function translateType(type) {
  // ['up3', 'set3up', 'down3','up2', 'down2', 'uprun', 'downrun']
  switch (type) {
    case "up3":
      return "3ตัวบน";
    case "set3up":
      return "3ตัวโต๊ด";
    case "down3":
      return "3ตัวล่าง";
    case "up2":
      return "2ตัวบน";
    case "down2":
      return "2ตัวล่าง";
    case "uprun":
      return "วิ่งบน";
    case "downrun":
      return "วิ่งล่าง";
    default:
      break;
  }
}

export function checkNumberInput(e, numberLength, setNumberString) {
  // const number = e.target.value
  const regexNotNumber = /[^0-9]/g;
  const regexLastNumber = /.$/;

  if (regexNotNumber.test(e.target.value)) {
    e.target.value = e.target.value.replace(regexNotNumber, "");
    return;

    // console.log(e.target.value, `length is ${e.target.value.length}` )
  } else if (e.target.value.length > numberLength) {
    e.target.value = e.target.value.replace(regexLastNumber, "");
  } else {
    setNumberString(e.target.value);
  }
}

export function translateForbiddenType(type) {
  switch (type) {
    case "A":
      return "จ่ายครึ่ง";
    case "B":
      return "ไม่รับ";
    case "C":
      return "ตรงไม่รับโต๊ดจ่ายครึ่ง";
    default:
      break;
  }
}

export function textColorByForbiddenType(type) {
  switch (type) {
    case "A":
      return "text-purple-600";
    case "B":
      return "text-red-600";
    case "C":
      return "text-yellow-700";
    default:
      return "";
  }
}

export function isForbidden(numberString, forbidden) {
  if(!forbidden?.length || !isForbidden) return ""
  // const sortByLess = (numberStr) =>
  //   numberStr
  //     .split("")
  //     .sort((a, b) => a - b)
  //     .join("");
  // const match = forbidden.find(
  //   (e) => sortByLess(e.numberString) === sortByLess(numberString)
  // );
  const match = forbidden.find(
    (e) => e.numberString === numberString
  );
  return match ? match.type : ''
}

export function numberWithCommas(x) {
  if(!x) return x
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function ratio (type){
  switch(type){
    case 'up3': case 'down3': return 1000
    case 'set3up': return 220
    case 'up2': case 'down2': return 100
    case 'uprun': case 'downrun': return 10
    default: break
  }
}
