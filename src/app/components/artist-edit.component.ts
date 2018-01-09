import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GLOBAL} from '../services/global';
import {UploadService} from '../services/upload.service';

@Component({
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.component.html',
    providers: [UserService, ArtistService, UploadService]
})

export class ArtistEditComponent implements OnInit {
    public isEdit;
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public filesToUpload: Array<File>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private artistService: ArtistService,
        private uploadService: UploadService
    ) {
        this.titulo = 'Edit artist';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist();
        this.isEdit = true;
        this.uploadService = uploadService;
    }

    ngOnInit() {
        this.getArtist();
    }

    getArtist() {
        this.route.params.forEach((params: Params) => {
            const id = params['id'];

            this.artistService.getArtist(this.token, id).subscribe(
                res => {
                    this.artist = res['artist'] != null ? res['artist'] : null;
                    if (! this.artist) {
                        this.router.navigate(['/']);
                    }
                }, err => {
                    const errorMesssage = <any>err;
                    if (errorMesssage) {
                        const body = JSON.parse(err._body);

                        console.log(err);
                    }
                }
            )
        })
    }

    onSubmit() {
        this.route.params.forEach((params: Params) => {
            const id = params['id'];

            this.artistService.updateArtist(this.token, id, this.artist).subscribe(
                res => {
                    this.artist = res['artistUpdate'] != null ? res['artistUpdate'] : null;
                    if (! this.artist) {
                        this.alertMessage = 'Error updating'
                    } else {
                        this.alertMessage = this.artist.name + ' updated';
                        if (this.filesToUpload) {
                            this.uploadService.makeFileRequest(
                                this.url + 'artist/image/' + id,
                                [],
                                this.filesToUpload,
                                this.token,
                                'image'
                            ).then(result => {
                                this.router.navigate(['/artists', 1])
                            }, error => {
                                console.log(error);
                            });
                        } else {
                            this.router.navigate(['/artists', 1])
                        }

                    }
                }, err => {
                    const errorMesssage = <any>err;
                    if (errorMesssage) {
                        const body = JSON.parse(err._body);

                        console.log(err);
                    }
                });
        });
    }

    fileUploadEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    deleteArtist(id) {

    }
}