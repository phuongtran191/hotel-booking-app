import { API } from "./constants.api";
import queryString from "query-string"
import { URL_API } from "Api";


export const DiscountAPI = {
  getDiscountList:()=>API.get(`${URL_API}/discounts`),
  checkDiscount:(name)=>API.get(`${URL_API}/discounts?name=${name}`),
  getDiscountDetail: (id,params)=>API.get(`${URL_API}/discounts/${id}?${queryString.stringify(params)}`),
  getFilterDiscountList:(params)=> API.get(`${URL_API}/discounts?${queryString.stringify(params)}`),
  addDiscountToList:(data) => API.post(`${URL_API}/discounts`,data),
  deleteDiscountInList: (id)=> API.delete(`${URL_API}/discounts`,id),
  editDiscountInList:(id,data)=> API.patch(`${URL_API}/discounts`,id,data),
  
}