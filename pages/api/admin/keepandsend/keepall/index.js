import { postKeepAll, putKeepAll, deleteKeepAll } from "../../../../../database/controller/keepandsend"

export default async function handler(req, res){
  switch(req.method){
    case 'POST': 
      postKeepAll(req, res)
      break
    case 'PUT': 
      putKeepAll(req, res)
      break
    // case 'GET': 
    //   getKeepAllByTypeAndLottoDateId(req, res)
    //   break
    case 'DELETE': 
      deleteKeepAll(req, res)
      break
    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE'])
      // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}