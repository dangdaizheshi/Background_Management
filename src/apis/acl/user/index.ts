import http from "../../../utils/http";

enum API {
  // 获取已有的全部用户信息
  ALLUSER_URL = '/admin/acl/user/',

}
export const reqGetAllUser = (page: number, limit: number) => http.get<any, any>(API.ALLUSER_URL + `${page}/${limit}`)