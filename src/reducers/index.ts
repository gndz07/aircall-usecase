import { combineReducers } from "redux";
import auth, { AuthReducerState } from "./AuthReducer";
import calls, { CallsReducerState } from "./CallsReducer";

const reducers = combineReducers({
	auth,
	calls
});

export default reducers;

interface RootState {
	auth: AuthReducerState;
	calls: CallsReducerState;
}

export type { RootState };
