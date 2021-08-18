import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from "./cms/admin/dashboard/dashboard.component";
import { CategoryComponent } from './cms/admin/category/category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FiledragdropdirectiveDirective } from './cms/admin/filedragdropdirective.directive';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoryComponent,
    FiledragdropdirectiveDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
