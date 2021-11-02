import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {CartItem} from "../model/cartItem";
import {StripeServiceService} from "../../service/stripe-service.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenStorageService} from "../../service/token-storage.service";
import {Cart} from "../model/cart";
import {Product} from "../../cms/admin/model/product";
import {Order} from "../model/order";
import {OrderItem} from "../model/orderItem";
import {HomeService} from "../../service/home.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart = {};
  cartItem?: CartItem[] = [];
  total: number = 0;
  shipping: number = 0;
  quantity: any = 0;
  order: Order = {};
  subtotal: any = 0;
  orderItem: OrderItem = {};
  orderItems?: OrderItem[] = [];

  myForm!: FormGroup;
  constructor(private router: Router, private tokenService: TokenStorageService, private builder: FormBuilder, private stripe: StripeServiceService, private homeService: HomeService, private clientService: ClientService) {

  }

  ngOnInit(): void {
      this.clientService.getCarts().subscribe(cart => {
        this.cart = cart;
        this.total = this.getTotal(this.cart);
        this.cartItem = cart.cartItems;

        if (this.cartItem?.length != 0) {
          this.calculatePostage();
        }
      });

  }

  calculatePostage(){
    this.homeService.calculatePostage().subscribe(shipping => {
        this.shipping = shipping.postage_result.total_cost;
    })
  }

  getTotal(cart: any): number{
      let total = 0;

      if(cart.cartItems !=null) {
        for (let item of cart.cartItems) {
          total += item.subtotal;
        }
      }

      return total;
  }

  EachTotalPrice(price: any, quantity: any) :number {
    this.subtotal =price * quantity;

    return this.subtotal;
  }

  getGrandTotal(total: number): number{
    return total + this.shipping;
  }
  checkout(grandTotal: any){
    this.router.navigate(["checkout"], {queryParams: {grandTotal: grandTotal}});
  }

  makePayment(grandTotal: number){
    this.clientService.makePayment(grandTotal).subscribe(res => {
      window.location.href = res.redirect_url;
    })
  }

  goBack(){
    this.router.navigate(['index']);
  }

  update(cartId: any, id: any, quantity: any){

      if(this.tokenService.isUserLoggedIn() == false){
        this.router.navigate(["login"]);
      }
      let product = {
        product_id: id
      }
      let cartItems = {
        id: cartId,
        quantity: quantity,
        product: product
      }
      this.clientService.updateQuantity(cartItems).subscribe(res => {
          window.location.reload();
      })
  }

  removeItem(cartId: any){
    this.clientService.deleteItem(cartId).subscribe(res =>{
        window.location.reload();
      }
    )
  }

}
