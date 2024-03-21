export interface ValidateInfo {
  prop: string; //属性名
  message: string; //错误信息
}

export interface ResultInfo {
  data: ValidateInfo[];
}
