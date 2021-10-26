import { all, call, takeEvery } from "redux-saga/effects";

function* log({ type, payload }) {
	console.log("ACTION", type, payload);
}

function* RootMiddleware() {
	yield all([
		takeEvery("*", log),
	]);
}
export default RootMiddleware;
