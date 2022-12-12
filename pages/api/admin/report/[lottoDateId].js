import { getAllBetsGroupNumberTotalPrice } from "../../../../database/controller/report"

export default async function handler(req, res){
  // const {lottoDateId} = req.query

  // console.log(req.query)

  switch(req.method){
    // case 'POST': 
    //   postBet(req, res)
    //   break
    case 'GET': 
      getAllBetsGroupNumberTotalPrice(req, res)
      break
    // case 'PUT': 
    //   putBet(req, res)
    //   break
    // case 'DELETE': 
    //   deleteBet(req, res)
    //   break
    default:
      res.setHeader('Allow', ['GET'])
      // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
  
}