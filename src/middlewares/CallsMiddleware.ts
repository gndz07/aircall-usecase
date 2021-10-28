import Actions from "../actions";
import Api from "../apis";
import { call, put, takeEvery } from "redux-saga/effects";

function* getCalls(action) {
	try {
		const res = yield call(Api.Calls.GetCalls, action.payload);
		yield put(Actions.Calls.GetCalls.success(res));
	} catch (e) {
		yield put(Actions.Calls.GetCalls.failed(e.message));
	}
};

function* getCallData(action) {
	try {
		const res = yield call(Api.Calls.GetCallData, action.payload);
		yield put(Actions.Calls.GetCallData.success(res));
	} catch (e) {
		yield put(Actions.Calls.GetCallData.failed(e.message));
	}
};

function* addNote(action) {
	try {
		const res = yield call(Api.Calls.AddNote, action.payload);
		yield put(Actions.Calls.AddNote.success(res));
	} catch (e) {
		yield put(Actions.Calls.AddNote.failed(e.message));
	}
};

export default function* callsMiddleware() {
	yield takeEvery(Actions.Calls.GET_CALLS.REQUEST, getCalls);
    yield takeEvery(Actions.Calls.GET_CALL_DATA.REQUEST, getCallData);
	yield takeEvery(Actions.Calls.ADD_NOTE.REQUEST, addNote);
};