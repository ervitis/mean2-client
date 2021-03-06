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

    getArtists(token, page) {
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this.http
            .get(this.url + 'artists/' + page, {headers})
            .map(res => res);
    }

    getArtist(token, id: string) {
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this.http
            .get(this.url + 'artist/' + id, {headers})
            .map(res => res)
    }

    updateArtist(token, id: string, artist: Artist) {
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': token
        });
        const params = JSON.stringify(artist);

        return this.http
            .put(this.url + 'artist/' + id, params,{headers})
            .map(res => res)
    }

    deleteArtist(token, id: string) {
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': token
        });

        return this.http
            .delete(this.url + 'artist/' + id, {headers})
            .map(res => res);
    }
}