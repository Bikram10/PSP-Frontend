import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.signOut();
    this.router.navigate(["/"]);
  }

}
