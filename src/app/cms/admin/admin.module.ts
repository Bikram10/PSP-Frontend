import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';

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
import { CsvComponent } from './product/csv/csv/csv.component';
import {CsvDirective} from "./directive/csv.directive";
import { OrderlistComponent } from './orderlist/orderlist/orderlist.component';
import { ConfirmComponent } from './register/confirm/confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserlistComponent } from './userlist/userlist.component';
import {RouterModule} from "@angular/router";
import {AdminRoutingModule, routes} from "./admin-routing.module";
import {LoginComponent} from "./login/login/login.component";

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
        CsvComponent,
        OrderlistComponent,
        ConfirmComponent,
        ResetPasswordComponent,
        UserlistComponent,
    ],
    exports: [
        ProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class AdminModule { }
