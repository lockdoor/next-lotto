const BASE_URL = "/api";
import axios from "axios";

export async function getKeepAndSendDataByTypeAndLottoDateId({ queryKey }) {
  // const expect = [
  //   {
  //     numberString,
  //     totalPrice,
  //     type,
  //     keep,
  //     keepAll
  //   },
  // ];
  // console.log(queryKey)
  const [_, type, lottoDateId] = queryKey;
  const response = await axios
    .get(`${BASE_URL}/admin/keepandsend/${type}/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

// export async function getKeepAllByTypeAndLottoDateId({ queryKey }) {
//   const [_, type, lottoDateId] = queryKey;
//   const response = await axios
//     .get(`${BASE_URL}/admin/keepandsend/keepall/${type}/${lottoDateId}`)
//     .then((res) => res.data)
//     .catch((error) => error.response);
//   // console.log(response)
//   return response;
// }

// payload = {type, date, price}
export async function postKeepAll(payload) {
  const response = await axios
    .post(`${BASE_URL}/admin/keepandsend/keepall`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

// payload = {_id, price}
export async function putKeepAll(payload) {
  const response = await axios
    .put(`${BASE_URL}/admin/keepandsend/keepall`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

export async function deleteKeepAll(_id) {
  const response = await axios
    .delete(`${BASE_URL}/admin/keepandsend/keepall`, { data: { _id } })
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

// export async function getKeepByTypeAndLottoDateId({ queryKey }) {
//   const [_, type, lottoDateId] = queryKey;
//   const response = await axios
//     .get(`${BASE_URL}/admin/keepandsend/keepone/${type}/${lottoDateId}`)
//     .then((res) => res.data)
//     .catch((error) => error.response);
//   return response;
// }

// [type, numberString, price, lottoDateId] = payload
export async function postKeepByTypeNumberLottoDateId(payload) {
  const response = await axios
    .post(`${BASE_URL}/admin/keepandsend/keepone`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

// payload = {_id, price}
export async function putKeep(payload) {
  const response = await axios
    .put(`${BASE_URL}/admin/keepandsend/keepone`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

export async function deleteKeep(_id) {
  const response = await axios
    .delete(`${BASE_URL}/admin/keepandsend/keepone`, { data: { _id } })
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}