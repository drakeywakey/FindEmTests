import { Injectable } from '@angular/core';
import { Person } from './person';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { people } from './mock-data';

@Injectable()
export class AppService {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getPeople(search: string): Promise<Person[]> {
        return Promise.resolve(people.filter((person) => person.FirstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 || person.LastName.toLowerCase().indexOf(search.toLowerCase()) !== -1));
    }

    getPeopleWithDelay(search: string, delay: number): Promise<Person[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getPeople(search)), delay * 1000);
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}