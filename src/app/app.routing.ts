import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {HomeComponent} from './components/home.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'user/data', component: UserEditComponent},
    {path: 'artists/:page', component: ArtistListComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);