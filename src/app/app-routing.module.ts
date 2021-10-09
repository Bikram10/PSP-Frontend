import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./cms/admin/login/login/login.component";
import {RoleGuardService as RoleGuard} from "./service/role-guard.service";
import {DashboardComponent} from "./cms/admin/dashboard/dashboard.component";
import {NavComponent} from "./client/nav/nav.component";
import {HomeComponent} from "./client/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'ROLE_ADMIN'}},
  {path: 'landing-page', component: HomeComponent, canActivate: [RoleGuard], data: {role: 'ROLE_USER'}}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
