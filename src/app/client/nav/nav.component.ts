import {Component, Input, OnInit} from '@angular/core';
import * as $ from "jquery";
import {Router} from "@angular/router";
import {MessageService} from "../message.service";
import {ClientService} from "../../service/client.service";
import {Product} from "../../cms/admin/model/product";

@Component({
  selector: 'app-landing-page',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input()
  searchProduct: string = '';

  @Input()
  product: Product[] = [];

  total: number = 0;


  cartNumber: number = 0;
  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.getCartTotal().subscribe(res => {
      this.total = res;
    })
    $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  }
  search(){
    this.router.navigate(['product-detail', {searchText: this.searchProduct}]);
  }

  cart(){
    this.router.navigate(["cart"]);
  }

}
