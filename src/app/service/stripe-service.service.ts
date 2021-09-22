import { Injectable } from '@angular/core';
import {loadStripe} from "@stripe/stripe-js/pure";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Constants} from "../shared/constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StripeServiceService {

  baseUrl: string = Constants.base_url;
  stripePromise = loadStripe(environment.stripe);
  constructor(private http: HttpClient) { }

  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: 99900,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

    // this is a normal http calls for a backend api
    this.http
      .post(this.baseUrl + "/stripeApi/payment", payment)
      .subscribe((data: any) => {
        // I use stripe to redirect To Checkout page of Stripe platform
        stripe?.redirectToCheckout({
          sessionId: data.id,
        });
      });
  }
}