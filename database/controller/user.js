import connectDB from "../connectDB";
import User from "../../model/user";
import Bet from "../../model/bet";
import validateUser from "../../lib/validateUser";
import { responseError, responseSuccess } from "../../lib/responseJson";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

//user
function postUserWithLoginAccout(req, res) {}
async function postUserWithOutLoginAccount(req, res) {
  const { nickname, discount } = req.body;
  if (nickname.trim() !== "") {
    try {
      const token = await getToken({ req });
      if (token?.role === "admin" || token?.role === "subadmin") {
        await connectDB();
        const result = await User.create({
          nickname,
          discount: discount ? discount : 0,
        });
        return responseSuccess(res, 201, "create user success");
      } else {
        return responseError(res, 400, "require admin token");
      }
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
function postUserWithAdmin(req, res) {}
export async function postUser(req, res) {
  const { username, password, nickname, discount, credit } = req.body;
  //สร้างผู้ใช้แบบเข้าระบบไม่ได้
  if (!username || !password) {
    return postUserWithOutLoginAccount(req, res);
  }
  console.log(req.body);

  //สร้่างผู้ใช้แบบเข้าระบบได้
  if (validateUser({ username, password, nickname })) {
    const passwordHass = await bcrypt.hash(password, 8);
    const newuser = new User({
      username,
      password: passwordHass,
      nickname,
      discount: discount ? discount : 0,
      credit
    });
    try {
      await connectDB();
      const token = await getToken({ req });
      console.log(token);
      if (token?.role === "admin" || token?.role === "subadmin") {
        //ทำการตรวจสอบข้อมูลก่อนบันทึก

        const result = await newuser.save();
        console.log("has token", result);
        responseSuccess(res, 201, "create user success");
      } else {
        //ทำการถามก่อนว่ามี user หรือยัง ถ้ายังให้สร้าง user admin ถ้ามีแล้วให้แจ้ง error require token

        const user = await User.findOne({ role: "admin" });
        if (user) {
          return responseError(res, 400, "require admin token");
        } else {
          newuser.role = "admin";
          const result = await newuser.save();
          console.log("not has token", result);
          responseSuccess(res, 201, "create user success");
        }
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
  } else {
    responseError(res, 400, "you sent wrong data");
  }
}

export async function getUsersWithTotalBetByLottoDateId(req, res) {
  const token = await getToken({ req });
  console.log(req.query);
  const { lottoDateId } = req.query;
  // console.log(lottoDateId)
  if (token?.role === "admin") {
    try {
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
  } else {
    responseError(res, 403, "protect api by token");
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
  const token = await getToken({ req });
  if (token?.role === "admin") {
    try {
      await connectDB();
      const users = await User.find().select("-password");
      // console.log(users)
      res.status(200).json(users);
    } catch (error) {
      console.log("error by catch controller getCustomer");
      responseError(res, 400, "error by catch controller getCustomer");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function getUserById(req, res) {
  console.log("getUserById work ", req.query);
  const token = await getToken({ req });
  if (token?.role === "admin") {
    try {
      await connectDB();
      const user = await User.findOne({ _id: req.query.userId });
      // console.log('user is ', user)
      res.status(200).json(user);
    } catch (error) {
      console.log("error by catch controller getUserById");
      responseError(res, 400, "error by catch controller getUserById");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function putUser(req, res) {
  console.log(req.body);
  const { _id, nickname, discount, username, password, credit } = req.body;
  const token = await getToken({ req });
  const passwordHass = password ? await bcrypt.hash(password, 8) : null
  

    if (token?.role === "admin") {
      try {
        await connectDB();
        const user = username
          ? await User.updateOne(
              { _id },
              { nickname, discount, username, password: passwordHass, credit }
            )
          : await User.updateOne(
              { _id },
              { nickname, discount, $unset: { username: "", password: "", credit: "" } }
            );
        console.log("user is ", user);
        res.status(200).json(user);
      } catch (error) {
        console.log("error by catch controller putUser");
        responseError(res, 400, "error by catch controller putUser");
      }
    } else {
      responseError(res, 403, "protect api by token");
    }
  
}
