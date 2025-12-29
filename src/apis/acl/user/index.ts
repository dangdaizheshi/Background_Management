import http from "../../../utils/http";
import type {UserResponseData, User} from './type'
enum API {
  // 获取已有的全部用户信息
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
}
export const reqGetAllUser = (page: number, limit: number) => http.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return http.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return http.post<any, any>(API.ADDUSER_URL, data)
  }
}