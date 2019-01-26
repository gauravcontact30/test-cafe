import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';

declare var $:any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerUserData = {
    email: '',
    password: ''
  };
  @ViewChild('signupSuccess') signupModal: ElementRef;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  registerUser(){   
    this._authService.registerUser(this.registerUserData)
      .subscribe(
          res => {
            localStorage.setItem("token", res.token);
          },          
            (err) => {
              console.log(err);
            }
        );
        $(this.signupModal.nativeElement).modal('show');        
  }
}
