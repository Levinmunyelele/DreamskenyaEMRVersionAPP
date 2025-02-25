import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private apiService: ApiService) { }

  // Uses the REST API (url)
  getVisits(locationId: string): Observable<any> {
    const params = {
      v: 'custom:(uuid,patient:(uuid,identifiers:(identifier,uuid,identifierType:(name,uuid)),person:(age,display,gender,uuid,attributes:(value,attributeType:(uuid,display)))),visitType:(uuid,name,display),location:(uuid,name,display),startDatetime,stopDatetime)',
      includeInactive: 'false',
      totalCount: 'true',
      location: locationId
    };
    return this.apiService.get('visit', params, false);  // Explicitly using `url`
  }

  // Uses the REST API (url)
  postVisitQueueEntry(visitPayload: any): Observable<any> {
    return this.apiService.post('visit', visitPayload, false);  // Explicitly using `url`
  }

  // Uses the FHIR API (url2)
  getConditions(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('Condition', params, true);  // Explicitly using `url2`
  }

  getAllergies(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('AllergyIntolerance', params, true);  // Explicitly using `url2`
  }

  getImmunizations(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('Immunization', params, true);  // Explicitly using `url2`
  }

  getMedications(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('MedicationRequest', params, true);  // Explicitly using `url2`
  }
}
