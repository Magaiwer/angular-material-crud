import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [
  { path: 'person', component: PersonFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
