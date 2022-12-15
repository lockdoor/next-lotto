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