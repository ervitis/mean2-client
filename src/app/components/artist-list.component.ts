import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService} from '../services/user.service';
import {GLOBAL} from '../services/global';
import {Artist} from '../models/artist';
import {ArtistService} from '../services/artist.service';

@Component({
    selector: 'artist-list',
    templateUrl: '../views/artist-list.component.html',
    providers: [UserService, ArtistService]
})

export class ArtistListComponent implements OnInit {
    public titulo: string;
    public artists: Array<Artist>;
    public identity;
    public token;
    public url;
    public nextPage;
    public prevPage;
    public totalItems;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private artistService: ArtistService
    ) {
        this.titulo = 'Artists list';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
        this.url = GLOBAL.url;
        this.artistService = artistService;
    }

    ngOnInit() {
        this.getArtists();
    }

    getArtists() {
        this.route.params.forEach((params: Params) => {
            let page = parseInt(params['page']);

            if (! page) {
                page = 1
            } else {
                this.nextPage = page + 1;
                this.prevPage = page - 1;

                if (this.prevPage == 0) {
                    this.prevPage = 1;
                }
            }

            this.artistService.getArtists(this.token, page).subscribe(
                resp => {
                    this.artists = resp['artists'] != null ? resp['artists'] : null;
                    if (! this.artists) {
                        this.router.navigate(['/'])
                    }
                    this.totalItems = parseInt(resp['totalItems']);
                },
                error => {
                    const errorMessage = <any>error;

                    if (errorMessage) {
                        const body = JSON.parse(error._body);
                        console.log(error);
                    }
                }
            )
        });
    }
}