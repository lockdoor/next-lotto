import connectDB from "../../../../database/connectDB";
import User from "../../../../model/user";
import validateUser from "../../../../lib/validateUser";
import { responseError } from "../../../../lib/responseJson";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, password, nickname } = req.body;
      if (validateUser([username, password, nickname])) {
        await connectDB();
        const user = await User.findOne();
        if (user) {
          responseError(res, 400, "can not create user admin");
        } else {
          const passwordHass = await bcrypt.hash(password, 8);
          const admin = new User({
            username,
            password: passwordHass,
            nickname,
            role: 'admin'
          });
          const result = await admin.save();
          responseSuccess(res, 201, "create admin success");
        }
      } else {
        responseError(res, 400, "you sent wrong data");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT"]);
    // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
