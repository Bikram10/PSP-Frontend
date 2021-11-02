import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'PSP-Frontend';

  private route: ActivatedRouteSnapshot;

  role: string = 'ROLE_ADMIN';
  disable = false;

  constructor(private activatedRoute: ActivatedRoute) {
    console.log(activatedRoute.snapshot.data.role);
    this.route = activatedRoute.snapshot;
  }

  ngOnInit() {
    console.log(this.route.data.role);
    if(this.role === this.route.data.role){
      this.disable = true;
    }
  }
}
