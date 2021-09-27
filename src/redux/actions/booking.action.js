import { createAction } from "@reduxjs/toolkit";
import { BOOKING_ACTION, REQUEST } from "redux/constants";


export const getBookingListAction = createAction(REQUEST(BOOKING_ACTION.GET_BOOKING_LIST));
export const getFilterBookingListAction = createAction(REQUEST(BOOKING_ACTION.GET_FILTER_BOOKING_LIST));
export const getBookingDetailAction = createAction(REQUEST(BOOKING_ACTION.GET_BOOKING_DETAIL));
export const createBookingAction = createAction(REQUEST(BOOKING_ACTION.CREATE_BOOKING));
export const pendingBookingAction = createAction(REQUEST(BOOKING_ACTION.PENDING_BOOKING));
export const checkInBookingAction = createAction(REQUEST(BOOKING_ACTION.CHECK_IN_BOOKING));
export const checkOutBookingAction = createAction(REQUEST(BOOKING_ACTION.CHECK_OUT_BOOKING));
export const cancelBookingAction = createAction(REQUEST(BOOKING_ACTION.CANCEL_BOOKING));
export const editBookingAction = createAction(REQUEST(BOOKING_ACTION.EDIT_BOOKING));
