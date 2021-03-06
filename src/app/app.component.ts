import { Component, OnInit } from '@angular/core';
import {User} from "./models/user";
import {UserService} from './services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'Musify';
  user: User;
  userRegister: User;
  identity;
  token;
  alertMessage;

  constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router
  ) {
    this.user = new User();
    this.userRegister = new User();
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  logout() {
    localStorage.clear();

    this.identity = this.token = null;

    this.router.navigate(['/']);
  }

  public onSubmit() {
    this.userService.signup(this.user).subscribe(
        res => {
          this.identity = res['user'];

          if (this.identity._id) {
            this.userService.signup(this.user, true).subscribe(
                res => {
                  this.token = res['token'] != null && res['token'].length > 0 ? res['token'] : null;
                  if (! this.token) {
                    this.alertMessage = 'Token not generated'
                  } else {
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    localStorage.setItem('token', this.token);
                    this.alertMessage = null;
                    this.user = new User();
                  }
                },
                error => {
                  this.alertMessage = error.error.message;
                }
            )
          } else {
              this.alertMessage = 'User not logged';
          }
        },
        error => {
          const errMessage = <any>error;

          if (errMessage != null) {
            this.alertMessage = error.error.message;
            console.log(error)
          }
        }
    )
  }

  onSubmitRegister() {
    this.userService.register(this.userRegister).subscribe(
        res => {
          this.userRegister = res['user'] != null ? res['user'] : null;

          if (! this.userRegister) {
            this.alertMessage = 'Error registering user';
          } else {
            this.alertMessage = 'User registered with ' + this.userRegister.email;
            this.userRegister = new User();
          }
        },
        error => {
          const errMessage = <any>error;

          if (errMessage) {
            this.alertMessage = error.error.message;
          }
        }
    )
  }
}
