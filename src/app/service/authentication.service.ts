import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Constants} from "../shared/constants";
import {Observable} from "rxjs";
import {PasswordInfo} from "../cms/admin/model/passwordInfo";

@Injectable()
export class AuthenticationService {

  baseUrl: string = Constants.base_url;
  public authenticated: boolean = false;
  authenticatedEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  attemptAuth(email: string, password: string): Observable<any> {
    const credentials = {email: email, password: password};
    return this.http.post(this.baseUrl + "/token/generated-token", credentials);
  }

  changeAuthentication(){
    this.authenticated = !this.authenticated;
    this.authenticatedEmitter.emit(this.authenticated);
  }

  saveUser(formData: FormData): Observable<any>{
    return this.http.post(this.baseUrl+"/signup", formData);
  }

  changePassword(passwordInfo: PasswordInfo): Observable<PasswordInfo>{
    return this.http.post(this.baseUrl+"/change-password", passwordInfo);
  }

}
