import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from "./cms/admin/dashboard/dashboard.component";
import { CategoryComponent } from './cms/admin/category/category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FiledragdropdirectiveDirective } from './cms/admin/filedragdropdirective.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './cms/admin/login/login/login.component';
import {BasicAuthHttpInterceptorService} from "./service/basic-auth-http-interceptor.service";
import {AuthenticationService} from "./service/authentication.service";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {RoleGuardService} from "./service/role-guard.service";
import {TokenStorageService} from "./service/token-storage.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CategoryComponent,
    FiledragdropdirectiveDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHttpInterceptorService,
      multi: true
    },
    AuthenticationService,
    TokenStorageService,
    RoleGuardService,
    JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('AuthToken');
}
