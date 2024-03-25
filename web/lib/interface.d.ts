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
