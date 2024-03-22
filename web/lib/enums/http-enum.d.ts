/**
 * @description: request method
 */
export declare enum RequestEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
/**
 * @description:  contentType
 */
export declare enum ContentTypeEnum {
    JSON = "application/json;charset=UTF-8",
    FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
    FORM_DATA = "multipart/form-data;charset=UTF-8"
}
export declare enum HttpStatus {
    SUCCESS_CODE = 0,// 请求成功
    UN_AUTHORIZED = 401,// 未验证
    AUTH_EXPIRED_TIMES = 40001,// token已过期
    CAPTCHED_NOT_MATCHED = 40002,// 验证码不匹配
    USER_WHIT_PASSWORD_NOT_MATCHED = 30001,// 用户密码不匹配
    VAILDATE_PARAMS_NOT_MATCHED = 50001,//参数校验不通过
    DATA_SET_NOT_EXIST = 50002,// 数据不存在
    OPERATOR_WITH_RELATION = 5003
}
