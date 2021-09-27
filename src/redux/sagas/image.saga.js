import {
  storage
} from 'fb';
import {
  put,
  takeEvery
} from 'redux-saga/effects';
import {
  FAILURE,
  IMAGE_ACTION,
  REQUEST,
  SUCCESS
} from '../constants';



function* uploadImage(action) {
  try {
    const {
      data
    } = action.payload
    let URL_IMG = "";
    const uploadTask = yield storage.ref(`images/${data.name}`).put(data);
    yield uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {

      },
      () => {
        storage
          .ref("images")
          .child(data.name)
          .getDownloadURL()
          .then((url) => {
            URL_IMG = url;
          });

      })
   
    put({
      type: SUCCESS(IMAGE_ACTION.ADD),
      payload: {
        data: URL_IMG
      },
    })

  } catch (e) {
    yield put({
      type: FAILURE(IMAGE_ACTION.ADD),
      payload: e.message
    });

  }

}


function* imageSaga() {
  yield takeEvery(REQUEST(IMAGE_ACTION.ADD), uploadImage);

  // yield takeEvery(REQUEST(USER.CHECK_LOGIN), checkLogin);
}
export default imageSaga;