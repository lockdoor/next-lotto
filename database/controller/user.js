import connectDB from "../connectDB";
import User from "../../model/user";
import Bet from "../../model/bet";
import Discount from "../../model/discount";
import Lotto from "../../model/lotto";
import Payment from "../../model/payment";
import Win from "../../model/win";
import validateUser from "../../lib/validateUser";
import { responseError, responseSuccess } from "../../lib/responseJson";
import bcrypt from "bcrypt";

export async function postUser(req, res) {
  console.log("post user work ", req.body);
  const { username, password, nickname, discount, credit, lottoDateId } =
    req.body;
  let newuser = undefined;

  //สร้างผู้ใช้แบบเข้าระบบไม่ได้
  if (!username || !password) {
    // return postUserWithOutLoginAccount(req, res);
    if (!validateUser([nickname])) {
      return responseError(res, 400, "you sent wrong data");
    }
    newuser = new User({ nickname });
  } else {
    if (!validateUser([username, password, nickname])) {
      return responseError(res, 400, "you sent wrong data");
    }
    //สร้่างผู้ใช้แบบเข้าระบบได้
    const passwordHass = await bcrypt.hash(password, 8);
    newuser = new User({
      username,
      password: passwordHass,
      nickname,
      credit,
    });
  }
  try {
    await connectDB();
    const lotto = await Lotto.findById(lottoDateId);
    const user = await newuser.save();
    if (user) {
      await Discount.create({
        date: lotto.date,
        user: user._id,
        discount: discount ? discount : 0,
        lottoDateId: lottoDateId,
      });
      return responseSuccess(res, 201, "create user success");
    }
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      responseError(res, 400, "customer is exist");
    } else {
      responseError(
        res,
        500,
        "error by catch in database controller postUser create first admin"
      );
    }
  }
}

export async function putUser(req, res) {
  try {
    console.log("putLotto ทำงาน ข้อมูลที่ส่งมาคือ", req.body);
    const { _id, nickname, discount, username, password, credit, lottoDateId } =
      req.body;
    const passwordHass = password ? await bcrypt.hash(password, 8) : null;
    await connectDB();
    const lotto = await Lotto.findById(lottoDateId);
    //ตรวจสอบ discount และอัพเดต
    console.log(`discount is ${discount} type is ${typeof discount}`);
    const DiscountSameDate = await Discount.findOne({
      lottoDateId: lottoDateId,
      user: _id,
    });
    // console.log(sameDate)
    if (DiscountSameDate) {
      // console.log('พบว่า discount ที่ส่งมาเป็นวันเดียวกัน')
      if (DiscountSameDate.discount !== parseInt(discount)) {
        // console.log('มีการเปลี่ยนแปลงข้อมูล discount ให้ทำการ update')
        await Discount.updateOne(
          { _id: DiscountSameDate._id },
          { discount: discount }
        );
      }
    } else {
      // console.log('ไม่พบข้อมูล discount ของงวดหวย ทำการ create')
      await Discount.create({
        lottoDateId: lottoDateId,
        user: _id,
        discount: discount,
        date: lotto.date,
      });
    }

    //ทำการ update user
    const user = username
      ? await User.updateOne(
          { _id },
          { nickname, username, password: passwordHass, credit }
        )
      : await User.updateOne(
          { _id },
          {
            nickname,
            credit: 0,
            $unset: { username: "", password: "" },
          }
        );
    // console.log("user is ", user);
    res.status(200).json(user);
  } catch (error) {
    console.log("error by catch controller putUser");
    responseError(res, 400, "error by catch controller putUser");
  }
}

