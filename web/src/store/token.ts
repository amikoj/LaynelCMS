import storage from "../utils/storage";

export const STORAGE_AUTHORIZE_KEY = "Authorization"; // 登陆token校验header头部key

export const TOKEN_KEY = "token";
export const USER_NAME_KEY = "username";

let token: any = null;

export const getToken = () => {
  if (token) return token;
  const t = storage.get(TOKEN_KEY);
  token = t;
  return t;
};

export const setToken = (t: string) => {
  storage.save(TOKEN_KEY, t);
  token = t;
};

export const clearToken = () => {
  token = null;
  storage.delete(TOKEN_KEY);
};
