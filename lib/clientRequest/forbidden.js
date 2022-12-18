const BASE_URL = "/api";
import axios from "axios";

export async function postForbidden(payload) {
  const response = await axios
    .post(`${BASE_URL}/admin/forbidden`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

export async function putForbidden(payload) {
  const response = await axios
    .put(`${BASE_URL}/admin/forbidden`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

export async function deleteForbidden(payload) {
  const response = await axios
    .delete(`${BASE_URL}/admin/forbidden`, { data: { ...payload }})
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

export async function getForbiddenByLottoDateId({ queryKey }) {
  // console.log(queryKey)
  const [_, lottoDateId] = queryKey;
  if(!lottoDateId) return
  const response = await axios
    .get(`${BASE_URL}/admin/forbidden/${lottoDateId}`)
    .then((res) => {
      // const forbidden = res.data.map((e) => ({
      //   date: e.date,
      //   numberString: e.numberString,
      //   type: e.type,
      //   _id: e._id,
      // }));
      // localStorage.setItem("forbidden", JSON.stringify(forbidden));
      return res.data;
    })
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

export async function getBetByForbiddenNumber({ queryKey }) {
  const [_, numberString] = queryKey;
  const response = await axios
    .get(`${BASE_URL}/admin/forbidden/getBet/${numberString}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function deleteBet(_id) {
  const response = await axios
    .delete(`${BASE_URL}/admin/bet`, { data: { _id } })
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}