import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {CartItem} from "../model/cartItem";
import {StripeServiceService} from "../../service/stripe-service.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cartItem: CartItem[] = [];

  constructor(private router: Router, private tokenService: TokenStorageService, private builder: FormBuilder, private stripe: StripeServiceService, private clientService: ClientService) {

  }

  ngOnInit(): void {
    if(this.tokenService.isUserLoggedIn() === false){
        this.router.navigate(['login']);
    }
    this.clientService.getCartItems().subscribe(cart => {
      this.cartItem = cart;
    });
  }

  getSubtotal(cartItems: CartItem[]): any{
    let subtotal = 0;
    cartItems.forEach(item => {
      // @ts-ignore
      subtotal +=(item.product?.price * item.quantity);
    })

    return subtotal;
  }
  checkout(){
    let total: any = 0;
    this.cartItem.forEach(cart => {
      total +=cart.product?.price;
    })
      this.stripe.pay(total);
  }

  paymentSuccess(){
    this.cartItem = [];
  }

  makePayment(){
    this.clientService.makePayment("1000").subscribe(res => {
      console.log(res.redirect_url);
      window.location.href = res.redirect_url;
    })
  }

  goBack(){
    this.router.navigate(['index']);
  }

}
