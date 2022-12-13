import connectDB from "../connectDB";
import KeepAll from "../../model/keepAll";
import Keep from "../../model/keep";
import Bet from "../../model/bet";
import { getToken } from "next-auth/jwt";
import { responseError, responseSuccess } from "../../lib/responseJson";

export async function getKeepAndSendDataByTypeAndLottoDateId(req, res) {
  console.log("getKeepAndSendDataByTypeAndLottoDateId", req.query.params);
  const [type, lottoDateId] = req.query.params;
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const keepAll = await KeepAll.findOne(
        { type: type, date: lottoDateId },
        "price"
      ).exec();
      const keep = await Keep.find(
        { type: type, date: lottoDateId },
        "price numberString"
      ).exec();
      const result = await Bet.aggregate([
        {
          $match: {
            type,
            $expr: { $eq: ["$date", { $toObjectId: lottoDateId }] },
          },
        },
        {
          $group: { _id: "$numberString", totalPrice: { $sum: "$price" } },
        },
        { $sort: { _id: 1 } },
      ]);

      const response = result.map((e) => {
        const matchKeep = keep.find((k) => k.numberString === e._id)
        return ({
          numberString: e._id,
          totalPrice: e.totalPrice,
          type: type,
          keepAll: keepAll,
          keep: matchKeep ? matchKeep : {price: 0},
          send: e.totalPrice - (keepAll ? keepAll.price : 0) - (matchKeep ? matchKeep.price : 0)
          })});

      // console.log(response);
      // responseSuccess(res, 200, "delete bet success");
      res.status(200).json(response);
    } catch (error) {
      console.log("getKeepAndSendDataByTypeAndLottoDateId error by catch", error);
      responseError(res, 400, "getKeepAndSendDataByTypeAndLottoDateId error by catch");
    }
  } else {
    responseError(res, 403, "getKeepAndSendDataByTypeAndLottoDateId protect api by token");
  }
}

export async function getKeepAllByTypeAndLottoDateId(req, res) {
  const [type, lottoDateId] = req.query.params;
  console.log("by getKeepAllByTypeAndLottoDateId ", { type, lottoDateId });
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await KeepAll.findOne({ type: type, date: lottoDateId });
      // console.log('result is ', result)
      // responseSuccess(res, 201, 'create success')
      res.status(200).json(result);
    } catch (error) {
      console.log(
        "error by catch controller getKeepAllByTypeAndLottoDateId",
        error
      );
      responseError(
        res,
        400,
        "error by catch controller getKeepAllByTypeAndLottoDateId"
      );
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function postKeepAll(req, res) {
  console.log("by postKeepAll", req.body);
  // const {type, date, price} = req.body
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await KeepAll.create(req.body);
      // console.log('postKeepAll result is ', result)
      responseSuccess(res, 201, "create success");
      // res.status(200).json(result)
    } catch (error) {
      console.log("error by catch controller postKeepAll", error);
      responseError(res, 400, "error by catch controller postKeepAll");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function putKeepAll(req, res) {
  console.log("by putKeepAll", req.body);
  const { _id, price } = req.body;
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await KeepAll.updateOne({ _id: _id }, { price: price });
      // console.log('postKeepAll result is ', result)
      responseSuccess(res, 201, "create success");
      // res.status(200).json(result)
    } catch (error) {
      console.log("error by catch controller putKeepAll", error);
      responseError(res, 400, "error by catch controller putKeepAll");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function deleteKeepAll(req, res) {
  console.log("by deleteKeepAll", req.body);
  const { _id } = req.body;
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await KeepAll.deleteOne({ _id: _id });
      // console.log('postKeepAll result is ', result)
      responseSuccess(res, 201, "delete success");
      // res.status(200).json(result)
    } catch (error) {
      console.log("error by catch controller deleteKeepAll", error);
      responseError(res, 400, "error by catch controller deleteKeepAll");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function getKeepByTypeAndLottoDateId(req, res) {
  const [type, lottoDateId] = req.query.params;
  console.log("by getKeepByTypeAndLottoDateId ", { type, lottoDateId });
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Keep.find({ type: type, date: lottoDateId });
      // console.log('result is ', result)
      // responseSuccess(res, 201, 'create success')
      res.status(200).json(result);
    } catch (error) {
      console.log(
        "error by catch controller getKeepByTypeAndLottoDateId",
        error
      );
      responseError(
        res,
        400,
        "error by catch controller getKeepByTypeAndLottoDateId"
      );
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function postKeepByTypeNumberLottoDateId(req, res) {
  // console.log(req.body)
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Keep.create(req.body);
      // console.log('result is ', result)
      // responseSuccess(res, 201, 'create success')
      res.status(200).json(result);
    } catch (error) {
      console.log(
        "error by catch controller getKeepByTypeAndLottoDateId",
        error
      );
      responseError(
        res,
        400,
        "error by catch controller getKeepByTypeAndLottoDateId"
      );
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function putKeep(req, res) {
  console.log("by putKeep", req.body);
  const { _id, price } = req.body;
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Keep.updateOne({ _id: _id }, { price: price });
      // console.log('postKeepAll result is ', result)
      responseSuccess(res, 201, "create success");
      // res.status(200).json(result)
    } catch (error) {
      console.log("error by catch controller putKeep", error);
      responseError(res, 400, "error by catch controller putKeep");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}

export async function deleteKeep(req, res) {
  console.log("by deleteKeepAll", req.body);
  const { _id } = req.body;
  const token = await getToken({ req });
  if (token.role === "admin") {
    try {
      await connectDB();
      const result = await Keep.deleteOne({ _id: _id });
      // console.log('postKeepAll result is ', result)
      responseSuccess(res, 201, "delete success");
      // res.status(200).json(result)
    } catch (error) {
      console.log("error by catch controller deleteKeepAll", error);
      responseError(res, 400, "error by catch controller deleteKeepAll");
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}
