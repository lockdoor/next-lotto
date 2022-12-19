const BASE_URL = "/api";
import axios from "axios";

// export async function getLottoById({queryKey}){
//   // console.log(queryKey) 
//   const [_, _id] = queryKey
//   const response = await axios
//     .get(`${BASE_URL}/admin/dashboard/lottoSettings/${_id}`)
//     .then((res) => res.data)
//     .catch((error) => error.response);
//   return response;
// }

export async function putLottoSettings(payload){
  // console.log(payload)
  const response = await axios
    .put(`${BASE_URL}/admin/dashboard/lottoSettings`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getTotalBet({queryKey}){
  // console.log(queryKey)
  const [_, lottoDateId] = queryKey
  if(!lottoDateId) return
  const response = await axios
    .get(`${BASE_URL}/admin/dashboard/totalBet/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getBetDetail({queryKey}){
  // console.log(queryKey)
  const [_, lottoDateId] = queryKey
  if(!lottoDateId) return
  const response = await axios
    .get(`${BASE_URL}/admin/dashboard/betDetail/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getUserRange({queryKey}){
  const [_, lottoDateId] = queryKey
  if(!lottoDateId) return
  const response = await axios
    .get(`${BASE_URL}/admin/dashboard/userRange/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getNumberDetail({queryKey}){
  const [_, lottoDateId] = queryKey
  if(!lottoDateId) return
  const response = await axios
    .get(`${BASE_URL}/admin/dashboard/numberDetail/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}