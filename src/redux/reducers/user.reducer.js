import { createReducer } from "@reduxjs/toolkit";
import { USER_ACTION, FAILURE, REQUEST, SUCCESS } from "redux/constants";


const initialState = {
  userInfo:{
    data: JSON.parse(localStorage.getItem("userData"))||{},
    load: false,
    error: null,
  },
  userList:{
    data: [],
    // pagination: {
    //   _page: 1,
    //   _limit: 10,
    //   _totalRows: 5,
    // },
    load: false,
    error: null,
  },
  userDetail: {
    data: {},
    load: false,
    error: null,
  },
};

const userReducer = createReducer(initialState, {
  // Handle Login USER
  [REQUEST(USER_ACTION.LOGIN)]: (state, action) => {
    localStorage.removeItem("userData");
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    localStorage.setItem("userData",JSON.stringify(data));
    return {
      ...state,
      userInfo: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(USER_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: false,
        error,
      },
    }
  },
//register
  [REQUEST(USER_ACTION.REGISTER)]: (state, action) => {
    localStorage.removeItem("userData")
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(USER_ACTION.REGISTER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: false,
        error,
      },
    }
  },
  //logout
  [REQUEST(USER_ACTION.LOGOUT)]: (state, action) => {
    localStorage.removeItem("userData")
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.LOGOUT)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(USER_ACTION.LOGOUT)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        load: false,
        error,
      },
    }
  },

  // Handle USER-LIST ---------------
  [REQUEST(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    return {
      ...state,
      userList: {
        ...state.userList,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userList: {
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userList: {
        ...state.userList,
        load: false,
        error,
      },
    }
  },
  // get filter user
  [REQUEST(USER_ACTION.GET_FILTER_USER_LIST)]: (state, action) => {
    return {
      ...state,
      userList: {
        ...state.userList,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_FILTER_USER_LIST)]: (state, action) => {
    const {data} = action.payload;
    return {
      ...state,
      userList: {
        ...state.userList,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(USER_ACTION.GET_FILTER_USER_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userList: {
        ...state.userList,
        load: false,
        error,
      },
    }
  },

  // get detail
  [REQUEST(USER_ACTION.GET_USER_DETAIL)]: (state, action) => {
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        load: true,
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(USER_ACTION.GET_USER_DETAIL)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userDetail: {
        ...state.userDetail,
        load: false,
        error,
      },
    }
  },

  [SUCCESS(USER_ACTION.CREATE_USER)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userList: {
        ...state.userList,
        data: [
          data,
          ...state.userList.data,
        ],
        load: false,
      },
    }
  },

  [SUCCESS(USER_ACTION.EDIT_USER)]: (state, action) => {
    const { data } = action.payload;
    const newUserList = [...state.userList.data];
    const userIndex = newUserList.findIndex((user) => user.id === data.id);
    newUserList.splice(userIndex, 1, data);
    return {
      ...state,
      userList: {
        ...state.userList,
        data: newUserList,
      },
    };
  },
  
});

export default userReducer;