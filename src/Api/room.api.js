import { API } from "./constants.api";
import queryString from "query-string"
import { URL_API } from "Api";


export const RoomAPI = {
  getRoomList:()=>API.get(`${URL_API}/rooms`),
  getRoomDetail: (id,params)=>API.get(`${URL_API}/rooms/${id}?${queryString.stringify(params)}`),
  getFilterRoomList:(params)=> API.get(`${URL_API}/rooms?${queryString.stringify(params)}`),
  addRoomToList:(data) => API.post(`${URL_API}/rooms`,data),
  deleteRoomInList: (id)=> API.delete(`${URL_API}/rooms`,id),
  editRoomInList:(id,data)=> API.patch(`${URL_API}/rooms`,id,data),
  
}