import http from "../../../utils/http";
import type {UserResponseData, User, RoleResponseData, addRoleData} from './type'
enum API {
  // 获取已有的全部用户信息
  ALLUSER_URL = '/admin/acl/user/',
  ADDUSER_URL = '/admin/acl/user/save',
  UPDATEUSER_URL = '/admin/acl/user/update',
  ROLE_URL = '/admin/acl/user/toAssign',
  ADDROLE_URL = '/admin/acl/user/doAssignRole',
  DELETEUSER_URL = '/admin/acl/user/remove',
  DELETEBATCHUSER_URL = '/admin/acl/user/batchRemove'
}
export const reqGetAllUser = (page: number, limit: number, username: string) => http.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}?username=${username}`)
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return http.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return http.post<any, any>(API.ADDUSER_URL, data)
  }
}
export const reqGetUserRoles = (userId: number) => http.get<any, RoleResponseData>(API.ROLE_URL + `/${userId}`)
export const reqAssignRoles = (data: addRoleData) => http.post<any, any>(API.ADDROLE_URL, data)
export const reqDeleteUser = (id: number) => http.delete<any, any>(API.DELETEUSER_URL + `/${id}`)
export const reqDeleteBatchUser = (ids: number[]) => http.delete<any, any>(API.DELETEBATCHUSER_URL, {data: ids})