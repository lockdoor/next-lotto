import { getKeepAndSendDataByTypeAndLottoDateId } from "../../../../database/controller/keepandsend";
import { getToken } from "next-auth/jwt";
import { responseError } from "../../../../lib/responseJson";

export default async function handler(req, res) {
  const token = await getToken({ req });
  if (token.role === "admin") {
    switch (req.method) {
      case "GET":
        getKeepAndSendDataByTypeAndLottoDateId(req, res);
        break;
      default:
        res.setHeader("Allow", ["POST", "PUT", "DELETE"]);
        // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } else {
    responseError(
      res,
      403,
      "getKeepAndSendDataByTypeAndLottoDateId protect api by token"
    );
  }
}
