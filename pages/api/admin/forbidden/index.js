import { postForbidden, putForbidden, deleteForbidden } from "../../../../database/controller/forbidden";
import { getToken } from "next-auth/jwt";
import { responseError } from "../../../../lib/responseJson";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token.role === "admin") {
    switch (req.method) {
      case "POST":
        postForbidden(req, res);
        break;
      case "PUT":
        putForbidden(req, res);
        break;
      case "DELETE":
        deleteForbidden(req, res);
        break;
      default:
        res.setHeader("Allow", ["POST", 'PUT', 'DELETE']);
        // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}
