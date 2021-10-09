import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ClientService} from "../../service/client.service";
import {Type} from "../../cms/admin/model/type";
import {Product} from "../../cms/admin/model/product";
import {AdminService} from "../../cms/admin/admin.service";
import {ActivatedRoute} from "@angular/router";
import {param} from "jquery";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  more = true;
  types: Type[] = [];
  brands: Array<any> = [];
  product!: Product[];
  searchProduct: any;
  min: number = 0;
  max: number = 0;
  start: number = 0;
  limit: number = 3;
  myForm!: FormGroup;
  brandParameter: any[] = [];
  cartNumber: number = 0;
  cartProductList: any[] = [];

  @Output()
  productAdded: EventEmitter<any> = new EventEmitter<any>();
  constructor(private activatedRoute: ActivatedRoute, private builder: FormBuilder, private clientService: ClientService) { }

  ngOnInit(): void {
    this.searchProduct = this.activatedRoute.snapshot.paramMap.get("searchText");

    this.clientService.getAllTypes().subscribe(types => {
      this.types = types;
    });
    this.createForm();
    this.search();

  }
  createForm(){
    this.myForm = this.builder.group({
      brandNames: this.builder.array([]),
      min: [''],
      max: ['']
    })
  }
  checkBrand(name: string, event: any){
    const brandNames = <FormArray> this.myForm.controls.brandNames;
    const isChecked = event.target.checked;

    if(isChecked){
      brandNames.push(new FormControl(name));
    }
    else{
      let index = brandNames.controls.findIndex(x => x.value == name);
      brandNames.removeAt(index);
    }
    this.brandParameter = brandNames.value;
  }

  search(){
    this.clientService.getFilterData(this.searchProduct).subscribe(res =>{
      this.product = res;
      res.forEach(p => {
        this.brands.push({name: p.brand, value: p.brand});
      })
    })
  }

  searchByType(typeId: any){
    this.clientService.gerFilterByType(typeId).subscribe(res => {
      this.product = res;
    })
  }
  searchDetails(){
    this.clientService.getFilter(this.brandParameter, this.myForm.controls.min.value, this.myForm.controls.max.value).subscribe(res => {
        console.log(res);
    })
  }
  showMore(){
    this.limit = Number(this.limit) + this.brands.length;
  }

  showLess(){
    this.limit = Number(this.limit) - this.brands.length;
  }

  filter(){
    this.searchDetails();
  }


}
