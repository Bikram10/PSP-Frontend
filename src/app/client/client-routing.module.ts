import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "../cms/admin/register/register/register.component";
import {TypeComponent} from "../cms/admin/type/type.component";
import {ProductComponent} from "../cms/admin/product/product/product.component";
import {ProductlistComponent} from "../cms/admin/product/productlist/productlist.component";
import {ProductupdateComponent} from "../cms/admin/product/update/productupdate/productupdate.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {HomeComponent} from "./home/home.component";
import {CheckoutComponent} from "./stripe/checkout/checkout.component";
import {SuccessComponent} from "./stripe/success/success.component";
import {CancelComponent} from "./stripe/cancel/cancel.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";

const routes: Routes = [
  {
    path: 'product-detail', component: ProductDetailComponent
  },
  {
    path: 'index', component: HomeComponent
  },
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'cancel', component: CancelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
