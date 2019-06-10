import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable, of } from 'rxjs';

import { PersonService } from './../../service/person.service';
import { Address } from './../../model/address';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit {

  displayedColumns: string[] = ['description', 'place', 'number', 'city', 'actions'];
  dataSource = new AddressDataSource(this.personService);

  constructor(private personService: PersonService) {}

  ngOnInit() {

  }

  deleteAddress(address: Address) {
    this.personService.removeAddress(address);
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
