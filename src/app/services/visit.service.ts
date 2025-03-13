import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  private visitUuid: string | null = null;

  constructor(private apiService: ApiService) { }

  getVisits(locationId: string): Observable<any> {
    const params = {
      v: 'custom:(uuid,patient:(uuid,identifiers:(identifier,uuid,identifierType:(name,uuid)),person:(age,display,gender,uuid,attributes:(value,attributeType:(uuid,display)))),visitType:(uuid,name,display),location:(uuid,name,display),startDatetime,stopDatetime)',
      includeInactive: 'false',
      totalCount: 'true',
      location: locationId
    };
    return this.apiService.get('visit', params, false);  
  }

  postVisitQueueEntry(visitPayload: any): Observable<any> {
    return this.apiService.post('visit', visitPayload, false).pipe(
      tap(response => {
        if (response && response.uuid) {
          this.setVisitUuid(response.uuid);
          console.log('Stored Visit UUID:', response.uuid); // Debugging
        }
      })
    );
  }

  checkoutVisit(locationUuid: string, visitTypeUuid: string): Observable<any> {
    const visitUuid = this.getVisitUuid();

    if (!visitUuid) {
      console.error('No visit UUID found!');
      return throwError(() => new Error('No visit UUID found!'));
    }

    const checkoutPayload = {
      location: locationUuid,
      startDatetime: new Date().toISOString().split('.')[0] + ".000Z",
      stopDatetime: new Date().toISOString().split('.')[0] + ".000Z",
      visitType: visitTypeUuid
    };

    return this.apiService.post(`visit/${visitUuid}`, checkoutPayload, false);
  }

  // Store the visit UUID in memory and localStorage
  private setVisitUuid(uuid: string): void {
    this.visitUuid = uuid;
    localStorage.setItem('visitUuid', uuid);
  }

  // Retrieve the visit UUID
  getVisitUuid(): string | null {
    return this.visitUuid || localStorage.getItem('visitUuid');
  }  

  getConditions(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('Condition', params, true);  
  }

  getAllergies(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('AllergyIntolerance', params, true);  
  }

  getImmunizations(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('Immunization', params, true);  
  }

  getMedications(patientUuid: string): Observable<any> {
    const params = {
      patient: patientUuid,
      _summary: 'data'
    };
    return this.apiService.get('MedicationRequest', params, true); 
  }
}
