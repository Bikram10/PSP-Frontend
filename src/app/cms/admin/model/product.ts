import {Type} from "./type";

export interface Product{

  [key: string]: any;
  product_id?: number;
  product_name? : string;
  brand?: string;
  SKU?: string;
  category?: string;
  description?: string;
  price?: number;
  product_img_url? : string;
  quantity?: number;
  stock_status?: string;
  type?: Type;
}
