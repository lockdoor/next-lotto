import { postLotto, getLottos, putLottoDate, deleteLotto} from '../../../../database/controller/lotto'
import { getToken } from "next-auth/jwt";
import { responseError } from "../../../../lib/responseJson";
export default async function handler(req, res){
  const token = await getToken({req})
  if(token?.role === "admin"){
    switch(req.method){
      case 'POST': 
        postLotto(req, res)
        break
      case 'GET': 
        getLottos(req, res)
        break
      case 'PUT': 
        putLottoDate(req, res)
        break
      case 'DELETE': 
        deleteLotto(req, res)
        break
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
        break
    }
  } else {
    responseError(res, 403, "protect api by token");
  }
}