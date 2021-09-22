import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { CancelComponent } from './stripe/cancel/cancel.component';
import { SuccessComponent } from './stripe/success/success.component';
import { CheckoutComponent } from './stripe/checkout/checkout.component';
import {ClientService} from "../service/client.service";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    LandingPageComponent,
    HomeComponent,
    CancelComponent,
    SuccessComponent,
    CheckoutComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ClientService]
})
export class ClientModule { }
