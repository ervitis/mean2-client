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

    constructor(private userService: UserService) {
        this.titulo = 'Update user data';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
    }

    ngOnInit() {

    }


}