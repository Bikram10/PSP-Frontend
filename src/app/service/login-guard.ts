import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate{

  constructor(private tokenService: TokenStorageService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    if(!this.tokenService.isUserLoggedIn()){
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
    return true;
  }

}
