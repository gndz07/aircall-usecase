import Actions from "../actions";
import Api from "../apis";
import * as jwt from "../libs/jwt";
import * as storage from "../libs/storage";
import { call, delay, fork, put, takeEvery } from "redux-saga/effects";

function* login(action) {
	try {
		const response = yield call(Api.Auth.Login, action.payload);
		yield call(storage.set, storage.Key.Token, response.access_token);
		yield call(storage.set, storage.Key.RefreshToken, response.refresh_token);
		yield put(Actions.Auth.Login.success(response));
	} catch (error) {
		if (error.message.includes("user not found")) {
			yield put(Actions.Auth.Login.failed("errors.auth.login" as any));
		} else {
			yield put(Actions.Auth.Login.failed(error.message));
		}
	}
};

function* checkRefreshTokenValidity() {
	while (true) {
		const token = yield call(storage.get, storage.Key.RefreshToken);
		if (token && jwt.isExpired(token)) {
			yield call([localStorage, localStorage.clear]);
		}
		yield delay(36000000);
	}
};

export default function* authMiddleware() {
	yield takeEvery(Actions.Auth.LOGIN.REQUEST, login);
	yield fork(checkRefreshTokenValidity);
};