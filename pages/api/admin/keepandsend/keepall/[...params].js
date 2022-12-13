import { getKeepAllByTypeAndLottoDateId } from "../../../../../database/controller/keepandsend"

export default async function handler(req, res){
  switch(req.method){
    // case 'POST': 
    //   postLotto(req, res)
    //   break
    case 'GET': 
      getKeepAllByTypeAndLottoDateId(req, res)
      break
    default:
      res.setHeader('Allow', ['GET'])
      // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}