import http from "../../../utils/http";
import type { ResponseData, AttrResponseData, Attr} from './type'
type ns = number | string
enum API{
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/',
    ATTR_URL = '/admin/product/attrInfoList/',
    ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
}
export const reqCategory1List = () => http.get<any, ResponseData>(API.C1_URL)
export const reqCategory2List = (category1Id: number | string) => http.get<any, ResponseData>(API.C2_URL + category1Id)
export const reqCategory3List = (category2Id: number | string) => http.get<any, ResponseData>(API.C3_URL + category2Id)
export const reqAttrList = (category1Id: ns, category2Id: ns, category3Id: ns) => http.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
export const reqAddOrUpdateAttr = (data: Attr) => http.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)