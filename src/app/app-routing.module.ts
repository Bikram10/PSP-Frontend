import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./cms/admin/login/login/login.component";
import {RoleGuardService as RoleGuard} from "./service/role-guard.service";
import {DashboardComponent} from "./cms/admin/dashboard/dashboard.component";
import {LandingPageComponent} from "./client/landing-page/landing-page.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard], data: { role: 'ROLE_ADMIN'}},
  {path: 'landing-page', component: LandingPageComponent, canActivate: [RoleGuard], data: {role: 'ROLE_USER'}}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
