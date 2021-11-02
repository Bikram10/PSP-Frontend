import {Component, Input, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {HomeService} from "../../service/home.service";
import {Product} from "../../cms/admin/model/product";
import {data} from "jquery";
import {ClientService} from "../../service/client.service";
import {Type} from "../../cms/admin/model/type";
import {CartItem} from "../model/cartItem";
import {Router} from "@angular/router";
import {LoginInfo} from "../../cms/admin/model/loginInfo";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  product: any;


  types: Type[] = [];

  itemCount: number = 0;

  newArrival: Product[] = [];
  viewedItem: Product[] = [];

  constructor(private homeService: HomeService, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.getNewArrivals();
    this.getMostViewed();
    this.exploreMoreItems();

    this.router.navigate([])
  }

  getNewArrivals(){
    this.homeService.authentication().subscribe(res => {
      console.log(res);
    })
    this.homeService.getNewArrivals().subscribe((data: any) => {
      this.newArrival = data['content'];
    });
  }

  getMostViewed(){
    this.homeService.getViewItem().subscribe((data: any) => {
      this.viewedItem = data['content'];
    })
  }

  exploreMoreItems(){
    this.clientService.getAllTypes().subscribe(type => {
      this.types = type;
    })
  }

  addToCart(){
     let item: CartItem = {
       quantity: 0
     }
     item.product = this.product;
     item.quantity = 1;
    this.clientService.saveCart(item).subscribe(res => {

    })
  }

}
