import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AdminService} from "../../admin.service";
import {Product} from "../../model/product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Filter} from "../../model/filter";
import {ActivatedRoute, Router} from "@angular/router";


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
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private adminService: AdminService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    let id: any;
    this.getPaging();
    this.createForm();

  }

  createForm(){
    this.myForm = this.formBuilder.group({
      keyword: ['']
    })
  }

  listSearch(){
    this.adminService.getProduct().subscribe(data => {
      this.products = data;
    });
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

  next(event: any){
    event.preventDefault();
    this.page++;
    this.getPaging();
  }

  deleteProduct(id: any){
    this.adminService.deleteProduct(id).subscribe(res => {
      console.log("Item deleted");
      window.location.reload();
    })
  }

  updateProduct(id: any){
  }


}


