import { map } from 'rxjs/operators';
import { PersonService } from './../service/person.service';
import { Component, OnInit, createPlatformFactory, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { State } from '../model/state';
import { City } from '../model/city';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  states: State [];
  cities: Observable<City[]>;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService
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

      address : this.formBuilder.group({
        description: [null],
        zipCode: [null],
        place: [null],
        neigborhood: [null],
        number: [null],
        complement: [null],
        state: [null],
        city: [null]
      })
    });
  }

  loadStates() {
    this.personService.getStates().subscribe(data => this.states = data);
  }

/*   onComboStateChange() {
    this.form.get('address.state').valueChanges
    .subscribe((state: number) => this.cities = this.personService.getCities(state));
  } */

  onComboStateChange() {
    this.form.get('address.state').valueChanges
    .pipe(
      map((state) => this.personService.getCities(state))
    )
    .subscribe(cities => this.cities = cities);
  }

  /* this.formulario.get('endereco.estado').valueChanges
  .pipe(
    tap(estado => console.log('Novo estado: ', estado)),
    map(estado => this.estados.filter(e => e.sigla === estado)),
    map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
    switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
    tap(console.log)
  )
  .subscribe(cidades => this.cidades = cidades); */
}
