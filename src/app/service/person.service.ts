import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { State } from '../model/state';
import { City } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<State[]>('assets/data/states.json');
  }

  getCities(idState: number) {
    return this.http.get<City[]>('assets/data/cities.json')
    .pipe(
      map((cities: City[]) => cities.filter(c => c.state === idState))
    );
  }
}
