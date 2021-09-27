import { URL_API } from "Api";
import { API } from "./constants.api";

export const authAPI={
  login: (data)=> API.post(`${URL_API}/login`,data),
  register: (data)=>API.post(`${URL_API}/register`,data),
  
}