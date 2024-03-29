export interface ResponseBody<T = any> {
    code: number;
    data?: T;
    message: string;
}
export interface RequestConfigExtra {
    token?: boolean;
    customDev?: boolean;
    loading?: boolean;
}
export interface Route {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    pathname: string;
    port: string;
    protocol: string;
}
