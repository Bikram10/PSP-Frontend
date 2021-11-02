import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../model/product";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../admin.service";
import {Type} from "../../model/type";
import {Toast, ToastrService} from "ngx-toastr";
import {Stock} from "../../model/Stock";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  formData: FormData = new FormData();
  product: Product = {};
  myForm!: FormGroup;
  types: Type[] = [];
  stock: string[] = ['IN STOCK', 'OUT OF STOCK', 'IN FEW DAYS'];

  submitted: boolean = false;

  title: any = '';
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;

  files: any[] = [];
  constructor(private toast: ToastrService, private builder: FormBuilder, private adminService: AdminService) { }

  ngOnInit(): void {

    this.adminService.getCategory().subscribe(
      type =>{
        this.types = type;
      }
    )
    this.createProductForm();
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
      console.log(item);
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

  changeCategory(event: any){
    let temp: Type = {};
    temp.type_id = event.target.value;

    this.product.type = temp;
  }

  changeStock(event: any){
    let temp: Stock;

    temp = event.target.value;
    this.product.stockStatus = temp;
  }

  createProductForm(){
    this.myForm = this.builder.group({
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      SKU: ['', Validators.required],
      category: ['', Validators.required],
      type: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required],
      productQuantity: ['', Validators.required],
      stockStatus: ['', Validators.required],

    });
  }

  saveProduct(){
    this.submitted = true;
    this.product.brand = this.myForm.controls.brand.value;
    this.product.sku = this.myForm.controls.SKU.value;
    this.product.product_name = this.myForm.controls.productName.value;
    this.product.description = this.myForm.controls.productDescription.value;
    this.product.price = this.myForm.controls.productPrice.value;
    this.product.quantity = this.myForm.controls.productQuantity.value;
    this.product.stockStatus = this.myForm.controls.stockStatus.value;


    this.formData.append('product', new Blob([JSON.stringify(this.product)], {type: 'application/json'}));
    console.log(this.files);
    this.formData.append("file", this.files[0]);
    console.log(this.myForm.value);
    this.adminService.saveProduct(this.formData).subscribe(
      res =>{
        this.toast.show("Product added successfully");
      }
    )

  }

}
