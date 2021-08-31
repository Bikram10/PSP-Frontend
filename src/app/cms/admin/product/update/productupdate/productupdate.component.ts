import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductupdateService} from "../productupdate.service";
import {Product} from "../../../model/product";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../../model/category";
import {Attributes} from "../../../model/attributes";
import {createAttribute} from "@angular/compiler/src/core";

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
  categories: Category[] = [];
  formData!: FormData;
  attributes!: FormArray;
  features: string[] = ['RAM', 'Battery', 'Screen Size', 'Storage'];
  attribute!: Attributes;

  retrivesAttributes: string[] = [];

  constructor(private activateRoute: ActivatedRoute, private updateService: ProductupdateService, private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    let id!: number;
    this.activateRoute.params.subscribe(paramId => {
      id = paramId.id;
    })
    this.createForm();

    this.updateService.getProduct(id).subscribe(product => {
      product.attributes.forEach((attribute: any, attributeIndex: number) => {
        if(attributeIndex)
          this.addAttribute(attribute);
      })
      this.myForm.patchValue(product);
      console.log(this.myForm.value);
    })


  }



  changeCategory(event: any){
    let temp: Category = {};
    temp.category_id = event.target.value;

    this.product.category = temp;
  }
  get attributeForm(){
    return this.myForm.get('attributes') as FormArray;
  }

  update(){
    this.formData.append('product', new Blob([]))
    //this.updateService.updateProduct();
  }

  createForm(){
    this.myForm = this.formBuilder.group({
      product_name: [''],
      category_name: [''],
      product_description: [''],
      product_price: [''],
      product_quantity: [''],
      stock_status: [''],
      attributes: this.formBuilder.array([this.createAttribute()])
    });
  }

  createAttribute(attribute?: Attributes): FormGroup{
    let id = null;
    let attributeName = attribute ? attribute.attributeName : '';
    let  attributeType = attribute ? attribute.attributeType : '';

    let group: FormGroup = this.formBuilder.group({
      id: new FormControl(id),
      attributeType: new FormControl(attributeType),
      attributeName: new FormControl(attributeName)
    });

    return group;
  }
  removeAttribute(attributeIndex: number){
    const control = <FormArray>this.myForm.controls['attributes'];
    control.removeAt(attributeIndex);
  }


  addAttribute(attribute?: Attributes){
    this.attributes = this.myForm.get('attributes') as FormArray;
    this.attributes.push(this.createAttribute(attribute));
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

}
