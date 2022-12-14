import Numberbet from "./numberBet";

export default function betSubmit(
  userId,
  numberLength,
  lottoDateId,
  recorder,
  numberString,
  upPrice, downPrice, subsetPrice, setErrorMessage, isFree
) {
  const numbers = [];
  if (numberLength === 1 && upPrice) {
    const number = new Numberbet(
      numberString,
      "uprun",
      upPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  if (numberLength === 1 && downPrice) {
    const number = new Numberbet(
      numberString,
      "downrun",
      downPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  if (numberLength === 2 && upPrice) {
    const number = new Numberbet(
      numberString,
      "up2",
      upPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  if (numberLength === 2 && downPrice) {
    const number = new Numberbet(
      numberString,
      "down2",
      downPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  if (numberLength === 2 && upPrice && subsetPrice) {
    const subset = numberString.split("").reverse().join("");
    const number = new Numberbet(
      subset,
      "up2",
      subsetPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  if (numberLength === 2 && downPrice && subsetPrice) {
    const subset = numberString.split("").reverse().join("");
    const number = new Numberbet(
      subset,
      "down2",
      subsetPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  if (numberLength === 3 && upPrice) {
    const number = new Numberbet(
      numberString,
      "up3",
      upPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  if (numberLength === 3 && downPrice) {
    const number = new Numberbet(
      numberString,
      "down3",
      downPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }
  //???????????????????????????????????????????????????????????? ?????????????????????????????? 3 ???????????????
  if (numberLength === 3 && subsetPrice) {
    const numberArr = numberString
      .split("")
      .sort((a, b) => a - b)
      .join("");
    const number = new Numberbet(
      numberArr,
      "set3up",
      subsetPrice,
      userId,
      lottoDateId,
      recorder, isFree
    );
    numbers.push(number);
  }

  if (numbers.length === 0) {
    setErrorMessage("???????????????????????????????????????????????????????????????????????????");
    return;
  }
  return numbers
}
