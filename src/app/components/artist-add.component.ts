import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';
import {ArtistService} from '../services/artist.service';

@Component({
    selector: 'artist-add',
    templateUrl: '../views/artist-add.component.html',
    providers: [UserService, ArtistService]
})

export class ArtistAddComponent implements OnInit {
    public titulo: string;
    public identity;
    public token;
    public url;
    public artist: Artist;
    public alertMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private artistService: ArtistService
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
        this.artistService
            .addArtist(this.token, this.artist)
            .subscribe(res => {
                this.artist = res['artistStored'] != null ? res['artistStored'] : null;
                if (! this.artist) {
                    this.alertMessage = 'Error saving artist data';
                } else {
                    this.alertMessage = 'Artist saved';
                    //this.router.navigate(['/artista/edit'], this.artist._id);
                }
            }, error => {
                const errorMessage = <any>error;

                if (errorMessage) {
                    JSON.parse(error._body);
                }
            });
    }
}