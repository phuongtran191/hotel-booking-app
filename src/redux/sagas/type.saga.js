import {
  put,
  takeEvery
} from "@redux-saga/core/effects";
import {
  typeRoomAPI
} from "Api/index";
import {
  ROUTER_URL
} from "constants/index";
import {
  FAILURE,
  REQUEST,
  SUCCESS,
  TYPE_ACTION
} from "redux/constants";
import history from "utils/history";


function* getTypeListSaga(action) {
  try {
    const result = yield typeRoomAPI.getTypeRoomList();
    yield put({
      type: SUCCESS(TYPE_ACTION.GET_TYPE_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.GET_TYPE_LIST),
      payload: e.message
    });
  }
}



function* getTypeDetailSaga(action) {
  try {
    const {
      id
    } = action.payload;
    const result = yield typeRoomAPI.getTypeRoomDetail(id, {
      _embed: "discounts"
    });
    yield put({
      type: SUCCESS(TYPE_ACTION.GET_TYPE_DETAIL),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.GET_TYPE_DETAIL),
      payload: e.message
    });
  }
}
function* getFilterTypeListSaga(action) {
  try {
    // const searchKey = action.payload?.searchKey;
    const { params } = action.payload;
    const result = yield typeRoomAPI.getFilterTypeRoomList({
      _sort: 'id',
      _order: 'asc',
      ...params,
      // ...(searchKey && { q: searchKey }),
    });
    yield put({
      type: SUCCESS(TYPE_ACTION.GET_FILTER_TYPE_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.GET_FILTER_TYPE_LIST),
      payload: e.message
    });
  }
}

function* createTypeSaga(action) {
  try {
    const {
      data
    } = action.payload;
    const result = yield typeRoomAPI.addTypeRoomToList(data);
    yield put({
      type: SUCCESS(TYPE_ACTION.CREATE_TYPE),
      payload: {
        data: result.data
      },
    });
    yield history.push(`${ROUTER_URL.ADMIN}${ROUTER_URL.ROOM_TYPES}`);
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.CREATE_TYPE),
      payload: e.message
    });
  }
}

function* editTypeSaga(action) {
  try {
    const {
      id,
      data
    } = action.payload;
    const result = yield typeRoomAPI.editTypeRoomInList(id, data);
    yield put({
      type: SUCCESS(TYPE_ACTION.EDIT_TYPE),
      payload: {
        data: result.data,
      }
    });
    yield history.push(`${ROUTER_URL.ADMIN}${ROUTER_URL.ROOM_TYPES}`);
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.EDIT_TYPE),
      payload: e.message
    });
  }
}

function* deleteTypeSaga(action) {
  try {
    const {
      id
    } = action.payload;
    yield typeRoomAPI.deleteTypeRoomInList(id);
    // yield axios.delete(${URL_API}/types/${id});
    yield put({
      type: SUCCESS(TYPE_ACTION.DELETE_TYPE),
      payload: {
        id
      }
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.DELETE_TYPE),
      payload: e.message
    });
  }
}

function* getCommentListSaga(action) {
  const {
    id,
    params
  } = action.payload
  try {
    const result = yield typeRoomAPI.getCommentListTypeRoom(id, params);
    yield put({
      type: SUCCESS(TYPE_ACTION.GET_LIST_COMMENT),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.GET_LIST_COMMENT),
      payload: e.message
    });
  }
}

function* addCommentSaga(action) {
  const {
    params
  } = action.payload
  try {
    const result = yield typeRoomAPI.addCommentRoomToList(params);


    yield put({
      type: SUCCESS(TYPE_ACTION.ADD_COMMENT),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.ADD_COMMENT),
      payload: e.message
    });
  }
}
function * checkVariable(action){
  const {
    params
  } = action.payload
  try {
    const result = yield typeRoomAPI.addCommentRoomToList(params);


    yield put({
      type: SUCCESS(TYPE_ACTION.ADD_COMMENT),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(TYPE_ACTION.ADD_COMMENT),
      payload: e.message
    });
  }
}

export default function* typeSaga() {
  yield takeEvery(REQUEST(TYPE_ACTION.GET_TYPE_LIST), getTypeListSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.GET_TYPE_DETAIL), getTypeDetailSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.GET_LIST_COMMENT), getCommentListSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.GET_FILTER_TYPE_LIST), getFilterTypeListSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.CREATE_TYPE), createTypeSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.ADD_COMMENT), addCommentSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.EDIT_TYPE), editTypeSaga);
  yield takeEvery(REQUEST(TYPE_ACTION.DELETE_TYPE), deleteTypeSaga);
}