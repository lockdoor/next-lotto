const BASE_URL = "/api";
import axios from "axios";

export async function getWinByLottoDateId({ queryKey }) {
  const [_, lottoDateId] = queryKey;
  const response = await axios
    .get(`${BASE_URL}/admin/win/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function postWin(payload) {
  const response = await axios
    .post(`${BASE_URL}/admin/win/`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getWinnerByLottoDateIdAndTypeAndNumberString({
  queryKey,
}) {
  const [_, lottoDateId, type, numberString] = queryKey;
  const response = await axios
    .get(`${BASE_URL}/admin/win/${lottoDateId}/${type}/${numberString}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function putWin(payload) {
  const response = await axios
    .put(`${BASE_URL}/admin/win`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  console.log(response)
  return response;
}
