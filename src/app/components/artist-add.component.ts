import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';

@Component({
    selector: 'artist-add',
    templateUrl: '../views/artist-add.component.html',
    providers: [UserService]
})

export class ArtistAddComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public artist: Artist;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.titulo = 'Add artist';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist()
    }

    ngOnInit() {

    }

    onSubmit() {
        
    }
}