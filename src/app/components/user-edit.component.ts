import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.component.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit {
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;

    constructor(private userService: UserService) {
        this.titulo = 'Update user data';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
        this.user = new User(
            this.identity._id,
            this.identity.name,
            this.identity.surname,
            this.identity.email,
            this.identity.password,
            this.identity.rol,
            this.identity.image
        )
    }

    ngOnInit() {

    }

    onSubmit() {
        this.userService.updateUser(this.user).subscribe(
            res => {
                this.user = res['user'] != null ? res['user'] : null;

                if (! this.user) {
                    this.alertMessage = 'User not updated'
                } else {
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.alertMessage = 'User data updated'
                }
            },
            error => {
                const errorMessage = <any>error;

                this.alertMessage = errorMessage.error.message;
            }
        )
    }

}