import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

declare var $:any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginUserData = {
    email: '',
    password: ''
  };
  responseText: string = "";
  showSpinner: boolean = true;
  @ViewChild('errorModal') errorModal: ElementRef;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {   
    this.showSpinner = false;
  }

  loginUser(){
    this._authService.signinUser(this.loginUserData)
      .subscribe(
        (res) => {
          localStorage.setItem("token", res.token);
          this.showSpinner = true;         
          //this._router.navigate(['/dashboard']);  
          setTimeout(() => {
            this.showSpinner = false; 
            this._router.navigate(['/dashboard']);
        }, 2000);         
        },
        (err: HttpErrorResponse) => {        
          if(err.status == 401){
            this.responseText = err.statusText + " user!";
            $(this.errorModal.nativeElement).modal('show');
          }
        }
      )
  }
}
