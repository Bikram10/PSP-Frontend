import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../../service/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
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

  returnUrl: string = '';

  constructor(private route: ActivatedRoute, private toast: ToastrService, private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService, private token: TokenStorageService, private helper: JwtHelperService) {
  }

  ngOnInit(): void {
    this.createLoginForm();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

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
    this.authService.attemptAuth(this.loginDetails.email.value, this.loginDetails.password.value).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.authService.changeAuthentication();

        const tokenPayload = this.helper.decodeToken(data.token);

        if(tokenPayload.scopes === "ROLE_ADMIN"){
          this.toast.success("Successfully authenticated");
          this.router.navigate(['dashboard']);
        } else if (tokenPayload.scopes === "ROLE_USER") {
          this.toast.success("Successfully authenticated");
          this.router.navigateByUrl(this.returnUrl);

        } else {
          this.router.navigate(['/']);
        }
      },
      next =>{
        this.toast.error("Invalid Username or Password")
      }
    );
  }

  register(): void {
    this.router.navigate(["register"])
  }

  forget(){
    this.router.navigate(['forget']);
  }

}
