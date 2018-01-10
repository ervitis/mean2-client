import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {HomeComponent} from './components/home.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.component';
import {ArtistDetailComponent} from './components/artist-detail.component';
import {AlbumAddComponent} from './components/album-add.component';
import {AlbumEditComponent} from './components/album-edit.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'user/data', component: UserEditComponent},
    {path: 'artists/:page', component: ArtistListComponent},
    {path: 'artist/create', component: ArtistAddComponent},
    {path: 'artist/edit/:id', component: ArtistEditComponent},
    {path: 'artist/delete/:id', component: ArtistEditComponent},
    {path: 'artist/detail/:id', component: ArtistDetailComponent},
    {path: 'album/create/:id', component: AlbumAddComponent},
    {path: 'album/edit/:id', component: AlbumEditComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);