import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {GLOBAL} from '../services/global';

const READY_STATE = 4;
const HTTP_OK = 200;

@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.component.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit {
    public titulo: string;
    public user: User;
    public identity;
    public token;
    public alertMessage;
    public filesToUpload: Array<File>;

    constructor(private userService: UserService) {
        this.titulo = 'Update user data';
        this.identity = this.userService.getIdentity();
        this.token = this.userService.getToken();
        this.user = new User(
            this.identity._id,
            this.identity.name,
            this.identity.surname,
            this.identity.email,
            this.identity.password,
            this.identity.rol,
            this.identity.image
        )
    }

    ngOnInit() {

    }

    onSubmit() {
        this.userService.updateUser(this.user).subscribe(
            res => {
                this.user = res['user'] != null ? res['user'] : null;

                if (! this.user) {
                    this.alertMessage = 'User not updated';
                } else {
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    this.alertMessage = 'User data updated';

                    if (this.filesToUpload) {
                        this.makeFileRequest(
                            GLOBAL.url + 'user/photo/' + this.user._id,
                            [],
                            this.filesToUpload
                        ).then((result: any) => {
                            console.log(result);
                            this.user.image = result.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                            console.log(this.user);
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                }
            },
            error => {
                const errorMessage = <any>error;

                this.alertMessage = errorMessage.error.message;
            }
        )
    }

    fileUploadEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        const token = this.token;

        return new Promise((resolve, reject) => {
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();

            for(let i=0; i<files.length; i++) {
                formData.append('image', files[i], files[i].name)
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState == READY_STATE && xhr.status == HTTP_OK) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response);
                }
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token)
            xhr.send(formData);
        });
    }

}