export async function postPayment(req, res) {
  console.log("postPayment work data is ", req.body);
  try {
    const { userId, lottoDateId, recorder, payment } = req.body;
    if (!userId || !lottoDateId || !recorder || !payment) {
      responseError(res, 400, "error by controller postPayment required data!");
      return;
    }
    const lotto = await Lotto.findById(lottoDateId);
    const UserbetToTalPrice = await getUserTotalBetPrice(userId, lottoDateId);
    console.log("UserbetToTalPrice is ", UserbetToTalPrice);
    const discount = await getUserDisCount(userId, lotto);
    console.log("discount is ", discount);
    const debt = UserbetToTalPrice - (UserbetToTalPrice * discount) / 100;
    console.log("Debt is ", debt);
    const pay = new Payment({
      date: lottoDateId,
      user: userId,
      recorder: recorder,
    });
    if (payment > debt || payment <= 0) {
      console.log(
        "error by controller postPayment payment over debt or payment invalid"
      );
      responseError(
        res,
        400,
        "error by controller postPayment payment over debt or payment invalid"
      );
      return;
    } else if (parseInt(payment) === debt) {
      pay.payment = parseInt(payment);
      pay.isFinish = true;
    } else {
      pay.payment = parseInt(payment);
      pay.isFinish = false;
    }
    await pay.save();
    res.status(200);
  } catch (error) {
    console.log("error by catch controller postPayment", error);
    responseError(res, 400, "error by catch controller postPayment");
  }
}

export async function putPayment(req, res) {
  console.log("putPayment work ", req.body);
  const { paymentId, userId, lottoDateId, recorder, payment } = req.body;
  try {
    if (!paymentId || !userId || !lottoDateId || !recorder || !payment) {
      responseError(res, 400, "error by controller postPayment required data!");
      return;
    }
    const lotto = await Lotto.findById(lottoDateId);
    const UserbetToTalPrice = await getUserTotalBetPrice(userId, lottoDateId);
    // console.log('UserbetToTalPrice is ', UserbetToTalPrice)
    const discount = await getUserDisCount(userId, lotto);
    // console.log('discount is ', discount)
    const debt = UserbetToTalPrice - (UserbetToTalPrice * discount) / 100;
    // console.log ('Debt is ', debt)
    const pay = await Payment.findById(paymentId);
    if (payment > debt || payment <= 0) {
      console.log(
        "error by controller postPayment payment over debt or payment invalid"
      );
      responseError(
        res,
        400,
        "error by controller postPayment payment over debt or payment invalid"
      );
      return;
    } else if (parseInt(payment) === debt) {
      pay.payment = parseInt(payment);
      pay.isFinish = true;
    } else {
      pay.payment = parseInt(payment);
      pay.isFinish = false;
    }
    await pay.save();
    console.log(pay);
    res.status(201).json(pay);
  } catch (error) {
    console.log("error by catch controller putPayment", error);
    responseError(res, 400, "error by catch controller putPayment");
  }
}

export async function getUsersWithTotalBetByLottoDateId(req, res) {
  console.log("getUsersWithTotalBetByLottoDateId worked", req.query);
  const { lottoDateId } = req.query;
  if (lottoDateId === "undefined" || !lottoDateId) {
    responseError(res, 400, "required lottoDateId");
  } else {
    try {
      await connectDB();
      const lotto = await Lotto.findById(lottoDateId);
      const users = await User.aggregate([
        {
          // bet
          $lookup: {
            from: "bets",
            localField: "_id",
            foreignField: "user",
            as: "bet",
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$date", { $toObjectId: lottoDateId }] },
                },
              },
              {
                $project: {
                  type: 1,
                  price: 1,
                  numberString: 1,
                  recorder: 1,
                  win: 1,
                },
              },
            ],
          },
        },
        {
          // discount
          $lookup: {
            from: "discounts",
            localField: "_id",
            foreignField: "user",
            as: "discount",
            pipeline: [
              {
                $match: { date: { $lte: lotto.date } },
              },
              {
                $sort: { date: -1 },
              },

              {
                $project: {
                  date: 1,
                  discount: 1,
                },
              },
            ],
          },
        },
        {
          // payment
          $lookup: {
            from: "payments",
            localField: "_id",
            foreignField: "user",
            as: "payment",
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$date", { $toObjectId: lottoDateId }] },
                },
              },
              {
                $project: { payment: 1, isFinish: 1 },
              },
            ],
          },
        },
        { $addFields: { _discount: { $first: "$discount" } } },
        {
          $project: {
            _id: 1,
            nickname: 1,
            username: 1,
            discount: "$_discount.discount",
            role: 1,
            payment: { $first: "$payment" },
            total: { $sum: "$bet.price" },
            bet: 1,
          },
        },
        { $sort: { total: -1 } },
      ]);
      // console.log(users[0])
      const win = await Win.findOne({ date: lottoDateId });
      const result = users.map((user) => ({
        _id: user._id,
        nickname: user.nickname,
        discount: user.discount,
        role: user.role,
        payment: user.payment,
        total: user.total,
        winPrice: findWinPrice(win, user.bet, lotto),
      }));

      res.status(200).json(result);
    } catch (error) {
      console.log(
        "error by catch controller getUsersWithTotalBetByLottoDateId",
        error
      );
      responseError(
        res,
        400,
        "error by catch controller getUsersWithTotalBetByLottoDateId"
      );
    }
  }
}

