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
  upload(){
      this.formData.append('file', new Blob([this.files[0]], {type: 'text/csv'}));

      this.adminService.uploadProductCSV(this.formData).subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // @ts-ignore
          this.progress = Math.round(100 * event.loaded / event.total);

        } else if (event instanceof HttpResponse) {
          this.toast.show(event.body.responseMessage);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
        }
      });

  }

}
