import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {HomeComponent} from "./home/home.component";
import {CheckoutComponent} from "./stripe/checkout/checkout.component";
import {SuccessComponent} from "./stripe/success/success.component";
import {CancelComponent} from "./stripe/cancel/cancel.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductInfoComponent} from "./product-info/product-info/product-info.component";

const routes: Routes = [
  {
    path: 'product-detail', component: ProductDetailComponent
  },
  {
    path: 'index', component: HomeComponent
  },
  {path: 'info/:id', component: ProductInfoComponent},
  {path: 'cart', component: ShoppingCartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'success', component: SuccessComponent},
  {path: 'cancel', component: CancelComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
