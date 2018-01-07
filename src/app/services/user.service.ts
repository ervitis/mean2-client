import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {GLOBAL} from './global';

@Injectable()
export class UserService {
    public url: string;
    private identity;
    private token;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    protected static getHeaders() {
        return new HttpHeaders({'Content-Type': 'application/json'});
    }

    signup(userLogin, gethash = null) {
        userLogin.gethash = gethash != null ? gethash : null;

        const params = JSON.stringify(userLogin);
        const headers = UserService.getHeaders();

        return this.http
            .post(this.url + '/user/login', params, {headers})
            .map(res => res);
    }

    getIdentity() {
        this.identity = JSON.parse(localStorage.getItem('identity'));

        return this.identity;
    }

    getToken() {
        this.token = localStorage.getItem('token');

        return this.token;
    }

    register(userRegister) {
        const params = JSON.stringify(userRegister);
        const headers = UserService.getHeaders();

        return this.http
            .post(this.url + '/user/save', params, {headers})
            .map(res => res);
    }

    updateUser(user) {
        const params = JSON.stringify(user);
        const headers = UserService.getHeaders().append('Authorization', this.getToken());

        return this.http
            .put(this.url + '/user/update/' + user._id, params, {headers})
            .map(res => res);
    }
}