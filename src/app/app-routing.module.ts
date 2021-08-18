import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./cms/admin/dashboard/dashboard.component";
import {CategoryComponent} from "./cms/admin/category/category.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'category', component: CategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
