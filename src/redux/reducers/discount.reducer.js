import { createReducer } from "@reduxjs/toolkit";
import { DISCOUNT_ACTION, FAILURE, REQUEST, SUCCESS } from "redux/constants";


const initialState = {
  discountList: {
    data: [],
    load: false,
    error: null,
  },
  discountDetail:{
    data: {},
    load: false,
    error: null,
  }
};

const discountReducer = createReducer(initialState, {
  [REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state, action) => {
    return {
      ...state,
      discountList: {
        ...state.discountList,
        load: true,
      },
    };
  },
  [SUCCESS(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      discountList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      discountList: {
        ...state.discountList,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(DISCOUNT_ACTION.CREATE_DISCOUNT)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      discountList: {
        ...state.discountList,
        data: [
          data,
          ...state.discountList.data,
        ],
      },
    }
  },

  [SUCCESS(DISCOUNT_ACTION.EDIT_DISCOUNT)]: (state, action) => {
    const { data } = action.payload;
    const newDiscountList = [...state.discountList.data];
    const discountIndex = newDiscountList.findIndex((discount) => discount.id === data.id);
    newDiscountList.splice(discountIndex, 1, data);
    return {
      ...state,
      discountList: {
        ...state.discountList,
        data: newDiscountList,
      },
    };
  },

  [SUCCESS(DISCOUNT_ACTION.DELETE_DISCOUNT)]: (state, action) => {
    const { id } = action.payload;
    const newDiscountList = [...state.discountList.data];
    const discountIndex = newDiscountList.findIndex((discount) => discount.id === id);
    newDiscountList.splice(discountIndex, 1);
    return {
      ...state,
      discountList: {
        ...state.discountList,
        data: newDiscountList,
      },
    };
  },
  [REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_DETAIL)]: (state, action) => {
    return {
      ...state,
      discountDetail: {
        ...state.discountDetail,
        load: true,
      },
    };
  },
  [SUCCESS(DISCOUNT_ACTION.GET_DISCOUNT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      discountDetail: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(DISCOUNT_ACTION.GET_DISCOUNT_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      discountDetail: {
        ...state.discountDetail,
        load: false,
        error,
      },
    }
  },

  [REQUEST(DISCOUNT_ACTION.GET_FILTER_DISCOUNT_LIST)]: (state, action) => {
    return {
      ...state,
      discountList: {
        ...state.discountList,
        load: true,
      },
    };
  },
  [SUCCESS(DISCOUNT_ACTION.GET_FILTER_DISCOUNT_LIST)]: (state, action) => {
    const {data} = action.payload;
    return {
      ...state,
      discountList: {
        ...state.discountList,
        data,
        // pagination: data.pagination,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(DISCOUNT_ACTION.GET_FILTER_DISCOUNT_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      discountList: {
        ...state.discountList,
        load: false,
        error,
      },
    }
  },

});

export default discountReducer;