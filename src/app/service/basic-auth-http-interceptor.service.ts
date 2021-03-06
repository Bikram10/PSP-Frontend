import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {TokenStorageService} from "./token-storage.service";


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class BasicAuthHttpInterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this .token.getToken())});
    }
    return next.handle(authReq).pipe(
      tap(err => {
        if (err instanceof HttpErrorResponse) {

          if (err.status === 401) {
            this.router.navigate(['user']);
          }
        }
      })
    );
  }

}
