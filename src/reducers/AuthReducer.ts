import Actions from "../actions";
import UserAuth from "../models/UserAuth";
import { apiReducerInitialState, ApiReducerState, fetching, ReducerAction } from "./reducersUtils";

export interface AuthReducerState extends ApiReducerState {
	user: UserAuth;
};

const initialState: AuthReducerState = {
	...apiReducerInitialState,
	user: {
		access_token: null,
        refresh_token: null,
        user: {
            id: null,
            username: null
        }
	},
};

export default function authReducer(
	state: AuthReducerState = initialState,
	{ type, payload }: ReducerAction
): AuthReducerState {
	switch (type) {
		case Actions.Auth.LOGIN.REQUEST:
		case Actions.Auth.REFRESH_TOKEN.REQUEST:
            return {
				...state,
				...fetching.request,
			};
        case Actions.Auth.LOGIN.SUCCESS:
		case Actions.Auth.REFRESH_TOKEN.SUCCESS:
            return {
				...state,
				...fetching.success,
				user: payload
			};
        case Actions.Auth.LOGIN.FAILED:
		case Actions.Auth.REFRESH_TOKEN.FAILED:
            return {
				...state,
				...fetching.failed,
				errorMessage: payload,
			};
		case Actions.Auth.TOKEN:
			return {
				...state,
				user: {
					...state.user,
					access_token: payload.accessToken,
					refresh_token: payload.refreshToken,
					user: {
						...state.user.user,
						username: payload.username
					}
				}
			};
		default:
			return state;
	}
}