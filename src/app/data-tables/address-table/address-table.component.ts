import { Component, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable, of } from 'rxjs';

import { PersonService } from './../../service/person.service';
import { Address } from './../../model/address';
import { format } from 'path';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit {

  displayedColumns: string[] = ['description', 'place', 'number', 'city', 'actions'];
  dataSource = new AddressDataSource(this.personService);

  @Input() form: FormGroup;

  constructor(private personService: PersonService) {}

  ngOnInit() {

  }

  onDeleteAddress(address: Address) {
    this.personService.removeAddress(address);
  }

  onEditAddress(address: Address) {
    this.personService.removeAddress(address);
    this.form.get('address').patchValue(address);
  }
}

export class AddressDataSource extends DataSource<any> {

  constructor(private personService: PersonService) {
    super();
  }

  connect(): Observable<Address[] | readonly Address[]> {
    return  this.personService.loadAddresses();
  }

  disconnect() {
    this.personService.OnDestroy();
  }

}
