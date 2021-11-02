import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./cms/admin/login/login/login.component";
import {RoleGuardService as RoleGuard} from "./service/role-guard.service";
import {DashboardComponent} from "./cms/admin/dashboard/dashboard.component";
import {HomeComponent} from "./client/home/home.component";
import {ChangepasswordComponent} from "./cms/changepassword/changepassword/changepassword.component";
import {SuccessComponent} from "./cms/changepassword/success/success.component";
import {UserlistComponent} from "./cms/admin/userlist/userlist.component";
import {AdminRoutingModule} from "./cms/admin/admin-routing.module";
import {ShoppingCartComponent} from "./client/shopping-cart/shopping-cart.component";
import {ProductInfoComponent} from "./client/product-info/product-info/product-info.component";
import {AppComponent} from "./app.component";
import {RegisterComponent} from "./cms/admin/register/register/register.component";
import {ResetPasswordComponent} from "./cms/admin/reset-password/reset-password.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'nav', loadChildren: ()=> import('./client/client.module').then(m => m.ClientModule), canActivate: [RoleGuard], data: {role: 'ROLE_USER'}},
  {path: 'dashboard', loadChildren: ()=> import('./cms/admin/admin.module').then(admin => admin.AdminModule), canActivate: [RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {path: 'forget', component: ResetPasswordComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
