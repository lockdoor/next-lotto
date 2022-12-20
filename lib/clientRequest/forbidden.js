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

export async function deleteForbidden(payload) {
  const response = await axios
    .delete(`${BASE_URL}/admin/forbidden`, { data: { ...payload }})
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getForbiddenByLottoDateId({ queryKey }) {
  const [_, lottoDateId] = queryKey;
  if(!lottoDateId) return
  const response = await axios
    .get(`${BASE_URL}/admin/forbidden/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getBetByForbiddenNumber({ queryKey }) {
  const [_, lottoDateId] = queryKey;
  const response = await axios
    .get(`${BASE_URL}/admin/forbidden/getBet/${lottoDateId}`)
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