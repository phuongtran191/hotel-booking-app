import { createReducer } from "@reduxjs/toolkit";
import {
  BOOKING_ACTION,
  FAILURE,
  REQUEST,
  SUCCESS
} from "redux/constants/index";

const initialState = {
  bookingList: {
    data: [],
    pagination: {
      _page: 1,
      _limit: 6,
      _totalRows: 4,
    },
    load: false,
    error: null,
  },
  bookingDetail: {
    data: {},
    load: false,
    error: null,
  },
};

const bookingReducer = createReducer(initialState, {
  [REQUEST(BOOKING_ACTION.GET_BOOKING_LIST)]: (state, action) => {
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        load: true,
      },
    };
  },
  [SUCCESS(BOOKING_ACTION.GET_BOOKING_LIST)]: (state, action) => {
    const { data } = action.payload;

    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(BOOKING_ACTION.GET_BOOKING_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        load: false,
        error,
      },
    }
  },
  ///////////////////////////////////////

  [REQUEST(BOOKING_ACTION.CREATE_BOOKING)]: (state, action) => {
    return {
      ...state,
      bookingDetail: {
        ...state.bookingDetail,
      }
    }
  },
  [SUCCESS(BOOKING_ACTION.CREATE_BOOKING)]: (state, action) => {
    const {
      data
    } = action.payload;

    return {
      ...state,
      bookingDetail: {
        data: data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(BOOKING_ACTION.CREATE_BOOKING)]: (state, action) => {
    const {
      error
    } = action.payload;
  
    return {
      ...state,
      bookingList: {
        ...action.payload.data,
        load: false,
        error: null,
      },
    };
  },

  // get filter list
  [REQUEST(BOOKING_ACTION.GET_FILTER_BOOKING_LIST)]: (state, action) => {
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        load: true,
      },
    };
  },
  [FAILURE(BOOKING_ACTION.GET_FILTER_BOOKING_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        load: false,
        error,
      },
    };
  },

  [REQUEST(BOOKING_ACTION.GET_BOOKING_DETAIL)]: (state, action) => {
    return {
      ...state,
      bookingDetail: {
        ...state.bookingDetail,
        load: true,
      },
    };
  },
  [SUCCESS(BOOKING_ACTION.GET_BOOKING_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      bookingDetail: {
        ...state.bookingDetail,
        data,
        load: false,
        error: null,
      },
    };
  },
  [FAILURE(BOOKING_ACTION.GET_BOOKING_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      bookingDetail: {
        ...state.bookingDetail,
        load: false,
        error,
      },
    }
  },
  // create = change status to "pending (booked)"
  [SUCCESS(BOOKING_ACTION.CREATE_BOOKING)]: (state, action) => {
    const { data } = action.payload;
    const newBookingList = [...state.bookingList.data];
    const bookingIndex = newBookingList.findIndex(
      (booking) => booking.id === data.id
    );
    newBookingList.splice(bookingIndex, 1, data);
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: newBookingList,
      },
    };
  },

  [SUCCESS(BOOKING_ACTION.CHECK_IN_BOOKING)]: (state, action) => {
    const { data } = action.payload;
    const newBookingList = [...state.bookingList.data];
    const bookingIndex = newBookingList.findIndex(
      (booking) => booking.id === data.id
    );
    newBookingList.splice(bookingIndex, 1, data);
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: newBookingList,
      },
    };
  },
  [SUCCESS(BOOKING_ACTION.CHECK_OUT_BOOKING)]: (state, action) => {
    const { data } = action.payload;
    const newBookingList = [...state.bookingList.data];
    const bookingIndex = newBookingList.findIndex(
      (booking) => booking.id === data.id
    );
    newBookingList.splice(bookingIndex, 1, data);
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: newBookingList,
      },
    };
  },
  [SUCCESS(BOOKING_ACTION.CANCEL_BOOKING)]: (state, action) => {
    const { data } = action.payload;
    const newBookingList = [...state.bookingList.data];
    const bookingIndex = newBookingList.findIndex(
      (booking) => booking.id === data.id
    );
    newBookingList.splice(bookingIndex, 1, data);
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: newBookingList,
      },
    };
  },

  // [SUCCESS(BOOKING_ACTION.DELETE_BOOKING)]: (state, action) => {
  //   const { id } = action.payload;
  //   const newBookingList = [...state.bookingList.data];
  //   const bookingIndex = newBookingList.findIndex((booking) => booking.id === id);
  //   newBookingList.splice(bookingIndex, 1);
  //   return {
  //     ...state,
  //     bookingList: {
  //       ...state.bookingList,
  //       data: newBookingList,
  //     },
  //   };
  // },

  [SUCCESS(BOOKING_ACTION.PENDING_BOOKING)]: (state, action) => {
    const { data } = action.payload;
    const newBookingList = [...state.bookingList.data];
    const bookingIndex = newBookingList.findIndex(
      (booking) => booking.id === data.id
    );
    newBookingList.splice(bookingIndex, 1, data);
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: newBookingList,
      },
    };
  },


  [SUCCESS(BOOKING_ACTION.EDIT_BOOKING)]: (state, action) => {
    const { data } = action.payload;
    const newBookingList = [...state.bookingList.data];
    const bookingIndex = newBookingList.findIndex((booking) => booking.id === data.id);
    newBookingList.splice(bookingIndex, 1, data);
    return {
      ...state,
      bookingList: {
        ...state.bookingList,
        data: newBookingList,
        
      },
    };
  },
});

export default bookingReducer;
