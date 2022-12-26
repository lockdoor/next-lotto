import connectDB from "../connectDB";
import Lotto from "../../model/lotto";
import Bet from "../../model/bet";
import Forbidden from "../../model/forbidden";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function postLotto(req, res){
  console.log('form database controller postLotto ', req.body)
  const {date, up3, down3, set3up, down2, up2, uprun, downrun} = req.body
    try{
      await connectDB()
      // const date = new Date(req.body.date)
      const result = await Lotto.create({date: new Date(date), up3, down3, set3up, down2, up2, uprun, downrun})
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
}

export async function getLottos(req, res){
    try{
      await connectDB()
      const result = await Lotto.find().sort({date: -1})
      // console.log(result)
      res.status(200).json(result);
    }
    catch(error){
      console.log("error by catch controller getLottos", error);
      responseError(res, 400, "error by catch controller getLottos");
    }
}

export async function putLottoDate(req, res){
    try {
      const {_id, date, up3, down3, set3up, down2, up2, uprun, downrun} = req.body
      console.log('from putLottoDate ',{_id, date} )
      await connectDB();
      const lotto = await Lotto.updateOne({_id: _id}, {date: new Date(date), up3, down3, set3up, down2, up2, uprun, downrun})
      responseSuccess(res, 201, 'update date success')
    } catch (error) {
      console.log("error by catch controller putLottoDate", error);
      responseError(res, 400, "error by catch controller putLottoDate");
    }
}

export async function deleteLotto(req, res){
  console.log('database controller deleteLotto worked')
    try {
      // console.log(req.body)
      const {_id} = req.body
      await connectDB();
      const lotto = await Lotto.findById(_id)
      // console.log(lotto)
      if(lotto.userBet || lotto.isOpen){
        responseError(res, 400, 'can not delete because lotto is open')
        return
      }
      await Lotto.deleteOne({_id: _id})
      await Bet.deleteMany({date: _id})
      await Forbidden.deleteMany({date: _id})
      responseSuccess(res, 201, 'delete date success')
    } catch (error) {
      console.log("error by catch controller deleteLotto", error);
      responseError(res, 400, "error by catch controller deleteLotto");
    }
}

export async function getLottoById(req, res) {
  console.log("getLottoById work, ", req.query);
  try {
    await connectDB();
    // const {isOpen, userBet, _id} = req.body
    const result = await Lotto.findById(req.query.lottoDateId);
    console.log(result);
    // responseSuccess(res, 201, result)
    res.status(200).json(result);
  } catch (error) {
    console.log("error by catch controller getLottoById", error);
    responseError(res, 400, "error by catch controller getLottoById");
  }
}

