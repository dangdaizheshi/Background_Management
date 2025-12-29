type ns = number | string
// 服务器接口返回数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// spu 数据类型
export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    catalog3Id: ns,
    tmId: number,
    spuSaleAttrList: null,
    spuImageList: null
}
// 获取指定分类下的spu数据接口返回数据类型
export interface HasSpuResponseData extends ResponseData {
  data: {
    records: SpuData[],
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
  }
}
// 单个SPU销售属性值的类型定义
export interface SpuSaleAttrValue {
  id?: number
  createTime: null
  updateTime: null
  spuId: number
  baseSaleAttrId: number
  saleAttrValueName: string
  saleAttrName: string
  isChecked: null
}
export interface SaleAttrValueResponseData extends ResponseData {
  data: {
    id?: number
    createTime: null
    updateTime: null
    spuId: number
    baseSaleAttrId: number
    saleAttrName: string
    spuSaleAttrValueList: SpuSaleAttrValue[]
  }[]
}
export interface AllSaleAttrResponseData extends ResponseData {
  data: {
    id: number
    name: string
  }[]
}