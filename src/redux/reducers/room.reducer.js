import { createReducer } from "@reduxjs/toolkit";
import { ROOM_ACTION, FAILURE, REQUEST, SUCCESS } from "redux/constants/index";


const initialState = {
  roomList: {
    data: [],
    // pagination:{
    //   _page:1,
    //   _limit:10,
    //   _totalRows: 30,
    // },
    load: false,
    error: null,
  },
  roomDetail: {
    data: {},
    load: false,
    error: null,
  },
}

const roomReducer = createReducer(initialState, {
  [REQUEST(ROOM_ACTION.GET_ROOM_LIST)]: (state, action) => {
    return {
      ...state,
      roomList: {
        ...state.roomList,
        load: true,
      },
    };
  },
  [SUCCESS(ROOM_ACTION.GET_ROOM_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      roomList: {
        ...state.roomList,
        data,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(ROOM_ACTION.GET_ROOM_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      roomList: {
        ...state.roomList,
        load: false,
        error,
      },
    }
  },
  [REQUEST(ROOM_ACTION.GET_FILTER_ROOM_LIST)]: (state, action) => {
    return {
      ...state,
      roomList: {
        ...state.roomList,
        load: true,
      },
    };
  },
  [SUCCESS(ROOM_ACTION.GET_FILTER_ROOM_LIST)]: (state, action) => {
    const {data} =action.payload;
 
    return {
      ...state,
      roomList: {
        ...state.roomList,
        data,
        // pagination:data.pagination,
        load: false,
        error: null,
      },
    }
  },
  [FAILURE(ROOM_ACTION.GET_FILTER_ROOM_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      roomList: {
        ...state.roomList,
        load: false,
        error,
      },
    }
  },


  // [REQUEST(ROOM_ACTION.GET_FILTER_ROOM_LIST)]: (state, action) => {
  //   return {
  //     ...state,
  //     roomList: {
  //       ...state.roomList,
  //       load: true,
  //     },
  //   };
  // },
  // [SUCCESS(ROOM_ACTION.GET_FILTER_ROOM_LIST)]: (state, action) => {
  //   const {data} =action.payload;
  //   return {
  //     ...state,
  //     roomList: {
  //       ...state.roomList,
  //       data: data.data || [],
  //       // pagination: data.pagination,
  //       load: false,
  //       error: null,
  //     },
  //   }
  // },
  // [FAILURE(ROOM_ACTION.GET_FILTER_ROOM_LIST)]: (state, action) => {
  //   const { error } = action.payload;
  //   return {
  //     ...state,
  //     roomList: {
  //       ...state.roomList,
  //       load: false,
  //       error,
  //     },
  //   }
  // },

  // [REQUEST(ROOM_ACTION.GET_ROOM_DETAIL)]: (state, action) => {
  //   return {
  //     ...state,
  //     roomDetail: {
  //       ...state.roomDetail,
  //       load: true,
  //     },
  //   };
  // },
  // [SUCCESS(ROOM_ACTION.GET_ROOM_DETAIL)]: (state, action) => {
  //   const { data } = action.payload;
  //   return {
  //     ...state,
  //     roomDetail: {
  //       ...state.roomDetail,
  //       data,
  //       load: false,
  //       error: null,
  //     },
  //   }
  // },
  // [FAILURE(ROOM_ACTION.GET_ROOM_DETAIL)]: (state, action) => {
  //   const { error } = action.payload;
  //   return {
  //     ...state,
  //     roomDetail: {
  //       ...state.roomDetail,
  //       load: false,
  //       error,
  //     },
  //   }
  // },

  [SUCCESS(ROOM_ACTION.CREATE_ROOM)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      roomList: {
        ...state.roomList,
        data: [
          data,
          ...state.roomList.data,
        ],
      },
    }
  },

  [SUCCESS(ROOM_ACTION.EDIT_ROOM)]: (state, action) => {
    const { data } = action.payload;
    const newRoomList = [...state.roomList.data];
    const roomIndex = newRoomList.findIndex((room) => room.id === data.id);
    newRoomList.splice(roomIndex, 1, data);
    return {
      ...state,
      roomList: {
        ...state.roomList,
        data: newRoomList,
      },
    };
  },

  [SUCCESS(ROOM_ACTION.DELETE_ROOM)]: (state, action) => {
    const { id } = action.payload;
    const newRoomList = [...state.roomList.data];
    const roomIndex = newRoomList.findIndex((room) => room.id === id);
    newRoomList.splice(roomIndex, 1);
    return {
      ...state,
      roomList: {
        ...state.roomList,
        data: newRoomList,
      },
    };
  },
});

export default roomReducer;