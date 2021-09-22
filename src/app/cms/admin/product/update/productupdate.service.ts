import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/product";
import {Constants} from "../../../../shared/constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductupdateService {
  private  baseUrl: string = Constants.base_url;
  constructor(private http: HttpClient) { }

  updateProduct(formData: FormData): Observable<any>{
    return this.http.post(this.baseUrl+"/productApi/product/update", formData);
  }



  getProduct(id: number): Observable<any>{
    return this.http.get(this.baseUrl+"/productApi/product/"+id, {
      observe: 'body',
      responseType: 'json'
    });
  }
}
