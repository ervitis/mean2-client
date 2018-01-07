import { Component, OnInit } from '@angular/core';
import {User} from "./models/user";
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'Musify';
  user: User;
  identity;
  token;
  errMessage;

  constructor(private userService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  public onSubmit() {
    console.log(this.user);

    this.userService.signup(this.user).subscribe(
        res => {
          this.identity = res['user'];

          if (this.identity._id) {
            this.userService.signup(this.user, true).subscribe(
                res => {
                  this.token = res['token'] != null && res['token'].length > 0 ? res['token'] : null;
                  if (! this.token) {
                    this.errMessage = 'Token not generated'
                  } else {
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    localStorage.setItem('token', this.token);
                    this.errMessage = null;
                  }
                },
                error => {
                  this.errMessage = error.error.message;
                }
            )
          } else {
              this.errMessage = 'User not logged';
          }
        },
        error => {
          const errMessage = <any>error;

          if (errMessage != null) {
            this.errMessage = error.error.message;
            console.log(error)
          }
        }
    )
  }
}
