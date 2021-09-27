import { put, takeEvery } from "@redux-saga/core/effects";
import { notification } from "antd";
import { BookingAPI } from "Api/index";
import { ROUTER_URL } from "constants/index";
import { BOOKING_ACTION, FAILURE, REQUEST, SUCCESS } from "redux/constants";
import history from "utils/history";


function* getBookingListSaga(action) {
  try {
    const result = yield BookingAPI.getBookingList();
    yield put({
      type: SUCCESS(BOOKING_ACTION.GET_BOOKING_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.GET_BOOKING_LIST), payload: e.message });
  }
}
function* createBookingSaga(action) {
  const {data} = action.payload;
  try {
    const result = yield BookingAPI.addBooking(data);
    history.push(ROUTER_URL.HOME);
    
    notification.success({description:"You have successfully booked your room !"})
    yield put({
      type: SUCCESS(BOOKING_ACTION.CREATE_BOOKING),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.CREATE_BOOKING), payload: e.message });
  }
}




function* getFilterBookingListSaga(action) {
  try {
    // const searchKey = action.payload?.searchKey;
    const {
      params
    } = action.payload;
    const result = yield BookingAPI.getFilterBookingList({
      ...params,
      _sort: 'id',
      _order: 'asc',
      // ...(searchKey && { q: searchKey }),
    });
    yield put({
      type: SUCCESS(BOOKING_ACTION.GET_FILTER_BOOKING_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: FAILURE(BOOKING_ACTION.GET_FILTER_BOOKING_LIST),
      payload: e.message
    });
  }
}

function* getBookingDetailSaga(action) {
  try {
    const result = yield BookingAPI.getBookingDetail({ _expand: "users" });
    yield put({
      type: SUCCESS(BOOKING_ACTION.GET_BOOKING_DETAIL),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.GET_BOOKING_DETAIL), payload: e.message });
  }
}

function* checkInBookingSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield BookingAPI.checkInBooking(id, data);
    yield put({
      type: SUCCESS(BOOKING_ACTION.CHECK_IN_BOOKING),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.CHECK_IN_BOOKING), payload: e.message });
  }
}

function* checkOutBookingSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield BookingAPI.checkOutBooking(id, data);
    yield put({
      type: SUCCESS(BOOKING_ACTION.CHECK_OUT_BOOKING),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.CHECK_OUT_BOOKING), payload: e.message });
  }
}

function* cancelBookingSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield BookingAPI.cancelBooking(id, data);
    yield put({
      type: SUCCESS(BOOKING_ACTION.CANCEL_BOOKING),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.CANCEL_BOOKING), payload: e.message });
  }
}


function* pendingBookingSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield BookingAPI.pendingBooking(id, data);
    yield put({
      type: SUCCESS(BOOKING_ACTION.PENDING_BOOKING),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.PENDING_BOOKING), payload: e.message });
  }
}

function* editBookingSaga(action) {
  try {
    const { data, params } = action.payload;

    const result = yield BookingAPI.editBookingInList(data.id, data, params );
    yield put({
      type: SUCCESS(BOOKING_ACTION.EDIT_BOOKING),
      payload: {
        data: result.data,
      }
    });
 
  } catch (e) {
    yield put({ type: FAILURE(BOOKING_ACTION.EDIT_BOOKING), payload: e.message });
  }
}

export default function* bookingSaga() {
  yield takeEvery(REQUEST(BOOKING_ACTION.GET_BOOKING_LIST), getBookingListSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.GET_FILTER_BOOKING_LIST), getFilterBookingListSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.GET_BOOKING_DETAIL), getBookingDetailSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.CREATE_BOOKING), createBookingSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.PENDING_BOOKING), pendingBookingSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.CHECK_IN_BOOKING), checkInBookingSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.CHECK_OUT_BOOKING), checkOutBookingSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.CANCEL_BOOKING), cancelBookingSaga);
  yield takeEvery(REQUEST(BOOKING_ACTION.EDIT_BOOKING), editBookingSaga);
}