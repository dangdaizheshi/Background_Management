import http from "../../../utils/http";
import type {AllRoleResponseData, MenuResponseData} from "./type"

enum API { 
    ALLROLE_URL = '/admin/acl/role/',
    ALLPERMISSION_URL = '/admin/acl/permission/toAssign',
    SETPERMISSION_URL = '/admin/acl/permission/doAssign'
}
export const reqGetAllRole = (page: number, limit: number, roleName: string) => http.get<any, AllRoleResponseData>(API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`)
export const reqGetAllPermission = (roleId: number) => http.get<any, MenuResponseData>(API.ALLPERMISSION_URL + `/${roleId}`)
export const reqSetPermission = (roleId: number, permissionId: number[]) => http.post<any, any>(API.SETPERMISSION_URL + `?roleId=${roleId}&permissionId=${permissionId}`)