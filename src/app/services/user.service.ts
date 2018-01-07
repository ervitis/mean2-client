import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import {GLOBAL} from './global';

@Injectable()
export class UserService {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    signup(userLogin, gethash = null) {
        userLogin.gethash = gethash != null ? gethash : null;

        const params = JSON.stringify(userLogin);

        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http
            .post(this.url + '/user/login', params, {headers})
            .map(res => res);
    }
}