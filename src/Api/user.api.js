import { API } from "./constants.api";
import queryString from "query-string";
import { URL_API } from "Api";

export const UserAPI = {
  getUserList:()=>API.get(`${URL_API}/users`),
  getUserDetail: (id,params)=>API.get(`${URL_API}/users/${id}?${queryString.stringify(params)}`),
  getFilterUserList:(params)=> API.get(`${URL_API}/users?${queryString.stringify(params)}`),
  addUserToList:(data) => API.post(`${URL_API}/users`,data),
  editUserInList:(id,data)=> API.patch(`${URL_API}/users`,id,data),
}