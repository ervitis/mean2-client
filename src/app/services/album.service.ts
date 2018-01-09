import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GLOBAL} from './global';
import {Album} from '../models/album';
import {Headers} from '@angular/http';

@Injectable()
export class AlbumService {
    public url: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addAlbum(token, album: Album) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        const params = JSON.stringify(album);

        return this.http.post(this.url + 'album/save', params,{headers})
            .map(res => res);
    }
}