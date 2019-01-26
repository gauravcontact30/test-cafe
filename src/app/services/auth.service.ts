import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = "http://localhost:3000/api/register";
  private _signinURL = "http://localhost:3000/api/signin";

  constructor(private httpclient: HttpClient){}

  registerUser(user){
    return this.httpclient.post<any>(this._registerURL, user);
  }

  signinUser(user){
    return this.httpclient.post<any>(this._signinURL, user);
  }
}
