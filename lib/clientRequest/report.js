const BASE_URL = "/api";
import axios from "axios";

export async function getAllBetsGroupNumberTotalPrice({ queryKey }) {
  const [_, lottoDateId] = queryKey;
  if(!lottoDateId) return
  const response = await axios
    .get(`${BASE_URL}/admin/report/${lottoDateId}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function getNumberDetail({ queryKey }) {
  const [_, lottoDateId, type, numberString] = queryKey;
  const response = await axios
    .get(`${BASE_URL}/admin/report/${lottoDateId}/${type}/${numberString}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}