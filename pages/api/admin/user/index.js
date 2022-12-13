import { postUser, getUsers, putUser } from "../../../../database/controller/user"


export default function handler(req, res){

  switch(req.method){
    case 'POST' : 
      postUser(req, res)
      break
    case 'GET' : 
      getUsers(req, res)
      break
    case 'PUT' : 
      putUser(req, res)
      break
    default: 
      res.setHeader('Allow', ['POST', 'GET', 'PUT'])
      // res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      break
  }
}