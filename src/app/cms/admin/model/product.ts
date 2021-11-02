import {Type} from "./type";
import {Stock} from "./Stock";
import {ImageUrls} from "./ImageUrls";

export interface Product{
  product_id?: number;
  product_name? : string;
  brand?: string;
  sku?: string;
  category?: string;
  short_description?: string;
  description?: string;
  price?: number;
  product_img_url? : ImageUrls[];
  quantity?: any;
  stockStatus?: Stock;
  type?: Type;
  rate?: any;
}
