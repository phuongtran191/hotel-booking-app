import axios from "axios";
import { put, takeEvery } from "@redux-saga/core/effects";
import { FAILURE, LOCATION_ACTION, REQUEST, SUCCESS } from "redux/constants";
import { URL_API } from "Api/index";


function* getLocationListSaga(action) {
  try {
    const result = yield axios.get(`${URL_API}/locations`);
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_LOCATION_LIST),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(LOCATION_ACTION.GET_LOCATION_LIST), payload: e.message });
  }
}

function* createLocationSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`${URL_API}/locations`, data);
    yield put({
      type: SUCCESS(LOCATION_ACTION.CREATE_LOCATION),
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({ type: FAILURE(LOCATION_ACTION.CREATE_LOCATION), payload: e.message });
  }
}

function* editLocationSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`${URL_API}/locations/${id}`, data);
    yield put({
      type: SUCCESS(LOCATION_ACTION.EDIT_LOCATION),
      payload: {
        data: result.data,
      }
    });
  } catch (e) {
    yield put({ type: FAILURE(LOCATION_ACTION.EDIT_LOCATION), payload: e.message });
  }
}

function* deleteLocationSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`${URL_API}/locations/${id}`);
    yield put({
      type: SUCCESS(LOCATION_ACTION.DELETE_LOCATION),
      payload: { id }
    });
  } catch (e) {
    yield put({ type: FAILURE(LOCATION_ACTION.DELETE_LOCATION), payload: e.message });
  }
}


export default function* locationSaga() {
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_LOCATION_LIST), getLocationListSaga);
  yield takeEvery(REQUEST(LOCATION_ACTION.CREATE_LOCATION), createLocationSaga);
  yield takeEvery(REQUEST(LOCATION_ACTION.EDIT_LOCATION), editLocationSaga);
  yield takeEvery(REQUEST(LOCATION_ACTION.DELETE_LOCATION), deleteLocationSaga);
}