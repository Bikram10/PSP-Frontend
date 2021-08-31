import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CategoryComponent} from "./category/category.component";
import {FiledragdropdirectiveDirective} from "./filedragdropdirective.directive";
import {ProductComponent} from "./product/product/product.component";
import {ProductlistComponent} from "./product/productlist/productlist.component";
import {DndDirective} from "../directive/dnd.directive";
import {ProgressComponent} from "../progress/progress.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SortableDirective} from "./directive/sortable.directive";
import {ProductupdateComponent} from "./product/update/productupdate/productupdate.component";
import {RegisterComponent} from "./register/register/register.component";
import {Router, RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    DashboardComponent,
    ProductlistComponent,
    CategoryComponent,
    FiledragdropdirectiveDirective,
    ProductComponent,
    DndDirective,
    ProgressComponent,
    SortableDirective,
    ProductupdateComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
