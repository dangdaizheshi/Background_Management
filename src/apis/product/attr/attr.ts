import http from "../../../utils/http";
enum API{
    C1_URL = '/admin/product/getCategory1',
    C2_URL = '/admin/product/getCategory2/',
    C3_URL = '/admin/product/getCategory3/'
}
export const reqCategory1List = () => http.get<any, any>(API.C1_URL)
export const reqCategory2List = (category1Id: number) => http.get<any, any>(API.C2_URL + category1Id)
export const reqCategory3List = (category2Id: number) => http.get<any, any>(API.C3_URL + category2Id)