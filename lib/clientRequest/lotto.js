const BASE_URL = "/api";
import axios from "axios";

export async function getLottos() {
  const response = await axios
    .get(`${BASE_URL}/admin/lotto`)
    .then((res) => res.data)
    .catch((error) => error.response);
  // console.log(response)
  return response;
}

export async function postLotto(payload) {
  // console.log(playload)
  const response = await axios
    .post(`${BASE_URL}/admin/lotto`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function putLotto(payload) {
  console.log(payload);
  const response = await axios
    .put(`${BASE_URL}/admin/lotto`, payload)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}

export async function deleteLotto(_id) {
  // console.log('from delete lotto', {_id})
  const response = await axios
    .delete(`${BASE_URL}/admin/lotto/${_id}`)
    .then((res) => res.data)
    .catch((error) => error.response);
  return response;
}