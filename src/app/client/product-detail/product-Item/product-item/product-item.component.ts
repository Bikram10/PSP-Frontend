
import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../cms/admin/model/product";
import {ClientService} from "../../../../service/client.service";
import {CartItem} from "../../../model/cartItem";
import {FormBuilder, FormGroup} from "@angular/forms";
import {HomeService} from "../../../../service/home.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  product: Product = {};
  item: CartItem = {
    quantity: 0
  };
  quantity: number = 1;

  stars: any[] = [1, 2, 3, 4, 5];

  form!: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  productInfo(id: any){
    this.router.navigate(['info', id])
  }

}
