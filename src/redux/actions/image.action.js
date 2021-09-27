import { createAction } from "@reduxjs/toolkit";
import { IMAGE_ACTION, REQUEST } from "redux/constants";

export const addImageUploadAction = createAction(REQUEST(IMAGE_ACTION.ADD));
export const deleteImageUploadAction = createAction(REQUEST(IMAGE_ACTION.DELETE));