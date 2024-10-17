import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export class AuthInterceptorService implements HttpInterceptor{

  authService : AuthService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    return this.authService.userSubject.pipe(take(1), exhaustMap(user =>
    {
      if(user){
          const modifiedReq = req.clone(
          {
            params: new HttpParams().set('auth', user.UserToken )
          }
        );
      return next.handle(modifiedReq);
      
      }
      else{
            return next.handle(req);
          }
    }))
  }
}
