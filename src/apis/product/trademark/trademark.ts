import http from "../../../utils/http";
import type { TradeMarkResponseData } from "./type";
enum API{
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
}
// 获取已有品牌接口方法
export const reqTrademarkList = (page: number, limit: number) => http.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)