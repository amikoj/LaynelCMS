import { TOKEN_KEY } from "./constants";

export function isAuthenticated(): boolean {
    return localStorage.getItem(TOKEN_KEY) !== null;
}
