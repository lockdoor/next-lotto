import connectDB from "../connectDB";
import Bet from "../../model/bet";
import Lotto from "../../model/lotto"
import User from "../../model/user";
import Discount from "../../model/discount";
import { responseError, responseSuccess } from "../../lib/responseJson";
import { getUserDisCount, getUserTotalBetPrice } from "./helper";

export async function postBet(req, res) {
  console.log('form database controller postBet ', req.body)
  
    try {
      const lottoDateId = req.body[0].date

      await connectDB();
      const lotto = await Lotto.findById(lottoDateId)
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
      const result = await Bet.aggregate([
        {
          $lookup: {
            from: 'lottos',
            localField: 'date',
            foreignField: '_id',
            as: '_date',
            pipeline: [
              {
                $project: {
                  _id: 1,
                  date: 1
                }
              }
            ]
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: '_user',
            pipeline: [
              {$project: {_id: 1, nickname: 1}}
            ]
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'recorder',
            foreignField: '_id',
            as: '_recorder',
            pipeline: [
              {$project: {_id: 1, nickname: 1}}
            ]
          }
        },
        {$sort: { updatedAt: -1 }},
        {
          $limit: 20
        },
        {
          $project: {
            _id: 1,
            type: 1,
            price: 1,
            numberString: 1,
            updatedAt: 1,
            date: { "$arrayElemAt": [ "$_date", 0 ] } ,
            user: { "$arrayElemAt": [ "$_user", 0 ] } ,
            recorder: { "$arrayElemAt": [ "$_recorder", 0 ] }
          }
        }
      ])
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

export async function postFreeBet(req, res){
  console.log('postFreeBet work ', req.body)
  const {user, date, recorder, isFree} = req.body[0]
  if(!user || !date || !recorder || !isFree){
    responseError(res, 400, 'required data')
    return
  }
  try {
    await connectDB()
    const restOfFreeBetPrice = await getRestOfFreeBetPrice(user, date)
    const totalPriceSend = req.body.reduce((a, b) => a + parseInt(b.price) , 0)
    if(restOfFreeBetPrice - totalPriceSend < 0){
      responseError(res, 400, `bet error your free bet is ${totalPriceSend}! free bet is remaining ${restOfFreeBetPrice}`)
      return
    }else{
      const result = await Bet.insertMany(req.body)
      res.status(201).json(result)
    }
  }
  catch(error){
    console.log("postFreeBet error by catch", error);
    responseError(res, 400, "postFreeBet error by catch");
  }
}

export async function putFreeBet(req, res){
  console.log('putFreeBet work ', req.body)
  const {_id, newPrice, oldPrice, recorder, lottoDateId, userId} = req.body
  try{
    await connectDB()
    
    const restOfFreeBetPrice = await getRestOfFreeBetPrice(userId, lottoDateId)
    if(newPrice > (restOfFreeBetPrice + oldPrice)){
      responseError(res, 400, `bet error your free bet is ${newPrice}! free bet is remaining ${restOfFreeBetPrice + oldPrice}`)
      return
    }
    else{
      const result = await Bet.updateOne({_id}, {price: newPrice, recorder})
      res.status(201).json(result)
    }

  }
  catch(error){
    console.log("putFreeBet error by catch", error);
    responseError(res, 400, "putFreeBet error by catch");
  }
}

export async function deleteFreeBet(req, res){
  console.log('deleteFreeBet work ', req.body)
  const { _id } = req.body
  try{
    await connectDB()
    const result = await Bet.deleteOne({_id})
    res.status(201).json(result)
  }
  catch(error){
    console.log("deleteFreeBet error by catch", error);
    responseError(res, 400, "deleteFreeBet error by catch");
  }
}

async function getRestOfFreeBetPrice(userId, lottoDateId){
  const lotto = await Lotto.findById(lottoDateId)
  // หาเปอร์เซนต์ส่วนลด
  const discount = await getUserDisCount(userId, lotto)
  // หายอดรวมที่ลูกค้าแทงเข้ามา
  const totalPrice = await getUserTotalBetPrice(userId, lottoDateId)
  // หาราคาส่วนลด
  const discountPrice = totalPrice * discount / 100
  // หาราคาตัวฟรีทั้งหมดที่ซื้อไป
  const totalFreeBetPrice = await getTotalFreeBetPrice(userId, lottoDateId)
  const restOfFreeBetPrice = discountPrice - totalFreeBetPrice
  return restOfFreeBetPrice
}

async function getTotalFreeBetPrice(userId, lottoDateId){
  const result = await Bet.find({user: userId, date: lottoDateId, isFree: true})
  return result.reduce((a,b) => a + b.price, 0)
}

