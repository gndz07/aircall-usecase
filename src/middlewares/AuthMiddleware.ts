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
		yield call(storage.set, storage.Key.Username, response.user.username);
		yield put(Actions.Auth.Login.success(response));
	} catch (error) {
		if (error.message.includes("user not found")) {
			yield put(Actions.Auth.Login.failed("login error" as any));
		} else {
			yield put(Actions.Auth.Login.failed(error.message));
		}
	}
};

function* refreshToken() {
	try {
		const response = yield call(Api.Auth.RefreshToken);
		yield call(storage.set, storage.Key.Token, response.access_token);
		yield call(storage.set, storage.Key.RefreshToken, response.refresh_token);
		yield put(Actions.Auth.RefreshToken.success(response));
	} catch (error) {
		if (error.message.includes("user not found")) {
			yield put(Actions.Auth.RefreshToken.failed("login error" as any));
		} else {
			yield put(Actions.Auth.RefreshToken.failed(error.message));
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

function* checkAccessTokenValidity() {
	while (true) {
		const token = yield call(storage.get, storage.Key.Token);
		if (token && jwt.isExpired(token)) {
			yield put(Actions.Auth.RefreshToken.request());
		}
		yield delay(300000);
	}
};

export default function* authMiddleware() {
	yield takeEvery(Actions.Auth.LOGIN.REQUEST, login);
	yield takeEvery(Actions.Auth.REFRESH_TOKEN.REQUEST, refreshToken);
	yield fork(checkRefreshTokenValidity);
	yield fork(checkAccessTokenValidity);
};