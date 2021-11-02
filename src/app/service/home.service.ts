import {Injectable} from "@angular/core";
import {Constants} from "../shared/constants";
import {Observable} from "rxjs";
import {Product} from "../cms/admin/model/product";
import {HttpClient, HttpParams} from "@angular/common/http";
import {param} from "jquery";
import {Shipping} from "../client/model/shipping";
import {map} from "rxjs/operators";
import {Order} from "../client/model/order";
import {OrderItem} from "../client/model/orderItem";

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

  saveShippingDetails(shipping: Shipping): Observable<Shipping>{
    return this.http.post(this.baseUrl+"/shippingApi/save", shipping);
  }

  getProductsByType(id: any): Observable<Product[]>{
    let params = new HttpParams().set("typeId", id);

    return this.http.get<Product[]>(this.baseUrl+"/productUserApi/productsByType", {params});
  }

  completePayment(paymentId: any, payerId: any):Observable<any> {
    return this.http.post(this.baseUrl + '/paypalApi/complete/payment?paymentId=' + paymentId + '&payerId=' + payerId , {});
  }

  placeOrder(): Observable<any>{
      return this.http.post(this.baseUrl+"/orderApi/placeOrder", {});
  }

  getAllOrders(): Observable<Order>{
    return this.http.get<Order>(this.baseUrl+"/orderApi/order");
  }

  setRate(formData: FormData): Observable<Product>{
    return this.http.post(this.baseUrl+"/orderApi/productRating", formData);
  }

  calculatePostage(): Observable<any>{
    return this.http.get(this.baseUrl+"/shippingApi/calculatePostage");
  }

  authentication(): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl+"/authentication");
  }
}
