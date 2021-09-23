import {Product} from "../../cms/admin/model/product";

export interface CartItem{
  product?: Product;
  quantity?: number;
}
