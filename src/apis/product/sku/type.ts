type ns = number | string
// 服务器接口返回数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface SkuImg {
    id?: number,
    imgName?: string,
    imgUrl?: string,
    spuId: number,
    createTime: string,
    updateTime: string,
    name?: string,
    url?: string
}
export interface ImgResponse extends ResponseData {
    data: SkuImg[]
}