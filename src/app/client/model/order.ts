import {OrderItem} from "./orderItem";
import {Shipping} from "./shipping";

export class Order{
  id?: number;
  subTotal?: number;
  grandTotal?: number;
  orderStatus?: string;
  orderItems?: OrderItem[] = [];
  shipping?: Shipping;
}
