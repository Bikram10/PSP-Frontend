import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../shared/constants";
import {Product} from "../cms/admin/model/product";
import {CartItem} from "../client/model/cartItem";
import {map} from "rxjs/operators";
import {Cart} from "../client/model/cart";
import {ToastrService} from "ngx-toastr";
import {AuthLogin} from "../cms/admin/model/auth-login";
import {LoginInfo} from "../cms/admin/model/loginInfo";

@Injectable()
export class ClientService {
  baseUrl: string = Constants.base_url;
  constructor(private toast: ToastrService, private http: HttpClient) {
  }


  gerFilterByType(type: number): Observable<Product[]>{
    let params = new HttpParams().set("type", type);

    return this.http.get<Product[]>(this.baseUrl+"/productUserApi/filterData", {params});

  }

  getAllFilters(brand: any[]): Observable<Product[]>{
    let params = new HttpParams().set("brand", brand.join(','))

    return this.http.get<Product[]>(this.baseUrl+"/productUserApi/filterData", {params});
  }

  getFilterData(name: string, type: string): Observable<Product[]>{
    if(type == 'Categories'){
      type = '';
    }
    let params = new HttpParams().set("name", name)
      .set("category", type);

   return this.http.get<Product[]>(this.baseUrl+"/productUserApi/filterData", {params});
  }

  getFilteByBrand(brand: any[]): Observable<Product[]>{
    let params = new HttpParams().set("brand", brand.join(','));

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

  getAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/homeApi/getAll");
  }

  getAllTypes(): Observable<any>{
    return this.http.get(this.baseUrl+"/typeApi/listType");
  }

  saveCart(cartItem: CartItem): Observable<CartItem>{
   return this.http.post(this.baseUrl+"/cartApi/addData", cartItem);
  }

  getCartTotal(): Observable<number> {
    return this.http.get<number>(this.baseUrl+"/cartApi/total");
  }

  getCarts(): Observable<Cart>{
    return this.http.get<Cart>(this.baseUrl+"/cartApi/listCart").pipe(
      map((result: any) => {
        let cart: Cart = {};
        let cartItems: CartItem[] = [];

        for(let item of result?.cartItems){
          let itemExist = false;

          for(let i in  cartItems){
            if(cartItems[i].product?.product_id == item.product.product_id){
              itemExist = true;
              break;
            }
          }
          if(!itemExist){
            cartItems.push(item);
          }
          else{
            console.log(itemExist);
          }
          cart.cartItems = cartItems;
        }
        return cart;
      })
    );
  }

  makePayment(sum: number):Observable<any>{
    return this.http.post(this.baseUrl+'/paypalApi/make/payment?sum='+sum, {});
  }

  updateQuantity(cartItem: any):Observable<any>{
    return this.http.post(this.baseUrl+"/cartApi/update", cartItem);
  }

  deleteItem(id: any) {
    return this.http.post(this.baseUrl + "/cartApi/delete/" + id, {
      observe: 'body',
      responseType: 'json'
    });
  }

  getUserInfo(): Observable<LoginInfo>{
    return this.http.get<LoginInfo>(this.baseUrl+"/getInfo");
  }

  searchByPrice(min: any, max: any): Observable<Product[]>{
    let params = new HttpParams().set('min', min)
      .set('max', max);
    return this.http.get<Product[]>(this.baseUrl+"/productUserApi/filterData", {params});
  }

}
