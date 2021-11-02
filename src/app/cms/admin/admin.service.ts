import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams} from "@angular/common/http";
import {Constants} from "../../shared/constants";
import {Observable} from "rxjs";
import {Type} from "./model/type";
import {Form} from "@angular/forms";
import {Product} from "./model/product";
import {Order} from "../../client/model/order";
import {Register} from "./model/register";
import {AuthLogin} from "./model/auth-login";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl: String = Constants.base_url;
  constructor(private http: HttpClient) { }



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

  uploadProductCSV(formData: FormData): Observable<HttpEvent<any>>{
    return this.http.post<any>(this.baseUrl+"/productApi/upload", formData, {
      reportProgress: true,
      observe: "events",
      responseType: 'json'
    });
  }

  getOrderService(): Observable<Order[]>{
    return this.http.get<Order[]>(this.baseUrl+"/orderApi/orderList");
  }

  updateStatus(id: any, status: any): Observable<any> {
    let params: HttpParams = new HttpParams().set('id', id)
      .set('status', status)
    return this.http.post(this.baseUrl+"/orderApi/updateStatus", params);
  }

  resetPwd(email: string): Observable<any>{
    let params = new HttpParams().set('email', email);
    return this.http.post(this.baseUrl+"/reset", params);
  }

  changePassword(token: string): Observable<any>{
    let params = new HttpParams().set('token', token);
    return this.http.post<any>(this.baseUrl+"/changePassword", params);
  }
}
