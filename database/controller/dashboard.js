import connectDB from "../connectDB";
import Lotto from "../../model/lotto"
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function putLottoSettings(req, res){
  console.log('putLottoSettings work, ', req.body)
    
  
    try {
      await connectDB();
      let {isOpen, userBet, _id} = req.body
      if(isOpen === false) {
        userBet = false
      }
      const result = await Lotto.findOneAndUpdate({_id}, {isOpen, userBet}, {new: true})
      console.log(result)     
      // responseSuccess(res, 201, result)
      res.status(201).json(result)

      
    } catch (error) {
      console.log("error by catch controller deleteLotto", error);
      responseError(res, 400, "error by catch controller deleteLotto");
    }
}

export async function getLottoById(req, res){
  console.log('getLottoById work, ', req.query)
    
  
    try {
      await connectDB();
      const {isOpen, userBet, _id} = req.body
      const result = await Lotto.findById(req.query.lottoDateId)
      console.log(result)     
      // responseSuccess(res, 201, result)
      res.status(201).json(result)

      
    } catch (error) {
      console.log("error by catch controller getLottoById", error);
      responseError(res, 400, "error by catch controller getLottoById");
    }
}