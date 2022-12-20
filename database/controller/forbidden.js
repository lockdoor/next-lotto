import connectDB from "../connectDB";
import Forbidden from "../../model/forbidden";
import Bet from "../../model/bet";
import Lotto from "../../model/lotto";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function postForbidden(req, res) {
  console.log("postForbidden work, ", req.body);
  try {
    await connectDB();
    const lotto = await Lotto.findById(req.body.date);
    if (!lotto.isOpen) {
      responseError(res, 400, "postForbidden error lotto not open");
      return
    }
    const { type, numberString, date } = req.body;
    const forbidden = await Forbidden.findOne({ type, numberString, date });
    if (forbidden) {
      responseError(res, 400, "postForbidden is already");
      return;
    }
    const result = await Forbidden.create(req.body);
    console.log(result);
    responseSuccess(res, 201, "Forbidden create success");   
  } catch (error) {
    console.log("error by catch controller postForbidden", error);
    responseError(res, 400, "error by catch controller postForbidden");
  }
}

export async function putForbidden(req, res) {
  console.log("putForbidden work, ", req.body);
  try {
    const { numberString, _id, date } = req.body;
    await connectDB();
    
    const lotto = await Lotto.findById(date);
    if (lotto.isOpen) {
      
      const forbidden = await Forbidden.findOne({ _id, numberString });
      if (forbidden) {
        responseError(res, 400, "Forbidden is already");
        return;
      }
      const result = await Forbidden.updateOne({_id}, {numberString});
      // console.log(result);
      responseSuccess(res, 201, "putForbidden update success");
    } else {
      responseError(res, 400, "putForbidden error lotto not open");
    }
  } catch (error) {
    console.log("error by catch controller putForbidden", error);
    responseError(res, 400, "error by catch controller putForbidden");
  }
}

export async function deleteForbidden(req, res) {
  console.log("DeleteForbidden work, ", req.body);
  try {
    await connectDB();
    const lotto = await Lotto.findById(req.body.date);
    if (lotto.isOpen) {
      const { _id } = req.body;
      const result = await Forbidden.deleteOne({_id});
      console.log(result);
      responseSuccess(res, 201, "DeleteForbidden update success");
    } else {
      responseError(res, 400, "DeleteForbidden error lotto not open");
    }
  } catch (error) {
    console.log("error by catch controller DeleteForbidden", error);
    responseError(res, 400, "error by catch controller DeleteForbidden");
  }
}

export async function getForbiddensByLottoDateId(req, res) {
  console.log("getForBiddensByLottoDateId work, ", req.query);
  const { lottoDateId } = req.query;
  if (!lottoDateId || lottoDateId === "undefined") {
    responseError(res, 400, "required lottoDateId");
    return;
  }
  try {
    await connectDB();
    const result = await Forbidden.find({ date: lottoDateId });
    // console.log(result)
    // responseSuccess(res, 201, 'create success')
    res.status(200).json(result);
  } catch (error) {
    console.log("error by catch controller getForbiddensByLottoDateId", error);
    responseError(
      res,
      400,
      "error by catch controller getForbiddensByLottoDateId"
    );
  }
}

export async function getBetByForbiddenNumber(req, res) {
  const { forbiddenId } = req.query;

  try {
    await connectDB();
    let filter = [];
    const forbidden = await Forbidden.findOne({ _id: forbiddenId });
    // console.log('date is ', forbidden.date.toString())
    // console.log(forbidden.numberString.length)
    if (forbidden.numberString.length === 2) {
      const reverse = forbidden.numberString[1].concat(
        forbidden.numberString[0]
      );
      filter.push(forbidden.numberString);
      filter.push(reverse);
    } else if (forbidden.numberString.length === 3) {
      const arr = [
        [0, 1, 2],
        [1, 2, 0],
        [2, 0, 1],
        [0, 2, 1],
        [2, 1, 0],
        [1, 0, 2],
      ];
      const subset = (n) => {
        let newArr = [];
        arr.forEach((e) => {
          let num = n[e[0]].concat(n[e[1]]).concat(n[e[2]]);
          newArr.push(num);
        });
        return newArr;
      };
      filter = subset(forbidden.numberString);
    } else {
      filter.push(numberString);
    }
    // console.log(filter)
    const result = await Bet.find({
      numberString: { $in: filter },
      date: forbidden.date,
    }).populate({ path: "user", select: "nickname" });
    // console.log('result is ', result)

    // responseSuccess(res, 201, 'create success')
    res.status(200).json(result);
  } catch (error) {
    console.log("error by catch controller getBetByForbiddenNumber", error);
    responseError(
      res,
      400,
      "error by catch controller getBetByForbiddenNumber"
    );
  }
}
