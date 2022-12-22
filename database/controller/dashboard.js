import connectDB from "../connectDB";
import Lotto from "../../model/lotto";
import Bet from "../../model/bet";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function putLottoSettings(req, res) {
  console.log("putLottoSettings work, ", req.body);
  try {
    await connectDB();
    let { isOpen, userBet, _id } = req.body;
    if (isOpen === false) {
      userBet = false;
    }
    const result = await Lotto.findOneAndUpdate(
      { _id },
      { isOpen, userBet },
      { new: true }
    );
    console.log(result);
    // responseSuccess(res, 201, result)
    res.status(201).json(result);
  } catch (error) {
    console.log("error by catch controller deleteLotto", error);
    responseError(res, 400, "error by catch controller deleteLotto");
  }
}

export async function getTotalBet(req, res) {
  console.log("getTotalBet Work ", req.query);
  const { lottoDateId } = req.query;
  if (lottoDateId === "undefined" || !lottoDateId) {
    responseError(res, 400, "requred lottoDateId");
    return;
  }
  try {
    await connectDB();
    const totalBet = await Lotto.aggregate([
      {
        $lookup: {
          from: "bets",
          localField: "_id",
          foreignField: "date",
          let: {},
          as: "bet",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$date", { $toObjectId: lottoDateId }] },
              },
            },
          ],
        },
      },
      {
        $match: { $expr: { $eq: ["$_id", { $toObjectId: lottoDateId }] } },
      },
      {
        $project: {
          totalBet: { $sum: "$bet.price" },
        },
      }
    ]);
    res.status(201).json(totalBet[0]);
  } catch (error) {
    console.log("error by catch controller getTotalBet", error);
    responseError(res, 400, "error by catch controller getTotalBet");
  }
}

export async function getBetDetail(req, res) {
  console.log("getBetDetail ", req.query);
  const { lottoDateId } = req.query;
  if (lottoDateId === "undefined" || !lottoDateId) {
    responseError(res, 400, "requred lottoDateId");
    return;
  }
  try {
    await connectDB();
    const result = await Lotto.aggregate([
      {
        $lookup: {
          from: 'bets',
          localField: '_id',
          foreignField: 'date',
          as: 'bet',
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$date", { $toObjectId: lottoDateId }] },
              },
            },
            {
              $group: { 
                _id: "$type", 
                totalPrice: { $sum: "$price" },
                min: {$min: "$price"},
                max: {$max: "$price"},
                unique: {$addToSet : '$numberString'}
              },
            },
            {
              $project: {
                _id: 1,
                totalPrice: 1,
                amount: {$size : '$unique'},
                min: 1,
                max: 1
              }
            }

          ]
        },        
      },
      {
        $match: {
          $expr: { $eq: ["$_id", { $toObjectId: lottoDateId }] },
        },
      },
      {
        $project: {
          _id: 1,
          bet: '$bet'
        }
      }
    ])
    // console.log('betDetail result is ', result[0])
    res.status(201).json(result[0]);
  } catch (error) {
    console.log("error by catch controller getBetDetail", error);
    responseError(res, 400, "error by catch controller getBetDetail");
  }
}

export async function getUserRange(req, res){
  console.log("getUserRange ", req.query);
  const { lottoDateId } = req.query;
  if (lottoDateId === "undefined" || !lottoDateId) {
    responseError(res, 400, "requred lottoDateId");
    return;
  }
  try {
    await connectDB();
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
              $match: {$expr: {$eq: ["$date", {$toObjectId: lottoDateId}]}}
            },
            {
              $group: {_id: {$first: '$user'}, totalPrice: {$sum: '$price'}}
            },
            {
              $sort: {totalPrice: -1}
            },
            {
              $limit: 5
            }
          ]
        }
      },
      {
        $match: {$expr: {$eq: [ '$_id', {$toObjectId: lottoDateId}]}}
      },
      {
        $project: {
          bet: 1
        }
      }
    ])
    // console.log('betDetail result is ', result[0])
    res.status(201).json(result[0]);
  } catch (error) {
    console.log("error by catch controller getUserRange", error);
    responseError(res, 400, "error by catch controller getUserRange");
  }
}

export async function getNumberDetail(req, res){
  console.log("getNumberDetail ", req.query);
  const { lottoDateId } = req.query;
  if (lottoDateId === "undefined" || !lottoDateId) {
    responseError(res, 400, "requred lottoDateId");
    return;
  }
  try {
    await connectDB()
    const result = await Lotto.aggregate([
      {
        $lookup: {
          from: 'bets',
          localField: '_id',
          foreignField: 'date',
          as: 'bet',
          pipeline: [
            {
              $match: {$expr: {$eq: ['$date', {$toObjectId: lottoDateId}]}}
            },
            {
              $group: {
                _id: {type: '$type', numberString: '$numberString'},
                price: {$push: '$price'}
              }
            },
            {
              $group: {
                _id: '$_id.type',
                number: {$addToSet: {
                  numberString: '$_id.numberString',
                  price: {$sum: '$price'}  
                }}              
              }
            },
            
            {
              $unwind: '$number'
            },
            {
              $sort: {'number.price' : -1}
            },
            
            {
              $group: {
                _id: '$_id',
                number: {$push: '$number'}
              }
            },
            {
              $sort: { _id: 1 }
            },
            {
              $project: {
                _id: 1,
                numbers: {$slice: ['$number', 5]}

              }
            }
          ]
        }
      },
      {
        $match: {$expr: {$eq: ['$_id', {$toObjectId: lottoDateId}]}}
      }
    ])
    // console.log(result)
    res.status(200).json(result[0])
  }
  catch (error) {
  console.log("error by catch controller getNumberDetail", error);
  responseError(res, 400, "error by catch controller getNumberDetail");
}
}