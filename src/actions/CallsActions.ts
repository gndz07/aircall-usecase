import asyncAction from "./asyncAction";

export const GET_CALLS = asyncAction("@@aircall/get-calls");
export const GET_CALL_DATA = asyncAction("@@aircall/get-call-data");

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
