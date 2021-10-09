import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {NavComponent} from "./nav/nav.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { CancelComponent } from './stripe/cancel/cancel.component';
import { SuccessComponent } from './stripe/success/success.component';
import { CheckoutComponent } from './stripe/checkout/checkout.component';
import {ClientService} from "../service/client.service";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductItemComponent } from './product-detail/product-Item/product-item/product-item.component';
import { CartItemComponent } from './shopping-cart/cart-item/cart-item.component';
import {HomeService} from "./home.service";
import { ProductInfoComponent } from './product-info/product-info/product-info.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    NavComponent,
    HomeComponent,
    CancelComponent,
    SuccessComponent,
    CheckoutComponent,
    ShoppingCartComponent,
    ProductItemComponent,
    CartItemComponent,
    ProductInfoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ClientService, HomeService]
})
export class ClientModule { }
