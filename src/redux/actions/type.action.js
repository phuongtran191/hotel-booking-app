import { createAction } from "@reduxjs/toolkit";
import { TYPE_ACTION, REQUEST } from "redux/constants";


export const getFilterTypeListAction = createAction(REQUEST(TYPE_ACTION.GET_FILTER_TYPE_LIST));
export const getCommentListAction = createAction(REQUEST(TYPE_ACTION.GET_LIST_COMMENT));

export const getTypeListAction = createAction(REQUEST(TYPE_ACTION.GET_TYPE_LIST));
export const getTypeDetailAction = createAction(REQUEST(TYPE_ACTION.GET_TYPE_DETAIL));
export const createTypeAction = createAction(REQUEST(TYPE_ACTION.CREATE_TYPE));
export const editTypeAction = createAction(REQUEST(TYPE_ACTION.EDIT_TYPE));
export const deleteTypeAction = createAction(REQUEST(TYPE_ACTION.DELETE_TYPE));
export const addCommentAction = createAction(REQUEST(TYPE_ACTION.ADD_COMMENT));

export const getRoomVariable = createAction(TYPE_ACTION.GET_ROOM_VARIABLE_LIST);
export const clearRoomVariableAction = createAction(TYPE_ACTION.CLEAR_TYPE_ROOM_VARIABLE);