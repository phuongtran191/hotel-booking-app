import { createReducer } from "@reduxjs/toolkit";
import { LOCATION_ACTION, FAILURE, REQUEST, SUCCESS } from "redux/constants";


const initialState = {
  locationList: {
    data: [],
    load: false,
    error: null,
  },
};

const locationReducer = createReducer(initialState, {
  [REQUEST(LOCATION_ACTION.GET_LOCATION_LIST)]: (state, action) => {
    return {
      ...state,
      locationList: {
        ...state.locationList,
        load: true,
      },
    };
  },
  [SUCCESS(LOCATION_ACTION.GET_LOCATION_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      locationList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(LOCATION_ACTION.GET_LOCATION_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      locationList: {
        ...state.locationList,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(LOCATION_ACTION.CREATE_LOCATION)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      locationList: {
        ...state.locationList,
        data: [
          data,
          ...state.locationList.data,
        ],
      },
    }
  },

  [SUCCESS(LOCATION_ACTION.EDIT_LOCATION)]: (state, action) => {
    const { data } = action.payload;
    const newLocationList = [...state.locationList.data];
    const locationIndex = newLocationList.findIndex((location) => location.id === data.id);
    newLocationList.splice(locationIndex, 1, data);
    return {
      ...state,
      locationList: {
        ...state.locationList,
        data: newLocationList,
      },
    };
  },

  [SUCCESS(LOCATION_ACTION.DELETE_LOCATION)]: (state, action) => {
    const { id } = action.payload;
    const newLocationList = [...state.locationList.data];
    const locationIndex = newLocationList.findIndex((location) => location.id === id);
    newLocationList.splice(locationIndex, 1);
    return {
      ...state,
      locationList: {
        ...state.locationList,
        data: newLocationList,
      },
    };
  },
});

export default locationReducer;