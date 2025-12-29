import http from "../../../utils/http";
import type { HasSpuResponseData, SaleAttrValueResponseData, AllSaleAttrResponseData } from "./type";

type ns = number | string
enum API {
    HASSPU_URL = '/admin/product/',
    SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
}
export const reqHasSpu = (page: number, limit: number, category3Id: ns) => http.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
export const reqSpuHasSaleAttr = (spuId: number) => http.get<any, SaleAttrValueResponseData>(API.SPUHASSALEATTR_URL + spuId)
export const reqAllSaleAttr = () => http.get<any, AllSaleAttrResponseData>(API.ALLSALEATTR_URL)