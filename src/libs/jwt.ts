import jwtDecode from "jwt-decode";
import moment from "moment";

export interface JwtToken {
	sub: string;
	username: string;
	exp: number;
	iat: number;
}

export const decode = (token: string): JwtToken => {
	if (!token || token == "") return undefined;
	return jwtDecode(token);
};

export function isExpired(token) {
	try {
		let info = decode(token);
		return !info || expired(info);
	} catch (error) {
		return false;
	}
}

export const expired = (token: JwtToken): boolean => {
	if (!token) {
		return true;
	}
	// console.log("session expiring", moment.unix(token.exp).fromNow());
	return moment() > moment.unix(token.exp);
};
