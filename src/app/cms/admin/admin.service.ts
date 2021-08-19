import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../shared/constants";
import {Observable} from "rxjs";
import {Category} from "./model/category";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: String = Constants.base_url;
  constructor(private http: HttpClient) { }

  saveCategory(formData: FormData): Observable<Category>{
    return this.http.post<any>(this.baseUrl + "/category", formData);
  }
}
