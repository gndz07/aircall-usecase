import asyncAction from "./asyncAction";

export const GET_CALLS = asyncAction("@@aircall/calls/get-calls");
export const GET_CALL_DATA = asyncAction("@@aircall/calls/get-call-data");
export const ADD_NOTE = asyncAction("@@aircall/calls/add-note");
export const ARCHIVE_CALL = asyncAction("@@aircall/calls/archive-call");
export const RESET_FETCHING = "@@aircall/calls/fetching/reset";

export const GetCalls = {
	request: (payload) => ({ type: GET_CALLS.REQUEST, payload }),
	success: (payload) => ({ type: GET_CALLS.SUCCESS, payload }),
	failed: (payload: Error) => ({ type: GET_CALLS.FAILED, payload }),
};

export const GetCallData = {
	request: (payload) => ({ type: GET_CALL_DATA.REQUEST, payload }),
	success: (payload) => ({ type: GET_CALL_DATA.SUCCESS, payload }),
	failed: (payload: Error) => ({ type: GET_CALL_DATA.FAILED, payload }),
};

export const AddNote = {
	request: (payload) => ({ type: ADD_NOTE.REQUEST, payload }),
	success: (payload) => ({ type: ADD_NOTE.SUCCESS, payload }),
	failed: (payload: Error) => ({ type: ADD_NOTE.FAILED, payload }),
};

export const ArchiveCall = {
	request: (payload) => ({ type: ARCHIVE_CALL.REQUEST, payload }),
	success: (payload) => ({ type: ARCHIVE_CALL.SUCCESS, payload }),
	failed: (payload: Error) => ({ type: ARCHIVE_CALL.FAILED, payload }),
};

export const ResetFetching = () => ({
	type: RESET_FETCHING,
});
