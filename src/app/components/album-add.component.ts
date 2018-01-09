import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Album} from '../models/album';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.component.html',
    providers: [UserService, ArtistService]
})

export class AlbumAddComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url: string;
    public album: Album;
    public artist: Artist;
    public alertMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private artistService: ArtistService
    ) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.artistService = artistService;
        this.token = userService.getToken();
        this.identity = userService.getIdentity();
        this.url = GLOBAL.url;
        this.album = new Album();
        this.titulo = 'Add album to artist';
    }

    ngOnInit() {

    }
}