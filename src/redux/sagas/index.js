import { fork } from "redux-saga/effects";
import bookingSaga from "./booking.saga";
import imageSaga from "./image.saga";
import discountSaga from "./discount.saga";
import locationSaga from "./location.saga";
import roomSaga from "./room.saga";
import typeSaga from "./type.saga";
import userSaga from "./user.saga";

function* rootSaga() {
  yield fork(roomSaga);
  yield fork(locationSaga);
  yield fork(typeSaga);
  yield fork(userSaga);
  yield fork(imageSaga);
  yield fork(bookingSaga);
  yield fork(discountSaga);
};

export default rootSaga;