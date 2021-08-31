import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BasicAuthHttpInterceptorService} from "./service/basic-auth-http-interceptor.service";
import {AuthenticationService} from "./service/authentication.service";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {RoleGuardService} from "./service/role-guard.service";
import {TokenStorageService} from "./service/token-storage.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AdminModule} from "./cms/admin/admin.module";
import {ToastrModule} from "ngx-toastr";
import {LoginComponent} from "./cms/admin/login/login/login.component";
import {AdminRoutingModule} from "./cms/admin/admin-routing.module";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminRoutingModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    BrowserAnimationsModule,

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
