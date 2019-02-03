import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log(`${req.url} has been intercepted!`);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this._authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
