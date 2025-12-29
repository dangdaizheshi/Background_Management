import http from "../../../utils/http";
import type { ImgResponse } from "./type";

enum API {
    IMAGE_URL = '/admin/product/spuImageList/'
}
export const reqSpuImageList = (spuId: number) => http.get<any, ImgResponse>(API.IMAGE_URL + spuId)