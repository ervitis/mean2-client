import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Album} from '../models/album';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';
import {AlbumService} from '../services/album.service';

@Component({
    selector: 'album-add',
    templateUrl: '../views/album-add.component.html',
    providers: [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url: string;
    public album: Album;
    public artist: Artist;
    public alertMessage: string;
    public isEdit;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private artistService: ArtistService,
        private albumService: AlbumService
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
        this.isEdit = false;
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.album.artist = params['id'];
        });

        this.artistService.getArtist(this.token, this.album.artist).subscribe(
            res => {
                this.artist = res['artist'] != null ? res['artist'] : null;
            }, err => {
                console.log(err);
            }
        )
    }

    onSubmit() {
        this.albumService.addAlbum(this.token, this.album).subscribe(
            res => {
                this.album = res['albumStored'] != null ? res['albumStored'] : null;
                if (! this.album) {
                    this.alertMessage = 'Error saving album';
                } else {
                    this.alertMessage = 'Album saved';
                }
            }, err => {
                const errorMessage = <any>err;
                if (errorMessage) {
                    const body = JSON.parse(err._body);
                    this.alertMessage = body.message;

                    console.log(err);
                }
            }
        )
    }
}