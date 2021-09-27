import { createAction } from "@reduxjs/toolkit";
import { LOCATION_ACTION, REQUEST } from "redux/constants";

export const getLocationListAction = createAction(REQUEST(LOCATION_ACTION.GET_LOCATION_LIST));
export const createLocationAction = createAction(REQUEST(LOCATION_ACTION.CREATE_LOCATION));
export const editLocationAction = createAction(REQUEST(LOCATION_ACTION.EDIT_LOCATION));
export const deleteLocationAction = createAction(REQUEST(LOCATION_ACTION.DELETE_LOCATION));