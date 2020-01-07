import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";

function* windowClose(action) {
  const state = yield select();
  console.log(state);
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("WINDOW_CLOSE", windowClose);
}

// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;
