import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: '../views/home.component.html'
})

export class HomeComponent implements OnInit {
    public titulo: string;

    ngOnInit() {

    }

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.titulo = 'Home';
    }
}