export async function getUserBetDetail(req, res) {
  const [lottoDateId, userId] = req.query.params;
  // console.log({ lottoDateId, userId });
  try {
    await connectDB();
    const result = await Bet.find({ date: lottoDateId, user: userId })
      .populate({ path: "user", select: "nickname" })
      .populate({ path: "recorder", select: "nickname" });
    // console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log("error by catch controller getUserBetDetail", error);
    responseError(res, 400, "error by catch controller getUserBetDetail");
  }
}

export async function getUsers(req, res) {
  try {
    await connectDB();
    const users = await User.find().select("-password");
    // console.log(users)
    res.status(200).json(users);
  } catch (error) {
    console.log("error by catch controller getCustomer");
    responseError(res, 400, "error by catch controller getCustomer");
  }
}

export async function getUserById(req, res) {
  console.log("getUserById work ", req.query);
  try {
    await connectDB();
    const user = await User.findOne({ _id: req.query.userId });
    // console.log('user is ', user)
    res.status(200).json(user);
  } catch (error) {
    console.log("error by catch controller getUserById");
    responseError(res, 400, "error by catch controller getUserById");
  }
}

export async function getConclusion(req, res) {
  console.log("getConclusion work ", req.query.params);
  const [lottoDateId, userId] = req.query.params;
  try {
    const win = await Win.findOne({ date: lottoDateId });
    if (!win) {
      res.status(200).json(win);
      return;
    } else {
      const up3 = win.first.slice(3);
      const set3up = up3
        .split("")
        .sort((a, b) => a - b)
        .join("");
      const down3 = [win.first3_1, win.first3_2, win.last3_1, win.last3_2];
      const up2 = win.first.slice(4);
      const down2 = win.last2;
      const uprun = up3.split("");
      const downrun = down2.split("");
      const lotto = await Lotto.findById(lottoDateId);
      const total = await getUserTotalBetPrice(userId, lottoDateId);
      const discount = await getUserDisCount(userId, lotto);
      const betWin = await Bet.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "recorder",
            foreignField: "_id",
            as: "recorder",
            pipeline: [{ $project: { nickname: 1 } }],
          },
        },
        {
          $match: {
            $expr: {
              $or: [
                {
                  $and: [
                    { $eq: ["$user", { $toObjectId: userId }] },
                    {
                      $eq: ["$date", { $toObjectId: lottoDateId }],
                    },
                    { $eq: ["$type", "up3"] },
                    { $eq: ["$numberString", up3] },
                  ],
                },
                {
                  $and: [
                    { $eq: ["$user", { $toObjectId: userId }] },
                    {
                      $eq: ["$date", { $toObjectId: lottoDateId }],
                    },
                    { $eq: ["$type", "set3up"] },
                    { $eq: ["$numberString", set3up] },
                  ],
                },
                {
                  $and: [
                    { $eq: ["$user", { $toObjectId: userId }] },
                    {
                      $eq: ["$date", { $toObjectId: lottoDateId }],
                    },
                    { $eq: ["$type", "down3"] },
                    { $in: ["$numberString", down3] },
                  ],
                },
                {
                  $and: [
                    { $eq: ["$user", { $toObjectId: userId }] },
                    {
                      $eq: ["$date", { $toObjectId: lottoDateId }],
                    },
                    { $eq: ["$type", "down2"] },
                    { $eq: ["$numberString", down2] },
                  ],
                },
                {
                  $and: [
                    { $eq: ["$user", { $toObjectId: userId }] },
                    {
                      $eq: ["$date", { $toObjectId: lottoDateId }],
                    },
                    { $eq: ["$type", "up2"] },
                    { $eq: ["$numberString", up2] },
                  ],
                },
                {
                  $and: [
                    { $eq: ["$user", { $toObjectId: userId }] },
                    {
                      $eq: ["$date", { $toObjectId: lottoDateId }],
                    },
                    { $eq: ["$type", "uprun"] },
                    { $in: ["$numberString", uprun] },
                  ],
                },
                {
                  $and: [
                    { $eq: ["$user", { $toObjectId: userId }] },
                    {
                      $eq: ["$date", { $toObjectId: lottoDateId }],
                    },
                    { $eq: ["$type", "downrun"] },
                    { $in: ["$numberString", downrun] },
                  ],
                },
              ],
            },
          },
        },
        {
          $project: {
            recorder: { $first: "$recorder" },
            type: 1,
            price: 1,
            numberString: 1,
          },
        },
      ]);
      const findWinPrice = (price, type) => {
        return price * lotto[type];
      };
      const totalWinPrice = (arr) => {
        return arr.reduce((a, b) => a + b.winPrice, 0);
      };
      const result = {
        lottoDateId: lottoDateId,
        userId: userId,
        totalPrice: total,
        discount: discount,
        discountPrice: (total * discount) / 100,
        numberWin: betWin.map((e) => ({
          numberString: e.numberString,
          recorder: e.recorder.nickname,
          _id: e._id,
          type: e.type,
          price: e.price,
          winPrice: findWinPrice(e.price, e.type),
        })),
      };
      result.totalWinPrice = totalWinPrice(result.numberWin);
      result.conclusion =
        result.totalPrice - result.discountPrice - result.totalWinPrice;
      // console.log("win is ", result);
      res.status(200).json(result);
    }
  } catch (error) {
    console.log("error by catch controller getConclusion", error);
    responseError(res, 400, "error by catch controller getConclusion");
  }
}

