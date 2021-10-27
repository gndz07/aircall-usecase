import Credentials from "../models/Credentials";

export const checkError = async (response) => {
	if (!(response.status >= 200 && response.status < 400)) {
		const { message } = await toJson(response);
		const error = new Error(message);
		throw error;
	}
	return response;
};

export const toJson = async (response) => {
	let resp = await response.text();
	return resp ? JSON.parse(resp) : {};
};

export const GET = async (url: any, headers = {}) => {
	return req(url, headers, null, "GET");
};

export const POST = async (url: string, body: Credentials, headers = {}) => {
	return req(url, headers, body, "POST");
};

const req = async (url: RequestInfo, headers: {}, body: any, method: string) => {
	const token = localStorage.getItem("token");
	return fetch(
		url,
		Object.assign(
			{
				method,
				headers: Object.assign(
					{},
					{
						"Content-Type": "application/json",
						...headers,
					},
					token ? { Authorization: `Bearer ${token}` } : {}
				),
			},
			body ? { body: JSON.stringify(body) } : {}
		)
	);
};