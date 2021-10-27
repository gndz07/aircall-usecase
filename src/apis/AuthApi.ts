import { checkError, POST, toJson } from "../libs/apiUtils";
import Credentials from "../models/Credentials";
import routes from "./routes";

export async function Login(credentials: Credentials) {
	return POST(routes.login(), credentials).then(checkError).then(toJson);
};

export async function RefreshToken() {
	return POST(routes.refreshToken(), null, {}, "refresh").then(checkError).then(toJson);
};