import { Component, OnInit } from '@angular/core';
import {StripeServiceService} from "../../../service/stripe-service.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private stripeService: StripeServiceService) { }


  ngOnInit(): void {
  }

  pay(){
    this.stripeService.pay();
  }

}
