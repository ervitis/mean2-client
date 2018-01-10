import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {AlbumService} from '../services/album.service';
import {Artist} from '../models/artist';
import {Album} from '../models/album';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.component.html',
    providers: [UserService, AlbumService]
})

export class AlbumEditComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public isEdit;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private albumService: AlbumService
    ) {
        this.titulo = 'Edit an album';
        this.url = GLOBAL.url;
        this.identity = userService.getIdentity();
        this.token = userService.getToken();
        this.isEdit = true;
        this.album = new Album();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            const albumId = params['id'];

            this.albumService.getAlbum(this.token, albumId).subscribe(
                res => {
                    this.album = res['album'] != null ? res['album'] : null;

                    if (! this.album) {
                        this.router.navigate(['/'])
                    } else {
                        this.alertMessage = null;
                    }
                }, err => {
                    const errMessage = <any>err;
                    this.alertMessage = err._body.message;
                    console.log(err);
                }
            )
        });
    }

    fileUploadEvent() {

    }
}