import { combineReducers } from "redux";
import auth, { AuthReducerState } from "./AuthReducer";

const reducers = combineReducers({
	auth,
});

export default reducers;

interface RootState {
	auth: AuthReducerState;
}

export type { RootState };
