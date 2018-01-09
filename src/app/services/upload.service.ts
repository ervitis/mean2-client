import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from './global';

const READY_STATE = 4;
const HTTP_OK = 200;

@Injectable()
export class UploadService {
    public url: string;

    constructor() {
        this.url = GLOBAL.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {

        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();

            for(let i=0; i<files.length; i++) {
                formData.append(name, files[i], files[i].name)
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState == READY_STATE && xhr.status == HTTP_OK) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response);
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}