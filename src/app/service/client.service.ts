import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../shared/constants";
import {Product} from "../cms/admin/model/product";

@Injectable()
export class ClientService {
  baseUrl: string = Constants.base_url;
  constructor(private http: HttpClient) {
  }

  gerFilterByType(type: number): Observable<Product[]>{
    let params = new HttpParams().set("type", type);

    return this.http.get<Product[]>(this.baseUrl+"/productUserApi/filterData", {params});

  }

  getFilterData(name: string): Observable<Product[]>{
    let params = new HttpParams().set("name", name);

   return this.http.get<Product[]>(this.baseUrl+"/productUserApi/filterData", {params});
  }
  getFilter(brand: any[], min: number, max: number): Observable<Product[]>{
    let params= new HttpParams()
      .set("brand", brand.join(','))
      .set("min", min)
      .set("max", max);

    return this.http.get<Product[]>(this.baseUrl+"/productUserApi/filterData", {params});
  }
  getAllProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/productApi/listProduct");
  }

  getAllTypes(): Observable<any>{
    return this.http.get(this.baseUrl+"/typeApi/listType");
  }


}
