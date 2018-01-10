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
    private albumId;

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
            this.albumId = params['id'];

            this.albumService.getAlbum(this.token, this.albumId).subscribe(
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

    onSubmit() {
        this.albumService.editAlbum(this.token, this.albumId, this.album).subscribe(
            res => {
                this.album = res['albumUpdate'] != null ? res['albumUpdate'] : null;
                if (! this.album) {
                    this.alertMessage = 'Error updating'
                } else {
                    this.alertMessage = null;
                    this.router.navigate(['/album'], this.albumId);
                }
            }, err => {
                this.alertMessage = err._body.message;
                console.log(err);
            }
        )
    }

    fileUploadEvent() {

    }
}