function findWinPrice(win, bet, lotto) {
  const up3 = win.first.slice(3);
  const set3up = up3
    .split("")
    .sort((a, b) => a - b)
    .join("");
  const down3 = [win.first3_1, win.first3_2, win.last3_1, win.last3_2];
  const up2 = win.first.slice(4);
  const down2 = win.last2;
  const uprun = up3.split("");
  const downrun = down2.split("");
  const wins = bet.filter(
    (e) =>
      (e.type === "up3" && e.numberString === up3) ||
      (e.type === "set3up" && e.numberString === set3up) ||
      (e.type === "down3" && down3.some(n => n === e.numberString))||
      (e.type === "up2" && e.numberString === up2) ||
      (e.type === "down2" && e.numberString === down2) ||
      (e.type === "uprun" && uprun.some(n => n === e.numberString)) ||
      (e.type === "downrun" && downrun.some(n => n === e.numberString))
  );
  if(wins.length > 0){
    const winWithPrice = wins.map(e => e.price * lotto[e.type])
    // return winWithPrice
    return winWithPrice.reduce((a,b) => a + b, 0)
    // return wins
  }else{
    return 0;
  }
  
}

//ใช้หาว่าลูกค้ามียอดรวมเท่าไหร่ก่อนทำการ payment
async function getUserTotalBetPrice(userId, lottoDateId) {
  const result = await User.aggregate([
    {
      $lookup: {
        from: "bets",
        localField: "_id",
        foreignField: "user",
        as: "bet",
        pipeline: [
          {
            $match: { $expr: { $eq: ["$date", { $toObjectId: lottoDateId }] } },
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
//ใช้หาส่วนลดของลูกค้าแต่ละงวด
async function getUserDisCount(userId, lotto) {
  const result = await Discount.find({
    user: userId,
    date: { $lte: lotto.date },
  })
    .sort({ date: -1 })
    .limit(1);
  return result[0].discount || 0;
}
