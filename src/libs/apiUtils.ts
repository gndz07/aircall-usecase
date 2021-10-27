import * as storage from "./storage";

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

export const POST = async (
  url: string,
  body= null,
  headers = {},
  tokenType?: string
) => {
  return req(url, headers, body, "POST", tokenType);
};

const req = async (
  url: RequestInfo,
  headers: {},
  body: any,
  method: string,
  tokenType?: string
) => {
  const token = await storage.get(storage.Key.Token);
  const refreshToken = await storage.get(storage.Key.RefreshToken);
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
          token || refreshToken
            ? tokenType == "refresh"
              ? { Authorization: `Bearer ${refreshToken.replace(/\"/g, "")}` }
              : { Authorization: `Bearer ${token.replace(/\"/g, "")}` }
            : {}
        ),
      },
      body ? { body: JSON.stringify(body) } : {}
    )
  );
};
