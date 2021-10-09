import {Type} from "./type";
import {Stock} from "./Stock";

export interface Product{
  product_id?: number;
  product_name? : string;
  brand?: string;
  sku?: string;
  category?: string;
  description?: string;
  price?: number;
  product_img_url? : string;
  quantity?: number;
  stockStatus?: Stock;
  type?: Type;
}
