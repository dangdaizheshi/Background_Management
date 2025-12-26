export interface CategoryObj {
  id: number | string
  name: string,
  category1Id?: number
  category2Id?: number
}

export interface ResponseData {
  code: number
  message: string
  ok: boolean
  data: CategoryObj[]
}

export interface AttrValue {
  id?: number,
  valueName: string,
  attrId?: number,
  flag?: boolean
}
export interface Attr {
  id?: number,
  attrName: string,
  categoryId: number | string,
  categoryLevel: number,
  attrValueList: AttrValue[]
}

export interface AttrResponseData {
  code: number
  message: string
  ok: boolean,
  data: Attr[]
}