import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent {

  private flightId: string = null;

  public flightDetailsForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.activatedRoute.params.subscribe((params) => {
      this.flightId = params['id'];
      if (this.flightId) this.getFlightById(this.flightId);
    });
  }

  ngOnInit() {
    this.flightDetailsForm = this.fb.group({
      type: [null, Validators.required],
      subType: [null, Validators.required],
      name: [null, Validators.required],
      detailedName: [null, Validators.required],
      timeZoneOffset: [null, Validators.required],
      iataCode: [null, Validators.required],

      geoCode: this.fb.group({
        latitude: [null, Validators.required],
        longitude: [null, Validators.required]
      }),

      address: this.fb.group({
        cityName: [null, Validators.required],
        cityCode: [null, Validators.required],
        countryName: [null, Validators.required],
        countryCode: [null, Validators.required],
        regionCode: [null, Validators.required]

      }),
      analytics: this.fb.group({
        travelers: this.fb.group({
          score: [null, Validators.required]

        })
      }),

    })
  }

  /** Get Flight which is being edited
   * @param id flight id
   */
  private getFlightById(id: string) {
    if (!this.getExistingFlightDetails()) {
      this.http.get<any>(`https://test.api.amadeus.com/v1/reference-data/locations/${id}`).subscribe(
        (data) => {
          this.flightDetailsForm.patchValue(data.data);
        }
      )
    }
    else {
      this.flightDetailsForm.patchValue(JSON.parse(this.getExistingFlightDetails()));
    }
  }

  /** Get flight details from local storage if exists */
  private getExistingFlightDetails() {
    return localStorage.getItem(`Flight-${this.flightId}`);
  }

  /** Save flight details to local storage */
  public saveFlightDetails() {

    for (const i in this.flightDetailsForm.controls) {
      if (this.flightDetailsForm.controls.hasOwnProperty(i)) {
        this.flightDetailsForm.controls[i].markAsDirty();
        this.flightDetailsForm.controls[i].updateValueAndValidity();
      }
    }

    // Return if form is empty
    if (!this.flightDetailsForm.valid) {
      return;
    }

    if (this.getExistingFlightDetails()) localStorage.removeItem(`Flight-${this.flightId}`);

    localStorage.setItem(`Flight-${this.flightId}`, JSON.stringify(this.flightDetailsForm.value))
  }
}
