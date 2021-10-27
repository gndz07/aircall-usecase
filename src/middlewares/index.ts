import { all, call, takeEvery } from "redux-saga/effects";
import Auth from "./AuthMiddleware";

function* log({ type, payload }) {
	console.log("ACTION", type, payload);
}

function* RootMiddleware() {
	yield all([
		takeEvery("*", log),
		call(Auth)
	]);
}
export default RootMiddleware;
