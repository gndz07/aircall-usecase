import Credentials from "../models/Credentials";
import UserAuth from "../models/UserAuth";
import asyncAction from "./asyncAction";

export const LOGIN = asyncAction("@@aircall/auth/login");
export const REFRESH_TOKEN = asyncAction("@@aircall/auth/refresh-token");
export const TOKEN = ("@@aircall/auth/token");

export const Login = {
	request: (payload: Credentials) => ({ type: LOGIN.REQUEST, payload }),
	success: (payload: UserAuth) => ({ type: LOGIN.SUCCESS, payload }),
	failed: (payload: Error) => ({ type: LOGIN.FAILED, payload }),
};

export const RefreshToken = {
	request: () => ({ type: REFRESH_TOKEN.REQUEST }),
	success: (payload: UserAuth) => ({ type: REFRESH_TOKEN.SUCCESS, payload }),
	failed: (payload: Error) => ({ type: REFRESH_TOKEN.FAILED, payload }),
};

export const Token = (payload) => ({
	type: TOKEN,
	payload: payload,
});