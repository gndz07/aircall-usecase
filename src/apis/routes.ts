import { API_HOST } from "../config";

const routes = {
    login: () => [API_HOST, "auth", "login"].join("/"),
    calls: () => [API_HOST, "calls"].join("/"),
    callData: (id: number) => [API_HOST, "calls", id].join("/"),
}

export default routes;