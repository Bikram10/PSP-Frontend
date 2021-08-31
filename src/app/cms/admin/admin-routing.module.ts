import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoryComponent} from "./category/category.component";
import {ProductComponent} from "./product/product/product.component";
import {ProductlistComponent} from "./product/productlist/productlist.component";
import {ProductupdateComponent} from "./product/update/productupdate/productupdate.component";
import {RegisterComponent} from "./register/register/register.component";

export const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'product', component: ProductComponent},
    {path: 'productList', component: ProductlistComponent},
    {path: 'edit/:id', component:ProductupdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
