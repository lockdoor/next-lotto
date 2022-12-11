import connectDB from "../connectDB";
import Lotto from "../../model/lotto";
import Bet from "../../model/bet";
import Forbidden from "../../model/forbidden";
import { getToken } from "next-auth/jwt";
import { responseError, responseSuccess } from "../../lib/responseJson";


export async function postLotto(req, res){
  console.log('form database controller postLotto ', req.body)
  // responseSuccess(res, 200, req.body)
  const token = await getToken({req})
  if(token.role === "admin"){
    try{
      await connectDB()
      const date = new Date(req.body.date)
      const result = await Lotto.create({date})
      // console.log(result)
      responseSuccess(res, 201, 'create lotto success')
    }
    catch(error){
      if(error.code === 11000){
        responseError(res, 400, "งวดวันที่ซ้ำกัน");
      }
      else{
        console.log('error by catch', error)
      responseError(res, 400, "error by catch");
      }  
    }    
  }else{
    responseError(res, 403, "protect api by token");
  }
}

export async function getLottos(req, res){
  // console.log('controller get lotto work')
  const token = await getToken({req})
  if(token){
    try{
      await connectDB()
      const result = await Lotto.find().select('date').sort({date: -1})
      // console.log(result)
      res.status(200).json(result);
    }
    catch(error){
      console.log("error by catch controller getLottos", error);
      responseError(res, 400, "error by catch controller getLottos");
    }
  }
  else{
    responseError(res, 403, "protect api by token");
  }
}

export async function putLotto(req, res){
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      const {_id, date} = req.body
      console.log('from putLotto ',{_id, date} )
      await connectDB();
      const lotto = await Lotto.updateOne({_id: _id}, {date: new Date(date)})
      responseSuccess(res, 201, 'update date success')
    } catch (error) {
      console.log("error by catch controller putLotto", error);
      responseError(res, 400, "error by catch controller putLotto");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function deleteLotto(req, res){
  console.log('database controller deleteLotto worked')
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      console.log(req.query)
      const {lottoDateId} = req.query
      await connectDB();
      await Lotto.deleteOne({_id: lottoDateId})
      await Bet.deleteMany({date: lottoDateId})
      await Forbidden.deleteMany({date: lottoDateId})
      responseSuccess(res, 201, 'delete date success')
    } catch (error) {
      console.log("error by catch controller deleteLotto", error);
      responseError(res, 400, "error by catch controller deleteLotto");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

// export async function getLottoById(req, res){
//   console.log('database controller getLottoById worked')
//   const token = await getToken({ req });
//   if (token.role === "admin") {
//     try {
//       const {lottoDateId} = req.query
//       await connectDB();
//       const lotto = await Lotto.findOne({_id: lottoDateId})
//       // console.log(lotto)
//       res.status(200).json(lotto)
//     } catch (error) {
//       console.log("error by catch controller getLottoById", error);
//       responseError(res, 400, "error by catch controller getLottoById");
//     }
//   } else {
//     responseError(res, 403, "protect api by token");
//   }
// }

