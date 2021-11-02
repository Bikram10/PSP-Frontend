import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {HomeComponent} from "./home/home.component";
import {CheckoutComponent} from "./stripe/checkout/checkout.component";
import {SuccessComponent} from "../cms/changepassword/success/success.component";
import {CancelComponent} from "./stripe/cancel/cancel.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {ProductInfoComponent} from "./product-info/product-info/product-info.component";
import {ItemsComponent} from "./items/items.component";
import {OrderhistoryComponent} from "./orderhistory/orderhistory.component";
import {ContactusComponent} from "./contactus/contactus.component";
import {NavComponent} from "./nav/nav.component";
import {H} from "@angular/cdk/keycodes";
import {FaqComponent} from "./faq/faq.component";
import {AboutComponent} from "./about/about.component";
import {ChangepasswordComponent} from "../cms/changepassword/changepassword/changepassword.component";
import {LoginGuard} from "../service/login-guard";

const routes: Routes = [
  {path: 'changePassword', component: ChangepasswordComponent},
  {
    path: '', component: NavComponent,
    children: [
      {path: '', component: HomeComponent},
      { path: 'product-detail', component: ProductDetailComponent},
      {path: 'info/:id', component: ProductInfoComponent},
      {path: 'orderHistory', component: OrderhistoryComponent, canActivate: [LoginGuard]},
      {path: 'cart', component: ShoppingCartComponent, canActivate: [LoginGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate: [LoginGuard]},
      {path: 'success', component: SuccessComponent},
      {path: 'cancel', component: CancelComponent},
      {
        path: 'items/:id', component: ItemsComponent
      },
      {
        path: 'contact', component: ContactusComponent
      },
      {path: 'faq', component: FaqComponent},
      {path: 'about', component: AboutComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
