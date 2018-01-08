import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';

const appRoutes: Routes = [
    {path: '', component: ArtistListComponent},
    {path: 'user/data', component: UserEditComponent},
    {path: '**', component: ArtistListComponent},
    {path: 'artists/:page', component: ArtistListComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);