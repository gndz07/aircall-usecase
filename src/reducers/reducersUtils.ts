export interface ApiReducerState {
	fetching: boolean;
	fetchingError: boolean;
	fetchingSuccess: boolean;
	errorMessage: string | null;
}

export const apiReducerInitialState: ApiReducerState = {
	fetching: false,
	fetchingError: false,
	fetchingSuccess: false,
	errorMessage: null,
};

export interface ReducerAction {
	type: string;
	payload: any;
}

export const fetching = {
	failed: {
		fetching: false,
		fetchingSuccess: false,
		fetchingError: true,
	},
	request: {
		fetching: true,
		fetchingSuccess: false,
		fetchingError: false,
	},
	reset: {
		fetching: false,
		fetchingError: false,
		fetchingSuccess: false,
	},
	success: {
		fetching: false,
		fetchingSuccess: true,
		fetchingError: false,
	},
};
