const BASE_URL = "/api";
import axios from "axios";

export async function getBetsLasted20() {
  const response = await axios
    .get(`${BASE_URL}/admin/bet`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function postBet(payload) {
  // console.log(payload)
  const response = await axios
    .post(`${BASE_URL}/admin/bet`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}