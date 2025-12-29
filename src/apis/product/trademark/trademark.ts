import http from "../../../utils/http";
import type { TradeMarkResponseData, TradeMark, AllTradeMarkResponseData} from "./type";
enum API{
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌接口
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌接口
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌接口
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
  // 获取所有品牌接口
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList'
}
// 获取已有品牌接口方法
export const reqTrademarkList = (page: number, limit: number) => http.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
// 添加品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => http.post<any, any>(API.ADD_TRADEMARK_URL, data)
// 修改品牌接口方法
export const reqUpdateTrademark = (data: TradeMark) => http.put<any, any>(API.UPDATE_TRADEMARK_URL, data)
// 删除品牌接口方法
export const reqDeleteTrademark = (id: number) => http.delete<any, any>(API.DELETE_TRADEMARK_URL + id)
export const reqAllTrademark = () => http.get<any, AllTradeMarkResponseData>(API.ALLTRADEMARK_URL)