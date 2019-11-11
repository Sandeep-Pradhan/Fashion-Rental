import { all, call, put, takeLatest } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { clearDates } from "./dates.actions";

export function* clearDatesOnSignOut() {
  yield put(clearDates());
}
export function* onClearDatesOnSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearDatesOnSignOut);
}

export function* dateSagas() {
  yield all([call(onClearDatesOnSignOut)]);
}
