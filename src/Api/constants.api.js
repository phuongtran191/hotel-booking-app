import axios from "axios";

export const API = {
  get: (url) => axios.get(url),
  post: (url, data) => axios.post(url, data),
  patch: (url, id, data, params) => axios.patch(`${url}/${id}?${params}`, data),
  delete: (url, id) => axios.delete(`${url}/${id}`),
}