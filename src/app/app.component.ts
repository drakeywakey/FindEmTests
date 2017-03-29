import { Component } from '@angular/core';
import { Person } from './person';
import { AppService } from './app.service';

@Component({
    moduleId: module.id,
    providers: [AppService],
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent {
    constructor(private appService: AppService) { }
    clicks = 0;
    colors = ['tomato', 'gold', 'palegreen', 'steelblue', 'purple', 'white'];
    coordinates = [35, 215];
    hoveredPerson: Person;
    loaded = false;
    people: Person[];
    search = '';
    searchDelay = 0;
    //this will be false on initial page landing, but once a search is made, switches to true
    //so loading from then on will display the loading message and search splashes
    afterFirstLoad = false;

    getPeople(): void {
        this.resetLoadingDiv();
        this.loaded = false;
        this.people = [];
        this.afterFirstLoad = true;

        //sanitize input a little bit
        if (this.searchDelay < 0) {
            this.searchDelay = 0;
        }

        // and my research tells me LINQ is pretty good about protecting from SQL injections,
        // so I guess this.search string doesn't need to be sanitized
       
        this.appService.getPeopleWithDelay(this.search, this.searchDelay).then((people) => {
            this.loaded = true;
            this.people = people;
        });
    }

    onHover(person: Person): void {
        this.hoveredPerson = person;
    }

    onMouseLeave(): void {
        this.coordinates[0] = 35;
        this.coordinates[1] = 215;
    }

    onMouseMove(event: MouseEvent): void {
        this.coordinates[0] = event.clientX;
        this.coordinates[1] = event.clientY;

        // a bit hacky, but need to make sure the magnifying class doesn't accidentally cover the search bar
        if (event.clientY <= 200) {
            this.onMouseLeave();
        }

        // but if you thought THAT was hacky/dubious...
    }

    onClick(event: MouseEvent): void {
        if (this.afterFirstLoad) {
            this.clicks = (this.clicks + 1) % 6;
            var loadComponent = document.querySelector('.loading-component');
            var playground = document.querySelector('.playground');
            var svg = loadComponent.querySelector('svg');

            if (this.clicks === 0) {
                this.colors.forEach((color) => {
                    // would you believe me if I told you IE10 doesn't support classList on svg elements?
                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList#Browser_compatibility
                    if (svg.classList) {
                        svg.classList.remove(color);
                    }
                })
            }

            if (svg.classList) {
                svg.classList.add(this.colors[this.clicks]);
            }
            let newSvg = svg.cloneNode(true);

            playground.appendChild(newSvg);
        }
    }

    resetLoadingDiv(): void {
        var div = document.querySelector('.playground');
        div.innerHTML = "";
    }
}
