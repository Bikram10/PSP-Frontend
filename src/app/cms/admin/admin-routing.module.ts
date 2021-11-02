import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TypeComponent} from "./type/type.component";
import {ProductComponent} from "./product/product/product.component";
import {ProductlistComponent} from "./product/productlist/productlist.component";
import {ProductupdateComponent} from "./product/update/productupdate/productupdate.component";
import {RegisterComponent} from "./register/register/register.component";
import {CsvComponent} from "./product/csv/csv/csv.component";
import {ConfirmComponent} from "./register/confirm/confirm.component";
import {OrderlistComponent} from "./orderlist/orderlist/orderlist.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: DashboardComponent, children: [
      {path: 'category', component: TypeComponent},
      {path: 'product', component: ProductComponent},
      {path: 'listProduct', component: ProductlistComponent},
      {path: 'edit/:id', component:ProductupdateComponent},
      {path: 'csv', component: CsvComponent},
      {path: 'confirm', component: ConfirmComponent},
      {path: 'orderList', component: OrderlistComponent},
      {path: 'reset', component: ResetPasswordComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
