import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {

  public searchForm: FormGroup;

  public subject$: BehaviorSubject<any> = new BehaviorSubject(null);

  public errorMessage: string = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: null
    })
  }

  /** Get flights from db */
  public findFlights() {

    setTimeout(() => {
      if (this.searchForm.value.search == '') {
        this.errorMessage = 'Za pretragu zračnih luka, upišite ime grada';
        this.subject$.next(null)
        return;
      }

      this.http.get<any>('https://test.api.amadeus.com/v1/reference-data/locations', { params: { subType: 'CITY', keyword: this.searchForm.value.search } }).subscribe(
        (data) => {
          this.subject$.next(data.data);
          if (data.data.length == 0) {
            this.errorMessage = 'Za upisan pojam nema rezultata';
          }
          else this.errorMessage = null;
        }
      )
    }, 300);

  }

  /** Edit flight that is being selected
   * @param flightId Id of selected flight
   */
  public editFlight(flightId: string) {
    this.router.navigate(['flight-details/' + `${flightId}`])
  }

}
