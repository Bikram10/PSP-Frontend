import { Component, OnInit } from '@angular/core';
import {StripeServiceService} from "../../../service/stripe-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HomeService} from "../../../service/home.service";
import {Shipping} from "../../model/shipping";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {param} from "jquery";
import {ClientService} from "../../../service/client.service";
import {Cart} from "../../model/cart";
import {Order} from "../../model/order";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  myForm!: FormGroup;
  shipping: Shipping = {};
  paypal = false;
  paymentId: any;
  payerId: any;
  cart: Cart = {};
  grandTotal: any = 0;
  order: Order = {};

  constructor(private clientService: ClientService, private toast: ToastrService, private homeService: HomeService, private builder: FormBuilder,private stripeService: StripeServiceService, private  route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((param: any) => {
      this.grandTotal = param['grandTotal'];
        if(param['paymentId'] !=null && param['PayerID'] !=null && param['token'] !=null){
          this.paymentId = param['paymentId'];
          this.payerId = param['PayerID']
          this.paypal = true;
        }
    })
    this.createForm();
    this.getCartItems();
  }

  createForm(){
    this.myForm = this.builder.group({
      name: [''],
      email: [''],
      address: [''],
      city: [''],
      zip: [''],
      state: ['']
    })
  }

  getCartItems(){
    this.clientService.getCarts().subscribe(res => {
      this.cart = res;
    })
  }

  checkout(){
    this.shipping.name = this.myForm.controls.name.value;
    this.shipping.email = this.myForm.controls.email.value;
    this.shipping.address = this.myForm.controls.address.value;
    this.shipping.city = this.myForm.controls.city.value;
    this.shipping.state = this.myForm.controls.state.value;
    this.shipping.zip = this.myForm.controls.zip.value;

    this.homeService.saveShippingDetails(this.shipping).subscribe(res => {
      console.log(res);
      this.toast.success("Shipping Details is saved");
    });

    if(this.paypal){
      this.homeService.completePayment(this.paymentId, this.payerId).subscribe(res => {
          if(res.status === 'success'){
            this.toast.show("Thank You for your purchase");

          }
          else if(res.status =='PAYMENT_ALREADY_DONE'){
            this.toast.info("Payment has already made for this cart");
          }
      })
    }
    else {
      this.homeService.placeOrder().subscribe(res => {
        console.log(res);
      })
      this.stripeService.pay(this.grandTotal);
    }

  }

}
