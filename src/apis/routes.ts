import { API_HOST } from "../config";

const routes = {
    login: () => [API_HOST, "auth", "login"].join("/"),
    refreshToken: () => [API_HOST, "auth", "refresh-token-v2"].join("/"),
    calls: () => [API_HOST, "calls"].join("/"),
    callData: (id: number) => [API_HOST, "calls", id].join("/"),
}

export default routes;