import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registeredUsers: [];
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getRegisteredUser()
      .subscribe(
        res => {
         this.registeredUsers = res
        },
        err => console.log("ERROR: "+err)
      )
  }
}
