import connectDB from "../connectDB";
import Win from "../../model/win";
import Bet from "../../model/bet";
import { getToken } from "next-auth/jwt";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function getWinByLottoDateId(req, res) {
  console.log("database controller getWinByLottoDateId worked ", req.query);
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      const { lottoDateId } = req.query;
      await connectDB();
      const win = await Win.findOne({ date: lottoDateId });
      // console.log(lotto)
      res.status(200).json(win);
    } catch (error) {
      console.log("error by catch controller getWinByLottoDateId", error);
      responseError(res, 400, "error by catch controller getWinByLottoDateId");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function postWin(req, res) {
  console.log("database controller postWin worked ");
  console.log(req.body);

  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      // const {lottoDateId} = req.query
      await connectDB();
      const win = await Win.create(req.body);
      // console.log(lotto)
      responseSuccess(res, 201, "create win success");
      // res.status(200).json(win)
    } catch (error) {
      console.log("error by catch controller postWin", error);
      responseError(res, 400, "error by catch controller postWin");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function getWinnerByLottoDateIdAndTypeAndNumberString(req, res) {
  console.log(
    "database controller getWinnerByLottoDateIdAndTypeAndNumberString worked ",
    req.query.params
  );

  let [ date, type, number ] = req.query.params;
  let numArr = [number]
  if(type === 'down3') numArr = number.match(/.{1,3}/g)
  if(type === 'uprun' || type === 'downrun') numArr = number.match(/.{1,1}/g)
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Bet.find({date, type, numberString: {$in: numArr} })
        .populate({ path: "user", select: "_id nickname" })
        .sort({ price: -1 })
        .select("numberString price date")
      // console.log(result);
      res.status(200).json(result);
    } catch (error) {
      console.log(
        "error by catch controller getWinnerByLottoDateIdAndTypeAndNumberString",
        error
      );
      responseError(
        res,
        400,
        `error by catch controller getWinnerByLottoDateIdAndTypeAndNumberString ${error}`
      );
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}