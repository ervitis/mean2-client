import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global';
import {Artist} from '../models/artist';

@Injectable()
export class ArtistService {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addArtist(token, artist: Artist) {
        const params = JSON.stringify(artist);
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this.http
            .post(this.url + 'artist/save', params, {headers: headers})
            .map(res => res);
    }
}