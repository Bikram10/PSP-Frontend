import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductupdateService} from "../productupdate.service";
import {Product} from "../../../model/product";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Type} from "../../../model/type";
import {Attributes} from "../../../model/attributes";
import {createAttribute} from "@angular/compiler/src/core";
import {AdminService} from "../../../admin.service";
import {ToastrService} from "ngx-toastr";
import {Stock} from "../../../model/Stock";
import {ImageUrls} from "../../../model/ImageUrls";

@Component({
  selector: 'app-productupdate',
  templateUrl: './productupdate.component.html',
  styleUrls: ['./productupdate.component.css']
})
export class ProductupdateComponent implements OnInit {

  product: Product = {};
  myForm!: FormGroup;
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;

  files: any[] = [];
  types: Type[] = [];
  type_name: string = '';
  stock_name?: Stock;
  formData: FormData = new FormData();
  imageUrls: ImageUrls[] = [];
  id: any = 0;

  constructor(private toast: ToastrService, private adminService: AdminService, private activateRoute: ActivatedRoute, private updateService: ProductupdateService, private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.activateRoute.params.subscribe(paramId => {
      this.id = paramId.id;
    })
    this.createForm();

    this.adminService.getCategory().subscribe(types => {
        this.types = types;
    })
    this.updateService.getProduct(this.id).subscribe(product => {

      this.type_name = product.type.name;
      this.stock_name = product.stockStatus;
      this.imageUrls = product.product_img_url;
      this.myForm.patchValue(product);
    })


  }



  changeCategory(event: any){
    let temp: Type = {};
    temp.type_id = event.target.value;

    this.product.type = temp;
  }
  get attributeForm(){
    return this.myForm.get('attributes') as FormArray;
  }

  createForm(){
    this.myForm = this.formBuilder.group({
      brand: [''],
      product_name: [''],
      sku: [''],
      category: [''],
      type: [''],
      description: [''],
      short_description: [''],
      price: [''],
      quantity: [''],
      stockStatus: [''],
    });
  }

  onFileDropped(event: any) {
    this.prepareFilesList(event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any) {
    this.prepareFilesList(files.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  update(){
    this.product.product_id = this.id;
    this.product.brand = this.myForm.controls.brand.value;
    this.product.sku = this.myForm.controls.sku.value;
    this.product.category = this.myForm.controls.category.value;
    this.product.type = this.myForm.controls.type.value;
    this.product.product_name = this.myForm.controls.product_name.value;
    this.product.product_img_url = this.imageUrls;
    this.product.short_description = this.myForm.controls.short_description.value;
    this.product.description = this.myForm.controls.description.value;
    this.product.price = this.myForm.controls.price.value;
    this.product.quantity = this.myForm.controls.quantity.value;
    this.product.stockStatus = this.myForm.controls.stockStatus.value;



    this.formData.append("product", new Blob([JSON.stringify(this.product)], {type: 'application/json'}));
    if(this.files.length !=0) {
      for (let file of this.files) {
        this.formData.append("file[]", file);
      }
    }
    this.updateService.updateProduct(this.formData).subscribe(
      res =>{
        this.toast.show("Product added successfully");
      }
    )
  }

}
