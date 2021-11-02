import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ClientService} from "../../service/client.service";
import {Type} from "../../cms/admin/model/type";
import {Product} from "../../cms/admin/model/product";
import {AdminService} from "../../cms/admin/admin.service";
import {ActivatedRoute} from "@angular/router";
import {param, valHooks} from "jquery";

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
  selectedText: any;
  min: number = 0;
  max: number = 0;
  start: number = 0;
  limit: number = 3;
  myForm!: FormGroup;
  brandParameter: any[] = [];
  cartNumber: number = 0;
  cartProductList: any[] = [];
  distinctBrand = [];

  @Output()
  productAdded: EventEmitter<any> = new EventEmitter<any>();
  constructor(private activatedRoute: ActivatedRoute, private builder: FormBuilder, private clientService: ClientService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.searchProduct = params.searchProduct
      this.selectedText = params.searchBrand;
    })

    this.clientService.getAllTypes().subscribe(types => {
      this.types = types;
    });
    this.createForm();
    this.getAllbrands();
    this.search();

  }
  createForm(){
    this.myForm = this.builder.group({
      brandNames: this.builder.array([]),
      min: [''],
      max: ['']
    })
  }
  checkBrand(name: string, event: any) {
    const brandNames = <FormArray>this.myForm.controls.brandNames;
    const isChecked = event.target.checked;
    let index = brandNames.controls.findIndex(x => x.value == name);
    console.log(index);

    if (isChecked) {
      brandNames.push(new FormControl(name));
    } else {
      brandNames.removeAt(index);
    }

    this.brandParameter = brandNames.value;

    this.searchByBrand(this.brandParameter);
  }

  searchByBrand(brand: any[]){
    this.clientService.getAllFilters(brand).subscribe(res => {
      this.product = res;
    });

  }

  getAllbrands(){
    this.clientService.getAll().subscribe(res => {
      res.forEach(product => {
        this.brands.push({name: product.brand, value: product.brand});
      })
    })
  }


  search(){
    console.log(this.selectedText);
    this.clientService.getFilterData(this.searchProduct, this.selectedText).subscribe(res =>{
      this.product = res;
    })
  }

  searchByType(typeId: any){

    this.clientService.gerFilterByType(typeId).subscribe(res => {
      this.product = res;
    })
  }

  searchByPrice(){
      this.clientService.searchByPrice(this.myForm.controls.min.value, this.myForm.controls.max.value).subscribe(res =>{
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
