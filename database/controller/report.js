import connectDB from "../connectDB";
import Bet from "../../model/bet";
import { getToken } from "next-auth/jwt";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function getAllBetsGroupNumberTotalPrice(req, res){
  console.log("getAllBets work", req.query)
  const {lottoDateId} = req.query
  const token = await getToken({ req });
  if (token?.role === "admin") {
    try {
      await connectDB();
      // const result = await Bet.find({date: lottoDateId}).select("numberString type price");

      const result = await Bet.aggregate([
        {
          $match: {$expr: {$eq: ["$date", { $toObjectId: lottoDateId }]}}
        },
        {
          $group: {_id: {numberString: '$numberString', type: '$type'}, totalPrice: { $sum: "$price" }}
        },
        { $sort: { _id: 1 } },
      ])
      // console.log(result);
      // responseSuccess(res, 200, "delete bet success");
      res.status(200).json(result)
    } catch (error) {
      console.log("error by catch", error);
      responseError(res, 400, "error by catch");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}


export async function getNumberDetail(req, res){
  console.log("getNumberDetail work", req.query.params)
  const [date, type, numberString] = req.query.params
  const token = await getToken({ req });
  if (token?.role === "admin") {
    try {
      await connectDB();
      const result = await Bet.find({date, type, numberString}).populate({path: 'user', select: '_id nickname'}).sort({price: -1})
      .select("numberString price");

      // console.log(result);
      // responseSuccess(res, 200, "delete bet success");
      res.status(200).json(result)
    } catch (error) {
      console.log("error by catch", error);
      responseError(res, 400, "error by catch");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}