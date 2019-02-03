import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registerURL = "http://localhost:3000/api/register";
  private _signinURL = "http://localhost:3000/api/signin";
  private _registeredUserURL = "http://localhost:3000/api/dashboard";

  constructor(private httpclient: HttpClient, private _router: Router){}

  registerUser(user){
    return this.httpclient.post<any>(this._registerURL, user);
  }

  signinUser(user){
    return this.httpclient.post<any>(this._signinURL, user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRegisteredUser(){
    return this.httpclient.get<any>(this._registeredUserURL);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/signin']);
  }
}
