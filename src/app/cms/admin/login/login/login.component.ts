import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../../service/token-storage.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;

  submitted = false;
  constructor(private toast: ToastrService, private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private token: TokenStorageService, private helper: JwtHelperService) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.myForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  get loginDetails(){
    return this.myForm.controls;
  }

  login(): void {
    this.submitted = true;
    this.authService.attemptAuth(this.loginDetails.email.value, this.loginDetails.password.value).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.authService.changeAuthentication();

        const tokenPayload = this.helper.decodeToken(data.token);

        if(tokenPayload.scopes === "ROLE_ADMIN"){
          this.router.navigate(['dashboard']);
        } else if (tokenPayload.scopes === "ROLE_USER") {
          this.router.navigate(['landing-page']);
        } else {
          this.router.navigate(['/']);
        }
      },
      next =>{
        this.toast.error("Invalid Username or Password")
      },
      () => {
        this.toast.success("Succuessfully authenticated!");

      }
    );
  }

  register(): void {
    this.router.navigate(["register"])
  }

}
