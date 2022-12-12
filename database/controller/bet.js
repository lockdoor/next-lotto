import connectDB from "../connectDB";
import Bet from "../../model/bet";
import { getToken } from "next-auth/jwt";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function postBet(req, res) {
  // console.log('form database controller postBet ', req.body)
  // responseSuccess(res, 200, req.body)
  const token = await getToken({ req });
  if (token.role === "admin") {
    const recorder = token._id;
    // console.log(recorder)
    // console.log(req.body)

    try {
      await connectDB();

      const result = await Bet.insertMany(req.body);
      // console.log(result)
      responseSuccess(res, 201, "create bet success");
    } catch (error) {
      // if(error.code === 11000){
      //   responseError(res, 400, "");
      // }
      // else{
      console.log("error by catch", error);
      responseError(res, 400, "error by catch");
      // }
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function getBetsLasted20(req, res) {
  // console.log('form database controller getBets ', req.body)
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Bet.find()
        .populate({path: 'date', select: 'date'})
        .populate({ path: "user", select: "nickname" })
        .populate({ path: "recorder", select: "nickname" })
        .sort({ updatedAt: -1 })
        .limit(20);
      // console.log(result)
      // responseSuccess(res, 200, 'create bet success')
      res.status(200).json(result);
    } catch (error) {
      // if(error.code === 11000){
      //   responseError(res, 400, "");
      // }
      // else{
      console.log("getBetsLasted20 error by catch", error);
      responseError(res, 400, "getBetsLasted20 error by catch");
      // }
    }
  } else {
    responseError(res, 403, "getBetsLasted20 protect api by token");
  }
}

export async function deleteBet(req, res) {
  const { _id } = req.body;
  console.log(_id);
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Bet.deleteOne({ _id });

      console.log(result);
      responseSuccess(res, 200, "delete bet success");
      // res.status(200).json(result)
    } catch (error) {
      console.log("error by catch", error);
      responseError(res, 400, "error by catch");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function putBet(req, res){
  const { _id, numberString, price } = req.body;
  console.log(_id);
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Bet.updateOne({_id: _id}, {numberString: numberString, price: price})

      console.log(result);
      responseSuccess(res, 200, "delete bet success");
      // res.status(200).json(result)
    } catch (error) {
      console.log("error by catch", error);
      responseError(res, 400, "error by catch");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

// export async function getBetByTypeAndLottoDateIdAndSumPrice(req, res){
//   // console.log(req.query)
//   const [type, date] = req.query.params
//   // console.log({type, date})
//   const token = await getToken({ req });
//   if (token.role === "admin") {
//     try {
//       await connectDB();
//       // const result = await Bet.find({date, type})
//       const result = await Bet.aggregate([
//         {$match: {
//           type, 
//           $expr: { $eq: ["$date", { $toObjectId: date }] }
//         }},
//         {
//           $group: { _id: "$numberString", total: {$sum: "$price"}}
//         },{$sort: {_id: 1}}
//       ])

//       // console.log(result);
//       // responseSuccess(res, 200, "delete bet success");
//       res.status(200).json(result)
//     } catch (error) {
//       console.log("error by catch", error);
//       responseError(res, 400, "error by catch");
//     }
//   } else {
//     responseError(res, 403, "protect api by token");
//   }
// }

