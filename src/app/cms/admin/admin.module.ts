import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TypeComponent} from "./type/type.component";
import {FiledragdropdirectiveDirective} from "./directive/filedragdropdirective.directive";
import {ProductComponent} from "./product/product/product.component";
import {ProductlistComponent} from "./product/productlist/productlist.component";
import {DndDirective} from "../directive/dnd.directive";
import {ProgressComponent} from "../progress/progress.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ProductupdateComponent} from "./product/update/productupdate/productupdate.component";
import {RegisterComponent} from "./register/register/register.component";
import {Router, RouterModule} from "@angular/router";
import {ClientModule} from "../../client/client.module";
import { CsvComponent } from './product/csv/csv/csv.component';
import {CsvDirective} from "./directive/csv.directive";

@NgModule({
  declarations: [
    DashboardComponent,
    ProductlistComponent,
    TypeComponent,
    FiledragdropdirectiveDirective,
    ProductComponent,
    DndDirective,
    CsvDirective,
    ProgressComponent,
    ProductupdateComponent,
    RegisterComponent,
    CsvComponent
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
