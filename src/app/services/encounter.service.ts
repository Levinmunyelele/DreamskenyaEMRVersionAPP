import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {

  constructor(
    private apiService:ApiService
  ){ }


  submitEncounter(payload: any): Observable<any> {
    return this.apiService.post('encounter', payload);  
  }

  getIdentifier(payload : any): Observable<any> {
    return this.apiService.post('idgen/identifiersource/fb034aac-2353-4940-abe2-7bc94e7c1e71/identifier',payload);
  }

  submitPatient(payload: any): Observable<any> {
    return this.apiService.post('patient', payload);
  }
  checkIfPatientHasActiveVisit(patientUuid: string): Observable<boolean> {
    return this.apiService.get(`visit?patient=${patientUuid}&includeInactive=false`).pipe(
      map((response: { results: any[] }) => response.results.length > 0)
    );
  }
  

  searchPatients(query: string): Observable<any> {  
    return this.apiService.get(`patient?q=${query}&v=full`);
  }  
  
}
