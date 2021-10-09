import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Register} from "../../model/register";
import {AuthenticationService} from "../../../../service/authentication.service";
import {ToastrService} from "ngx-toastr";
import {MustMatch} from "../helper/must-match.validator";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm!: FormGroup;
  register: Register = {};
  submitted = false;
  formdata: FormData = new FormData();
  constructor(private toastService: ToastrService, private authService: AuthenticationService, private builder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.myForm = this.builder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      retype: ['', Validators.required]
    },
      {
        validators: MustMatch('password', 'retype')
      }
    )
  }

  get form(){
    return this.myForm.controls;
  }

  saveUser(){

    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }
    this.register.username = this.myForm.controls.username.value;
    this.register.email = this.myForm.controls.email.value;
    this.register.password=this.myForm.controls.password.value;

    this.formdata.append('registerUser', new Blob([JSON.stringify(this.register)], {type: 'application/json'}));

    this.authService.saveUser(this.formdata).subscribe(res =>{
      this.toastService.success("Successfully Registered, Click Sign to login");
    },
      error => {
        console.error(error)
      })

  }

}
