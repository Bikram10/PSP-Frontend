import {Category} from "./category";
import {Attributes} from "./attributes";

export interface Product{
  product_id?: number;
  product_name?: string;
  category?: Category;
  product_description?: string;
  product_price?: number;
  product_quantity?: number;
  stock_status?: string;
  attributeType?: string;
  attributes?: Attributes[];
}
