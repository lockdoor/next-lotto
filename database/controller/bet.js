import connectDB from "../connectDB";
import Bet from "../../model/bet";
import Lotto from "../../model/lotto"
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function postBet(req, res) {
  console.log('form database controller postBet ', req.body)
  
    try {
      const lottoDataId = req.body[0].date

      await connectDB();
      const lotto = await Lotto.findById(lottoDataId)
      if(lotto.isOpen){
        // console.log(lotto)
        const result = await Bet.insertMany(req.body);
        // console.log(result)
        responseSuccess(res, 201, "create bet success");
      }
      else {
        responseError(res, 400, "postBet error lotto not open");
      }
      
    } catch (error) {
      console.log("postBet error by catch", error);
      responseError(res, 400, "postBet error by catch");
    }
  
}

export async function getBetsLasted20(req, res) {
  console.log('form database controller getBetsLasted20 ')
    try {
      await connectDB();
      const result = await Bet.find()
        .populate({ path: "date", select: "date" }) 
        .populate({ path: "user", select: "nickname" })
        .populate({ path: "recorder", select: "nickname" })
        .sort({ updatedAt: -1 })
        .limit(20);
      // console.log(result)
      res.status(200).json(result);
    } catch (error) {
      console.log("getBetsLasted20 error by catch", error);
      responseError(res, 400, "getBetsLasted20 error by catch");
    }
}

export async function deleteBet(req, res) {
  const { _id } = req.body;
  console.log('deleteBet work', _id);
    try {
      await connectDB();
      const bet = await Bet.findById(_id).populate({path: 'date'})
      if(bet.date.isOpen){
        // console.log(bet)
        const result = await Bet.deleteOne({ _id });
        // console.log(result);
        responseSuccess(res, 200, "delete bet success");
      }
      else {
        responseError(res, 400, "deleteBet error lotto not open");
      }
      
    } catch (error) {
      console.log("deleteBet error by catch", error);
      responseError(res, 400, "deleteBet error by catch");
    }
}

export async function putBet(req, res){
  const { _id, numberString, price } = req.body;
  console.log('putBet work ', _id);
    try {
      await connectDB();
      const bet = await Bet.findById(_id).populate({path: 'date'})
      if(bet.date.isOpen){
        const result = await Bet
          .updateOne({_id: _id}, {numberString: numberString, price: price})
        console.log(result);
        responseSuccess(res, 200, "update bet success");
      }
      else {
        responseError(res, 400, "putBet error  lotto not open");
      }
    } catch (error) {
      console.log("putBet error by catch", error);
      responseError(res, 400, "putBet error by catch");
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

