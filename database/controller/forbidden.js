import connectDB from "../connectDB";
import Forbidden from "../../model/forbidden";
import Bet from '../../model/bet'
import Lotto from "../../model/lotto";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function postForbidden(req, res){
  console.log('postForbidden work, ', req.body)
  
    try {
      await connectDB();
      const lotto = await Lotto.findById(req.body.date)
      if(lotto.isOpen){
        // const {type, numberString, date} = req.body
        const result = await Forbidden.create(req.body)
        console.log(result)     
        responseSuccess(res, 201, 'postForbidden create success')
      }
      else {
        responseError(res, 400, "postForbidden error lotto not open");
      }
      
      
    } catch (error) {
      console.log("error by catch controller postForbidden", error);
      responseError(res, 400, "error by catch controller postForbidden");
    }
}

export async function getForbiddensByLottoDateId(req, res){
  console.log('getForBiddensByLottoDateId work, ', req.query)
  const {lottoDateId} = req.query
  
    try {
      await connectDB();
      const result = await Forbidden.find({date: lottoDateId})
      // console.log(result)     
      // responseSuccess(res, 201, 'create success')
      res.status(200).json(result)
      
    } catch (error) {
      console.log("error by catch controller deleteLotto", error);
      responseError(res, 400, "error by catch controller deleteLotto");
    }
  
}

export async function getBetByForbiddenNumber(req, res){
  const {forbiddenId} = req.query
  
    try {
      await connectDB();
      let filter = []
      const forbidden = await Forbidden.findOne({_id: forbiddenId})
      // console.log('date is ', forbidden.date.toString())
      // console.log(forbidden.numberString.length)    
      if(forbidden.numberString.length === 2){
        const reverse = forbidden.numberString[1].concat(forbidden.numberString[0])
        filter.push(forbidden.numberString)
        filter.push(reverse)
        
      }
      else if(forbidden.numberString.length === 3){
        const arr = [[0, 1, 2], [1, 2, 0], [2, 0, 1], [0, 2, 1], [2, 1, 0], [1, 0, 2]]
        const subset = (n) => {
          let newArr= []
          arr.forEach((e)=>{
            let num = n[e[0]].concat(n[e[1]]).concat(n[e[2]])
            newArr.push(num)
          })
          return newArr
        }
        filter = subset(forbidden.numberString)
      }
      else {
        filter.push(numberString)
      }
      // console.log(filter)
      const result = await Bet.find({
        numberString: {$in: filter},
        date: forbidden.date
      }).populate({path: 'user', select: 'nickname'})
      // console.log('result is ', result)

       
      // responseSuccess(res, 201, 'create success')
      res.status(200).json(result)
      
    } catch (error) {
      console.log("error by catch controller getBetByForbiddenNumber", error);
      responseError(res, 400, "error by catch controller getBetByForbiddenNumber");
    }
}