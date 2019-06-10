import { City } from './city';
import { State } from './state';

export interface Address {
  description: string;
  zipCode: string;
  place: string;
  neigborhood: string;
  number: number;
  complement: string;
  state: State;
  city: City;
}
