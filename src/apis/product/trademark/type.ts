export interface TradeMark {
  id?: number,
  tmName: string,
  logoUrl: string
}
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean,
}
export interface TradeMarkResponseData extends ResponseData {
    data: {
        records: TradeMark[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}
export interface AllTradeMarkResponseData extends ResponseData {
  data: TradeMark[]
}