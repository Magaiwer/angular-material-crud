import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {PersonService} from '../service/person.service';
import {State} from '../model/state';
import {City} from '../model/city';
import {Address} from '../model/address';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  displayedColumns: string[] = ['description', 'place', 'number', 'city'];

  states = Array<State>();
  cities: Observable<City[]>;
  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private changeDetectorRefs: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.createForm();
    this.loadStates();
    this.onComboStateChange();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [null],
      lastName: [null],
      phone: [null],
      email: [null],

      address : this.formBuilder.group({
        description: [null],
        zipCode: [null],
        place: [null],
        neighborhood: [null],
        number: [null],
        complement: [null],
        state: [null],
        city: [null]
      })
    });
  }

  loadStates() {
    this.personService.getStates().subscribe(states => this.states = states);
  }

  onComboStateChange() {
    this.form.get('address.state').valueChanges
    .pipe(
      map((state) => this.personService.getCities(state))
    )
    .subscribe(cities => this.cities = cities);
  }

  onAddAddress() {
    const valueSubmit = Object.assign({}, this.form.value);
    this.personService.addAddress(Object.assign({}, valueSubmit.address));
    this.reset();
  }

  deleteAddress(address: Address) {
    this.personService.removeAddress(address);
  }

  reset() {
    this.form.reset();
  }

}
