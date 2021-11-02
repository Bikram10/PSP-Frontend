import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router, private tokenService: TokenStorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.signOut();
    this.router.navigate(["/"]);
  }

  showCategory(){
    this.router.navigate(['category'], {relativeTo: this.route});
  }

  showProduct(){
    this.router.navigate(['csv'], {relativeTo: this.route});
  }

  showList(){
    this.router.navigate(['listProduct'], {relativeTo: this.route});

  }

  showOrder(){
    this.router.navigate(['orderList'], {relativeTo: this.route});

  }


}
