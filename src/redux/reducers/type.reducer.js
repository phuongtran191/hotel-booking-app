import {
  createReducer
} from "@reduxjs/toolkit";
import {
  TYPE_ACTION,
  FAILURE,
  REQUEST,
  SUCCESS
} from "redux/constants";


const initialState = {
  typeList: {
    data: [],
    pagination: {
      _page: 1,
      _limit: 4,
      _totalRows: 5
    },
    load: false,
    error: null,
  },
  typeDetail: {
    data: {
      images: [],
    },
    load: false,
    error: null,
  },
  commentList: {
    data: [],
    load: false,
    error: null,
  },
  roomVariableList: {
    data: {},
    checkIn: null,
    checkOut: null,
    guest: null,
    load: false,
    error: null,
  }
};

const typeReducer = createReducer(initialState, {
  // get list
  [REQUEST(TYPE_ACTION.GET_TYPE_LIST)]: (state, action) => {
    return {
      ...state,
      typeList: {
        ...state.typeList,
        load: true,
      },
    };
  },
  [SUCCESS(TYPE_ACTION.GET_TYPE_LIST)]: (state, action) => {
    const {
      data
    } = action.payload;
    return {
      ...state,
      typeList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(TYPE_ACTION.GET_TYPE_LIST)]: (state, action) => {
    const {
      error
    } = action.payload;
    return {
      ...state,
      typeList: {
        ...state.typeList,
        load: false,
        error,
      },
    }
  },
  // get filter list
  [REQUEST(TYPE_ACTION.GET_FILTER_TYPE_LIST)]: (state, action) => {
    return {
      ...state,
      typeList: {
        ...state.typeList,
        load: true,
      },
    };
  },
  [SUCCESS(TYPE_ACTION.GET_FILTER_TYPE_LIST)]: (state, action) => {
    const {data} = action.payload;
    return {
      ...state,
      typeList: {
        ...state.typeList,
        data: data.data,
        // pagination: data.pagination,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(TYPE_ACTION.GET_FILTER_TYPE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      typeList: {
        ...state.typeList,
        load: false,
        error,
      },
    }
  },
  // get detail
  [REQUEST(TYPE_ACTION.GET_TYPE_DETAIL)]: (state, action) => {
    return {
      ...state,
      typeDetail: {
        ...state.typeDetail,
        load: true,
      },
    };
  },
  [SUCCESS(TYPE_ACTION.GET_TYPE_DETAIL)]: (state, action) => {
    const {
      data
    } = action.payload;
    return {
      ...state,
      typeDetail: {
        ...state.typeDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(TYPE_ACTION.GET_TYPE_DETAIL)]: (state, action) => {
    const {
      error
    } = action.payload;
    return {
      ...state,
      typeDetail: {
        ...state.typeDetail,
        load: false,
        error,
      },
    }
  },
  [SUCCESS(TYPE_ACTION.CREATE_TYPE)]: (state, action) => {
    const {
      data
    } = action.payload;
    return {
      ...state,
      typeList: {
        ...state.typeList,
        data: [
          data,
          ...state.typeList.data,
        ],
        load: false,
      },
    }
  },
  [SUCCESS(TYPE_ACTION.EDIT_TYPE)]: (state, action) => {
    const {
      data
    } = action.payload;
    const newTypeList = [...state.typeList.data];
    const typeIndex = newTypeList.findIndex((type) => type.id === data.id);
    newTypeList.splice(typeIndex, 1, data);
    return {
      ...state,
      typeList: {
        ...state.typeList,
        data: newTypeList,
      },
    };
  },

  [SUCCESS(TYPE_ACTION.DELETE_TYPE)]: (state, action) => {
    const {
      id
    } = action.payload;
    const newTypeList = [...state.typeList.data];
    const typeIndex = newTypeList.findIndex((type) => type.id === id);
    newTypeList.splice(typeIndex, 1);
    return {
      ...state,
      typeList: {
        ...state.typeList,
        data: newTypeList,
      },
    };
  },
  [REQUEST(TYPE_ACTION.ADD_COMMENT)]: (state, action) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: true,
      },
    };
  },
  [SUCCESS(TYPE_ACTION.ADD_COMMENT)]: (state, action) => {

    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(TYPE_ACTION.ADD_COMMENT)]: (state, action) => {
    const {
      error
    } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error,
      },
    }
  },

  [REQUEST(TYPE_ACTION.GET_LIST_COMMENT)]: (state, action) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: true,
      },
    };
  },
  [SUCCESS(TYPE_ACTION.GET_LIST_COMMENT)]: (state, action) => {
    const {
      data
    } = action.payload;
    return {
      ...state,
      commentList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(TYPE_ACTION.GET_LIST_COMMENT)]: (state, action) => {
    const {
      error
    } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        load: false,
        error,
      },
    }
  },
  [TYPE_ACTION.GET_ROOM_VARIABLE_LIST]: (state, action) => {
    console.log(action.payload)
    const {
      data,
      checkIn,
      checkOut,
      guest
    } = action.payload;
    return {
      ...state,
      roomVariableList: {
        data,
        checkOut,
        checkIn,
        guest,
        load: false,
        error: null,
      },
    }
  },
  [TYPE_ACTION.CLEAR_TYPE_ROOM_VARIABLE]: (state, action) => {
    
    return {
      ...state,
      roomVariableList: {
        data:{},
        checkOut:null,
        checkIn:null,
        guest:null,
        load: false,
        error: null,
      },
    }
  },
});

export default typeReducer;