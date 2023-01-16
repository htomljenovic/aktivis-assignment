import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'flight-details/:id', component: FlightDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
