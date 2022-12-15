import connectDB from "../connectDB";
import User from "../../model/user";
import Bet from "../../model/bet";
import Discount from "../../model/discount";
import validateUser from "../../lib/validateUser";
import { responseError, responseSuccess } from "../../lib/responseJson";
import bcrypt from "bcrypt";

//สร้างผู้ใช้แบบเข้าระบบไม่ได้
async function postUserWithOutLoginAccount(req, res) {
  const { nickname, discount, lottoDateId } = req.body;
  if (nickname.trim() !== "") {
    try {
      await connectDB();
      const user = await User.create({
        nickname,
      });
      // console.log(user);
      if (discount) {
        await Discount.create({
          date: lottoDateId,
          user: user._id,
          discount: discount ? discount : 0,
        });
      }
        
      return responseSuccess(res, 201, "create user success");
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        responseError(res, 400, "customer is exist");
      } else {
        responseError(
          res,
          500,
          "error by catch in database controller postUser create user with out account"
        );
      }
    }
  } else {
    responseError(res, 400, "create user with out account you sent wrong data");
  }
}
//สร้างผู้ใช้แบบเข้าระบบได้
export async function postUser(req, res) {
  const { username, password, nickname, discount, credit, lottoDateId } =
    req.body;
  let newuser = undefined

  //สร้างผู้ใช้แบบเข้าระบบไม่ได้
  if (!username || !password) {
    return postUserWithOutLoginAccount(req, res);
    // if(!validateUser([nickname])){
    //   return responseError(res, 400, "you sent wrong data");
    // }
    // newuser = new User({nickname})
  }
  // console.log(req.body);

  //สร้่างผู้ใช้แบบเข้าระบบได้
  if (validateUser([username, password, nickname])) {
    const passwordHass = await bcrypt.hash(password, 8);
    const newuser = new User({
      username,
      password: passwordHass,
      nickname,
      credit,
    });
    try {
      await connectDB();
      const user = await newuser.save();
      await Discount.create({
        date: lottoDateId,
        user: user._id,
        discount: discount ? discount : 0,
      });
      if (user) return responseSuccess(res, 201, "create user success");
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
  } else {
    responseError(res, 400, "you sent wrong data");
  }
}

export async function getUsersWithTotalBetByLottoDateId(req, res) {
  try {
    console.log("getUsersWithTotalBetByLottoDateId worked ", req.query);
    const { lottoDateId } = req.query;
    // console.log(lottoDateId)
    await connectDB();

    const users = await User.aggregate([
      {
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
          ],
        },
      },
      {
        $project: {
          _id: 1,
          nickname: 1,
          username: 1,
          discount: 1,
          role: 1,
          // bet: 1,
          total: { $sum: "$bet.price" },
        },
      },
    ]).sort({ total: -1 });
    res.status(200).json(users);
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

export async function putUser(req, res) {
  try {
    console.log(req.body);
    const { _id, nickname, discount, username, password, credit } = req.body;
    const passwordHass = password ? await bcrypt.hash(password, 8) : null;
    await connectDB();
    const user = username
      ? await User.updateOne(
          { _id },
          { nickname, discount, username, password: passwordHass, credit }
        )
      : await User.updateOne(
          { _id },
          {
            nickname,
            discount,
            $unset: { username: "", password: "", credit: "" },
          }
        );
    console.log("user is ", user);
    res.status(200).json(user);
  } catch (error) {
    console.log("error by catch controller putUser");
    responseError(res, 400, "error by catch controller putUser");
  }
}
