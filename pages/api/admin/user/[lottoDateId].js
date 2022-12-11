import { getUsersWithTotalBetByLottoDateId } from "../../../../database/controller/user";

export default function handler(req, res) {
  switch (req.method) {
    // case 'POST' :
    //   postUser(req, res)
    //   break
    case "GET":
      getUsersWithTotalBetByLottoDateId(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
