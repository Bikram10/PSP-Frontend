import { Component, OnInit } from '@angular/core';
import {StripeServiceService} from "../../../service/stripe-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  myForm!: FormGroup;

  constructor(private builder: FormBuilder,private stripeService: StripeServiceService) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.myForm = this.builder.group({
      name: [''],
      cardNumber: [''],
      expMonth: [''],
      expYear: [''],
      cvv: ['']
    })
  }

  pay(){
  }

}
