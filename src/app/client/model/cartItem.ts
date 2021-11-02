import {Product} from "../../cms/admin/model/product";

export interface CartItem{
  id?: number;
  product?: Product;
  quantity?: any;
  subtotal?: number;
}
