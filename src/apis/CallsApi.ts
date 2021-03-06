import { checkError, GET, POST, PUT, toJson } from "../libs/apiUtils";
import Credentials from "../models/Credentials";
import routes from "./routes";

export async function GetCalls(payload) {
	return GET(routes.calls(payload.offset)).then(checkError).then(toJson);
};

export async function GetCallData(payload) {
	return GET(routes.callData(payload)).then(checkError).then(toJson);
};

export async function AddNote(payload) {
	return POST(routes.addNote(payload.id), payload.content).then(checkError).then(toJson);
};

export async function ArchiveCall(payload) {
	return PUT(routes.archiveCall(payload)).then(checkError).then(toJson);
};