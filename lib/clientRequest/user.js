const BASE_URL = "/api";
import axios from "axios";

export async function getUsersWithTotalBetByLottoDateId({ queryKey }) {
  const [_, lottoDateId] = queryKey;
  // console.log(lottoDateId);
  const response = await axios
    .get(`${BASE_URL}/admin/user/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function postUser(payload) {
  const response = await axios
    .post(`${BASE_URL}/admin/user`, payload)
    .then((response) => response)
    .catch((error) => error.response);
  return response;
}

export async function putUser(payload){
  const response = axios
    .put(`${BASE_URL}/admin/user`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getUserById({ queryKey }){
  const [_, userId] = queryKey
  // console.log(queryKey)
  const response = axios
    .get(`${BASE_URL}/admin/user/userId/${userId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getUsers() {
  const response = await axios
    .get(`${BASE_URL}/admin/user`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getUserBetDetail({ queryKey }) {
  const [_, lottoDateId, _id ] = queryKey;
  const response = await axios
    .get(`${BASE_URL}/admin/user/betDetail/${lottoDateId}/${_id}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}