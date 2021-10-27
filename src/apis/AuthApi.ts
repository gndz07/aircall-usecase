import { checkError, POST, GET, toJson } from "../libs/apiUtils";
import Credentials from "../models/Credentials";
import routes from "./routes";

export async function Login(credentials: Credentials) {
	return POST(routes.login(), credentials).then(checkError).then(toJson);
};

export async function RefreshToken() {
	return POST(routes.login(), null, {}, "refresh").then(checkError).then(toJson);
};