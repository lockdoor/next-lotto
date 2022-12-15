import { getUserById } from "../../../../../database/controller/user";
import { getToken } from "next-auth/jwt";
import { responseError, responseSuccess } from "../../../../../lib/responseJson";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token?.role === "admin") {
    switch (req.method) {
      case "GET":
        getUserById(req, res);
        break;
      
      default:
        res.setHeader("Allow", ["GET"]);
        // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}