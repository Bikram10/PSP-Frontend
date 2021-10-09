import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../admin.service";
import {Product} from "../../model/product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Filter} from "../../model/filter";
import {ActivatedRoute, Router} from "@angular/router";
import {Stock} from "../../model/Stock";


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  products: Product[] = [];
  page: number = 0;
  pages!: Array<number>;
  myForm!: FormGroup;
  product: Product = {};
  filter: Filter = {
    keyword: ''
  };

  stocks = [{name: Stock.IN_STOCK, value: "In stock"}, {name: Stock.OUT_OF_STOCK, value: "Out of Stock"}, {name: Stock.IN_FEW_DAYS, value: "In Few Days"}]

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getPaging();
    this.createForm();

  }

  createForm(){
    this.myForm = this.formBuilder.group({
      keyword: ['']
    })
  }

  getPaging(){
    this.adminService.getPagingProduct(this.page, this.filter.keyword).subscribe((data: any) =>{
        this.products = data['content'];
        this.pages = new Array(data['totalPages']);

    });

  }

  setPage(i: number, event:any){
    event.preventDefault();
    this.page = i;

    this.getPaging();
  }

  previous(event: any){
    event.preventDefault();
    if(this.page == 0)
    {
      this.page = 0;
    }
    else{
      this.page--;

    }
    this.getPaging();
  }

  getStock(stock: Stock){
    return Stock.IN_STOCK === stock;
  }

  next(event: any){
    event.preventDefault();
    this.page++;
    this.getPaging();
  }

  deleteProduct(id: any){
    this.adminService.deleteProduct(id).subscribe(res => {
      window.location.reload();
    })
  }

  updateProduct(id: any){
  }


}


