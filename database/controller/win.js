import connectDB from "../connectDB";
import Win from "../../model/win";
import Bet from "../../model/bet";
import Lotto from "../../model/lotto";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function getWinByLottoDateId(req, res) {
  console.log("database controller getWinByLottoDateId worked ", req.query);
  const { lottoDateId } = req.query;
  if (!lottoDateId || lottoDateId === "undefined") {
    responseError(res, 400, "required lottoDateId");
    return;
  }
  try {
    
    await connectDB();
    const win = await Win.findOne({ date: lottoDateId });
    // console.log(lotto)
    res.status(200).json(win);
  } catch (error) {
    console.log("error by catch controller getWinByLottoDateId", error);
    responseError(res, 400, "error by catch controller getWinByLottoDateId");
  }
}

export async function postWin(req, res) {
  console.log("database controller postWin worked ");
  console.log(req.body);

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
}

export async function putWin(req, res) {
  try {
    console.log("database controller putWin worked ", req.body);
    const [date, winNumber] = req.body;
    // console.log('data is ', date, winNumber)
    await connectDB();
    const lotto = await Lotto.findById(date.date);
    if (lotto.isOpen) {
      const win = await Win.updateOne(date, winNumber);
      // console.log(lotto)
      responseSuccess(res, 201, "update win success");
      // res.status(200).json(win)
    } else {
      responseError(res, 400, "error by controller putWin lotto is closed");
    }
  } catch (error) {
    console.log("error by catch controller putWin", error);
    responseError(res, 400, "error by catch controller putWin");
  }
}

export async function getWinner(req, res){
  console.log('getWinner work ', req.query)
  const {lottoDateId} = req.query
  try{
    await connectDB()
    const win = await Win.findOne({date: lottoDateId})
    const up3 = win.first.slice(3)
    const set3up = up3.split("").sort((a,b) => a-b).join("")
    const down3 = [win.first3_1, win.first3_2, win.last3_1, win.last3_2]
    const up2 = win.first.slice(4)
    const down2 = win.last2
    const uprun = up3.split('')
    const downrun = down2.split('')
    const result = await Lotto.aggregate([
      {
        $lookup: {
          from: 'bets',
          localField: '_id',
          foreignField: 'date',
          as: 'bet',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                  {
                    $project: {nickname: 1}
                  }
                ]
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'recorder',
                foreignField: '_id',
                as: 'recorder',
                pipeline: [
                  {
                    $project: {nickname: 1}
                  }
                ]
              }
            },
            {
              $match: {$expr : {$or: [
                {$and: [{$eq: ['$type', "up2"]}, {$eq: ['$numberString', up2]}]},
                {$and: [{$eq: ['$type', "down2"]}, {$eq: ['$numberString', down2]}]},
                {$and: [{$eq: ['$type', "up3"]}, {$eq: ['$numberString', up3]}]},
                {$and: [{$eq: ['$type', "set3up"]}, {$eq: ['$numberString', set3up]}]},
                {$and: [{$eq: ['$type', "down2"]}, {$eq: ['$numberString', down2]}]},
                {$and: [{$eq: ['$type', "down3"]}, {$in: ['$numberString', down3]}]},
                {$and: [{$eq: ['$type', "uprun"]}, {$in: ['$numberString', uprun]}]},
                {$and: [{$eq: ['$type', "downrun"]}, {$in: ['$numberString', downrun]}]},  
              ]}}
            },
            {
              $replaceRoot: {
                newRoot: {
                  type: '$type',
                  _id: '$_id',
                  user: {$first: '$user'},
                  numberString: '$numberString',
                  price: '$price',
                  recorder: {$first: '$recorder'}
                }}
            },
            {
              $group: {_id: '$type', bet: {$push: '$$ROOT'}}
            }
          ]
        }
      },
      {
        $match: {$expr: {$eq: ['$_id', {$toObjectId: lottoDateId}]}}
      },
      
      {
        $project: {
          win: "$bet"
        }
      }
    ])
    res.status(200).json(result[0])
  }
  catch (error) {
    console.log("error by catch controller getWinner", error);
    responseError(res, 400, "error by catch controller getWinner");
  }
}
