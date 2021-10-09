import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../cms/admin/model/product";
import {ClientService} from "../../../../service/client.service";
import {CartItem} from "../../../model/cartItem";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  form!: FormGroup;
  constructor(private clientService: ClientService, private builder: FormBuilder) { }

  ngOnInit(): void {
  }

  addCart(){
    this.item.product = this.product;
    this.item.quantity = this.quantity;
      this.clientService.saveCart(this.item).subscribe(res => {
        console.log("Success");
      })
  }

}
