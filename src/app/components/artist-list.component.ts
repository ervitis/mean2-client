import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';

@Component({
    selector: 'artist-list',
    templateUrl: '../views/artist-list.component.html',
    providers: [UserService]
})

export class ArtistListComponent implements OnInit {
    public titulo: string;
    public artists: Array<Artist>;
    public identity;
    public token;
    public url;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.titulo = 'Artists list';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {

    }
}