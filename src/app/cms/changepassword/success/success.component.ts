import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {AdminService} from "../../admin/admin.service";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  token: string = '';
  show = false;
  constructor(private router: Router, private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    })
    this.checkTokenStatus();
  }

  checkTokenStatus(){
    this.adminService.changePassword(this.token).subscribe((message: any) => {
        if(message.tokenMessage === 'success'){
            this.show = true;
        }
        else{
          this.show = false;
        }
    })
  }

  reset(){
    this.router.navigate(['change']);
  }

  back(){
    this.router.navigate(['login']);
  }

}
