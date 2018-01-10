import {Component, OnInit} from '@angular/core';
import {ArtistService} from '../services/artist.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';
import {AlbumService} from '../services/album.service';
import {Album} from '../models/album';

@Component({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.component.html',
    providers: [ArtistService, UserService, AlbumService]
})

export class ArtistDetailComponent implements OnInit {
    public titulo: string;
    public token;
    public url;
    public identity;
    public artist: Artist;
    public albums: Array<Album>;

    constructor(
        private artistService: ArtistService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private albumService: AlbumService
    ) {
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.artistService = artistService;
        this.albumService = albumService;
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
                    } else {
                        console.log(this.artist);
                        console.log(id);
                        this.albumService.getAlbums(this.token, id)
                            .subscribe(res => {
                                this.albums = res['album'] != null ? res['album'] : null;
                                console.log(this.albums);
                            }, error => {
                                const errorMessage = <any>error;
                                console.log(error);
                                console.log(errorMessage);
                            })
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