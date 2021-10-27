import { checkError, GET, toJson } from "../libs/apiUtils";
import Credentials from "../models/Credentials";
import routes from "./routes";

export async function GetCalls(payload) {
	return GET(routes.calls(payload.offset)).then(checkError).then(toJson);
};

export async function GetCallData(payload) {
	return GET(routes.callData(payload)).then(checkError).then(toJson);
};