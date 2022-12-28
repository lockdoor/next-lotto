import Discount from "../../model/discount";
import User from "../../model/user";

//ใช้หาส่วนลดของลูกค้าแต่ละงวด
export async function getUserDisCount(userId, lotto) {
  const result = await Discount.find({
    user: userId,
    date: { $lte: lotto.date },
  })
    .sort({ date: -1 })
    .limit(1);
  return result[0].discount || 0;
}

//ใช้หาว่าลูกค้ามียอดรวมเท่าไหร่ก่อนทำการ payment
export async function getUserTotalBetPrice(userId, lottoDateId) {
  const result = await User.aggregate([
    {
      $lookup: {
        from: "bets",
        localField: "_id",
        foreignField: "user",
        as: "bet",
        pipeline: [
          {
            $match: { $expr: { $and: [
              {$eq: ["$date", { $toObjectId: lottoDateId }]},
              {$eq: ["$isFree", false]}
            ]  } },
          },
        ],
      },
    },
    {
      $match: { $expr: { $eq: ["$_id", { $toObjectId: userId }] } },
    },
    { $project: { total: { $sum: "$bet.price" } } },
  ]);
  return result[0].total;
}