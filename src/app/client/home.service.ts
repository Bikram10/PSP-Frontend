import {Injectable} from "@angular/core";
import {Constants} from "../shared/constants";
import {Observable} from "rxjs";
import {Product} from "../cms/admin/model/product";
import {HttpClient, HttpParams} from "@angular/common/http";
import {param} from "jquery";

@Injectable()

export class HomeService {
  baseUrl: string = Constants.base_url;

  constructor(private http: HttpClient) {
  }

  getNewArrivals(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/homeApi/latest");
  }

  getViewItem(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/homeApi/viewItem");
  }

  getProductInfo(id: any): Observable<Product>{
    return this.http.get<Product>(this.baseUrl+"/homeApi/product-info/"+id);
  }

  getRecommendedItems(type: any): Observable<Product[]> {
    let params = new HttpParams().set("type", type);
    return this.http.get<Product[]>(this.baseUrl + "/homeApi/recommendedItems", {params});
  }



}
