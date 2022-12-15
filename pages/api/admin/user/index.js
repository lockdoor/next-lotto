import {
  postUser,
  getUsers,
  putUser,
} from "../../../../database/controller/user";
import { getToken } from "next-auth/jwt";
import { responseError, responseSuccess } from "../../lib/responseJson";

export default function handler(req, res) {
  const token = await getToken({ req });
  if (token?.role === "admin") {
    switch (req.method) {
      case "POST":
        postUser(req, res);
        break;
      case "GET":
        getUsers(req, res);
        break;
      case "PUT":
        putUser(req, res);
        break;
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT"]);
        // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}
