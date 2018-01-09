import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../services/artist.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.component.html',
    providers: [ArtistService, UserService]
})

export class ArtistDetailComponent implements OnInit {
    public titulo: string;
    public token;
    public url;
    public identity;
    public artist: Artist;

    constructor(
        private artistService: ArtistService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.artistService = artistService;
        this.url = GLOBAL.url;
        this.token = userService.getToken();
        this.identity = userService.getIdentity();
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
                        this.router.navigate(['/'])
                    }
                },
                error => {
                    const errorMessage = <any>error;

                    if (errorMessage != null) {
                        const body = JSON.parse(error._body);
                        console.log(error);
                    }
                }
            )
        })
    }
}