import Actions from "../actions";
import { apiReducerInitialState, ApiReducerState, fetching, ReducerAction } from "./reducersUtils";

export interface CallsReducerState extends ApiReducerState {
	calls: any;
    selectedCall: any;
	updated: boolean;
};

const initialState: CallsReducerState = {
	...apiReducerInitialState,
	calls: {
		nodes: [],
		totalCount: null,
		hasNextPage: null
	},
    selectedCall: null,
	updated: false
};

export default function callsReducer(
	state: CallsReducerState = initialState,
	{ type, payload }: ReducerAction
): CallsReducerState {
	switch (type) {
		case Actions.Calls.GET_CALLS.REQUEST:
		case Actions.Calls.GET_CALL_DATA.REQUEST:
		case Actions.Calls.ADD_NOTE.REQUEST:
		case Actions.Calls.ARCHIVE_CALL.REQUEST:
            return {
				...state,
				...fetching.request,
				updated: false
			};
        case Actions.Calls.GET_CALLS.SUCCESS:
            return {
				...state,
				...fetching.success,
				calls: {
					...state.calls,
					nodes: [...state.calls.nodes.concat(payload.nodes)],
					totalCount: payload.totalCount,
					hasNextPage: payload.hasNextPage
				}
			};
        case Actions.Calls.GET_CALL_DATA.SUCCESS:
			return {
                ...state,
                ...fetching.success,
                selectedCall: payload
            };
		case Actions.Calls.ADD_NOTE.SUCCESS:
		case Actions.Calls.ARCHIVE_CALL.SUCCESS:
            return {
                ...state,
                ...fetching.success,
                selectedCall: payload,
				updated: true,
            };
        case Actions.Calls.GET_CALLS.FAILED:
		case Actions.Calls.GET_CALL_DATA.FAILED:
		case Actions.Calls.ADD_NOTE.FAILED:
		case Actions.Calls.ARCHIVE_CALL.FAILED:
            return {
				...state,
				...fetching.failed,
				errorMessage: payload,
				updated: false
			};
		case Actions.Calls.RESET_FETCHING:
			return {
				...state,
				...fetching.reset,
			};
		default:
			return state;
	}
}