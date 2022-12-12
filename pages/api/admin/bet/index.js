import { postBet, getBetsLasted20, deleteBet, putBet} from '../../../../database/controller/bet'

export default async function handler(req, res){
  switch(req.method){
    case 'POST': 
      postBet(req, res)
      break
    case 'GET': 
      getBetsLasted20(req, res)
      break
    case 'PUT': 
      putBet(req, res)
      break
    case 'DELETE': 
      deleteBet(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}