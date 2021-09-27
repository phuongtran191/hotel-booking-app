import { createReducer } from "@reduxjs/toolkit";
import { IMAGE_ACTION, FAILURE, REQUEST, SUCCESS } from "redux/constants";


const initialState = {
  image:{
    url: {},
    load: false,
    error: null,
  }
};
export const imageReducer = createReducer(initialState,{
  [REQUEST(IMAGE_ACTION.ADD)]: (state, action) => {
    return {
      ...state,
      image: {
        ...state.image,
        load: true,
      },
    };
  },
  [SUCCESS(IMAGE_ACTION.ADD)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      image: {
        url:data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(IMAGE_ACTION.ADD)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      image: {
        ...state.image,
        load: false,
        error,
      },
    }
  },
})