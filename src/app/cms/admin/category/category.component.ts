import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileHandle} from "../filedragdropdirective.directive";
import {Category} from "../model/category";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  myForm!: FormGroup;
  files: FileHandle[] = [];
  formData: FormData = new FormData();
  category: Category = {};

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  constructor(private formBuilder: FormBuilder, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.createCategory();
  }

  createCategory(){
    this.myForm = this.formBuilder.group({
      name: [''],
    });

  }

  addProduct(){

  }

  onSubmit(){
    this.category.categoryName = this.myForm.controls.name.value;

    this.formData.append('category', new Blob([JSON.stringify(this.category)],{ type: "application/json"}));

    this.formData.append('file', this.files[0].file);
    this.adminService.saveCategory(this.formData).subscribe(
      res =>{
        console.log(res);
      }
    );
  }

}
