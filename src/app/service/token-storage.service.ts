import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(TOKEN_KEY);

    if(user == null)
      return false;
    return true;
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string | null{
    return sessionStorage.getItem(TOKEN_KEY);
  }
}
