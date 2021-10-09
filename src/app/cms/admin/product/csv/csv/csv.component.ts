import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileHandle} from "../../../directive/filedragdropdirective.directive";
import {AdminService} from "../../../admin.service";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
  name: string = '';
  formData: FormData = new FormData();
  files: any[] = [];
  progress: number = 0;

  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;

  constructor(private adminService: AdminService, private toast: ToastrService){}

  onFileChange(pFileList: any){
    this.files = pFileList.files;
  }


  ngOnInit(): void {
  }

  showProgress(){
    this.progress = 0;
    setInterval(() => this.progressBar(), 200);
  }

  progressBar(){
    if(this.progress == 0){
      this.progress = this.progress + 1;
    }
    else{
      this.progress = this.progress + 8;
      if(this.progress >= 100){
        this.progress = 100;
      }
    }
  }
  upload() {
    this.progress = 0;
    this.formData.append('file', new Blob([this.files[0]], {type: 'text/csv'}));

    this.adminService.uploadProductCSV(this.formData).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
          this.showProgress();
      } else if (event instanceof HttpResponse) {
        this.toast.show("File is Uploaded");
        window.location.reload();
      }
    }, (error) => {
      this.progress = 0;
      console.log('Error occured while uploading file');
    });
  }
}
