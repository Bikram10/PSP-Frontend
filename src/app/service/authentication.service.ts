import {EventEmitter, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Constants} from "../shared/constants";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {

  baseUrl: string = Constants.base_url;
  public authenticated: boolean = false;
  authenticatedEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    return this.http.post(this.baseUrl + "/token/generated-token", credentials);
  }

  changeAuthentication(){
    this.authenticated = !this.authenticated;
    this.authenticatedEmitter.emit(this.authenticated);
  }

  saveUser(formData: FormData){
    return this.http.post(this.baseUrl+"/signup", formData);
  }

}
