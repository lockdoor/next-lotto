import { postWin } from "../../../../database/controller/win"

export default async function handler(req, res){
  switch(req.method){
    case 'POST': 
      postWin(req, res)
      break
    // case 'GET': 
    // getWinByLottoDateId(req, res)
    //   break
    // case 'PUT': 
    //   putLotto(req, res)
    //   break
    // case 'DELETE': 
    //   deleteLotto(req, res)
    //   break
    default:
      res.setHeader('Allow', ['POST'])
      // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}