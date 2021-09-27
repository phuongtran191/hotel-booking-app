import { createAction } from "@reduxjs/toolkit";
import { REQUEST, USER_ACTION } from "redux/constants";


export const loginAction = createAction(REQUEST(USER_ACTION.LOGIN));
export const logoutAction = createAction(REQUEST(USER_ACTION.LOGOUT));
export const registerAction = createAction(REQUEST(USER_ACTION.REGISTER));
export const checkLoginAction = createAction(REQUEST(USER_ACTION.CHECK_LOGIN));

export const getUserListAction = createAction(REQUEST(USER_ACTION.GET_USER_LIST));
export const getFilterUserListAction = createAction(REQUEST(USER_ACTION.GET_FILTER_USER_LIST));
export const getUserDetailAction = createAction(REQUEST(USER_ACTION.GET_USER_DETAIL));
export const createUserAction = createAction(REQUEST(USER_ACTION.CREATE_USER));
export const editUserAction = createAction(REQUEST(USER_ACTION.EDIT_USER));