import { createAction } from "@reduxjs/toolkit";
import { DISCOUNT_ACTION, REQUEST } from "redux/constants";

export const getDiscountListAction = createAction(REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST));
export const getFilterDiscountListAction = createAction(REQUEST(DISCOUNT_ACTION.GET_FILTER_DISCOUNT_LIST));
export const createDiscountAction = createAction(REQUEST(DISCOUNT_ACTION.CREATE_DISCOUNT));
export const editDiscountAction = createAction(REQUEST(DISCOUNT_ACTION.EDIT_DISCOUNT));
export const deleteDiscountAction = createAction(REQUEST(DISCOUNT_ACTION.DELETE_DISCOUNT));
export const getDiscountDetailAction=createAction(REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_DETAIL));