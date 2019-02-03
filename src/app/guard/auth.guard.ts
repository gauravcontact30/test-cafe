import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService:AuthService, 
              private _router: Router){}

  canActivate():boolean{
    console.log('Auth guard:'+this._authService.loggedIn());
    if(this._authService.loggedIn()){
      return true;
    } else{
      this._router.navigate(['/signin']);
      return false;
    }
  }            
}
