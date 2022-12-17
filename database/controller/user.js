import connectDB from "../connectDB";
import User from "../../model/user";
import Bet from "../../model/bet";
import Discount from "../../model/discount";
import Lotto from "../../model/lotto"
import validateUser from "../../lib/validateUser";
import { responseError, responseSuccess } from "../../lib/responseJson";
import bcrypt from "bcrypt";

export async function postUser(req, res) {
  console.log('post user work ', req.body)
  const { username, password, nickname, discount, credit, lottoDateId } =
    req.body;
  let newuser = undefined

  //สร้างผู้ใช้แบบเข้าระบบไม่ได้
  if (!username || !password) {
    // return postUserWithOutLoginAccount(req, res);
    if(!validateUser([nickname])){
      return responseError(res, 400, "you sent wrong data");
    }
    newuser = new User({nickname})
  }
  else{
    if (!validateUser([username, password, nickname])){
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
  // console.log(req.body);
    try {
      await connectDB();
      const user = await newuser.save();
      if(user) {
        if(discount) {
          await Discount.create({
            date: lottoDateId,
            user: user._id,
            discount: discount ? discount : 0,
          });
        }
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

export async function getUsersWithTotalBetByLottoDateId(req, res) {
  try {
    console.log("getUsersWithTotalBetByLottoDateId worked ", req.query);
    const { lottoDateId } = req.query;
    await connectDB();
    const lotto = await Lotto.findById(lottoDateId)
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
              }  
            } 
          ],        
        }
        
      },
      {
        $lookup: {
          from: "discounts",
          localField: "_id",
          foreignField: "user",
          as: "discount",
          pipeline: [ 
            {
              $lookup: {
                from: "lottos",
                localField: "date",
                foreignField: "_id",
                as: "date", 
                pipeline: [{
                  $project: {date: 1}
                },
              ]               
              },              
            }, 
            {
              $project: {
                date: 1, discount: 1  
              }
            }
          ]
        },
      },
      {
        $project: {
          _id: 1,
          nickname: 1,
          username: 1,
          discount: "$discount",
          role: 1,
          total: { $sum: "$bet.price" },
        },
      },
      {$sort: {total: -1}}
    ])

    const findDiscount = (arr) => {
      const newArr = arr.map(arr => ({
        _id: arr._id,
        date_id : arr.date[0]._id,
        date: arr.date[0].date,
        discount: arr.discount
      }))
      const time = (str) => new Date(str).getTime()
      newArr.sort((a, b) => time(b.date) - time(a.date))
      const result = newArr.find(e => time(e.date) <= time(lotto.date) )
      return result?.discount
    }
    const result = users.map(user => ({
      _id: user._id,
      nickname: user.nickname,
      username: user.username,
      role: user.role,
      total: user.total,
      discount: findDiscount(user.discount)

    })) 
    
    // console.log(result)

    res.status(200).json(result);
    // res.status(200).json(users);
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
    console.log('putLotto ทำงาน ข้อมูลที่ส่งมาคือ', req.body);
    const { _id, nickname, discount, username, password, credit, lottoDateId } = req.body;
    const passwordHass = password ? await bcrypt.hash(password, 8) : null;
    await connectDB();
    if(discount != 0){
      // console.log('มีข้อมูล discount ส่งมา ทำการค้นหาว่ามีข้อมูล discount ของงวดนั้นหรือยัง')
      const sameDate = await Discount.findOne({date: lottoDateId, user: _id})
      // console.log(sameDate)
      if(sameDate){
        // console.log('พบว่า discount ที่ส่งมาเป็นวันเดียวกัน')
        if(sameDate.discount !== discount){
          // console.log('มีการเปลี่ยนแปลงข้อมูล discount ให้ทำการ update')  
          await Discount.updateOne({_id: sameDate._id}, {discount: discount})
        }
      }
      else{
        // console.log('ไม่พบข้อมูล discount ของงวดหวย ทำการ create')
        await Discount.create({date: lottoDateId, user: _id, discount: discount})
      }      
    }else{
      // console.log('ไม่มีข้อมูล discount ส่งมา หรือ discount===0 ทำการลบ discount')
      await Discount.deleteOne({date: lottoDateId})
    }

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
            $unset: { username: "", password: ""},
          }
        );
    // console.log("user is ", user);
    res.status(200).json(user);
  } catch (error) {
    console.log("error by catch controller putUser");
    responseError(res, 400, "error by catch controller putUser");
  }
}
