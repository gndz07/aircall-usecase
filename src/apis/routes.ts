import { API_HOST } from "../config";

const routes = {
    login: () => [API_HOST, "auth", "login"].join("/"),
    refreshToken: () => [API_HOST, "auth", "refresh-token-v2"].join("/"),
    calls: (offset: number) => [API_HOST, `calls?offset=${offset}&limit=50`].join("/"),
    callData: (id: number) => [API_HOST, "calls", id].join("/"),
}

export default routes;