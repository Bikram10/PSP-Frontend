import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../shared/constants";
import {Observable} from "rxjs";
import {Type} from "./model/type";
import {Form} from "@angular/forms";
import {Product} from "./model/product";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: String = Constants.base_url;
  constructor(private http: HttpClient) { }

  saveCategory(formData: FormData): Observable<Category>{
    return this.http.post<any>(this.baseUrl + "/category", formData);

  saveType(formData: FormData): Observable<any>{
    return this.http.post<any>(this.baseUrl + "/typeApi/type", formData);
  }

  saveProduct(formData: FormData): Observable<any>{
    return this.http.post<any>(this.baseUrl+"/productApi/product", formData);
  }

  getCategory(): Observable<Type[]>{
    return this.http.get<Type[]>(this.baseUrl + "/typeApi/listType");
  }

  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/productApi/listProduct");
  }

  getProductById(id: number){
    return this.http.get(this.baseUrl+"/productApi/getProduct/"+id, {
      responseType: 'json'
    });
  }

  getPagingProduct(page: any, keyword: any){
    return this.http.get(this.baseUrl+"/productApi/paging?page="+page+"&name="+keyword);
  }

  editProduct(id: any): Observable<Product>{
    return this.http.post<any>(this.baseUrl+"/productApi/updateProduct"+id, {});
  }

  deleteProduct(id: any){
      return this.http.post(this.baseUrl + "/productApi/delete/" + id, {
        observe: 'body',
        responseType: 'json'
      });

  }

  uploadProductCSV(formData: FormData): Observable<any>{
    return this.http.post<any>(this.baseUrl+"/productApi/upload", formData, {
      reportProgress: true,
      responseType: 'json'
    });
  }

}
