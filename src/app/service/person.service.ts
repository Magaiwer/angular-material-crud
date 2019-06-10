import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { State } from '../model/state';
import { City } from '../model/city';
import { Address } from './../model/address';
import { nextTick } from 'q';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private subject = new Subject<Address[]>();
  private addresses = Array<Address>();

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

  addAddress(address: Address) {
    this.addresses.push(address);
    this.subject.next(this.addresses);
  }

  removeAddress(address) {
    this.addresses = this.addresses.filter(element => element !== address);
    this.subject.next(this.addresses);
  }

  loadAddresses(): Observable<Address[]> {
    return this.subject;
  }

  OnDestroy() {
    this.subject.unsubscribe();
  }
}
