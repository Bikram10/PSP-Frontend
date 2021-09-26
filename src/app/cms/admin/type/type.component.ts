import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Type} from "../model/type";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-category',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  myForm!: FormGroup;
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  files: any[] = [];
  formData: FormData = new FormData();
  type: Type = {};

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

  addProduct(){

  }

  onSubmit(){
    this.type.name = this.myForm.controls.name.value;

    this.formData.append('category', new Blob([JSON.stringify(this.type)],{ type: "application/json"}));

    this.formData.append('file', this.files[0]);
    this.adminService.saveType(this.formData).subscribe(
      res =>{
        console.log(res);
      }
    );
  }

}
