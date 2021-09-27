import { createAction } from "@reduxjs/toolkit";
import { REQUEST, ROOM_ACTION } from "redux/constants/index";

export const getRoomListAction = createAction(REQUEST(ROOM_ACTION.GET_ROOM_LIST));
export const getFilterRoomListAction = createAction(REQUEST(ROOM_ACTION.GET_FILTER_ROOM_LIST))
// export const getRoomDetailAction = createAction(REQUEST(ROOM_ACTION.GET_ROOM_DETAIL));
export const createRoomAction = createAction(REQUEST(ROOM_ACTION.CREATE_ROOM));
export const editRoomAction = createAction(REQUEST(ROOM_ACTION.EDIT_ROOM));
export const deleteRoomAction = createAction(REQUEST(ROOM_ACTION.DELETE_ROOM));