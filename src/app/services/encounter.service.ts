import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class EncounterService {
  private _storage: Storage | null = null;

  constructor(
    private apiService: ApiService,
    private storage: Storage
  ) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  getEncounters(patientUuid: string, encounterType: string): Observable<any[]> {
    if (!patientUuid || !encounterType) {
      console.warn("Missing patient UUID or encounter type");
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }

    return this.apiService.get(`encounter?patient=${patientUuid}&encounterType=${encounterType}&limit=100&v=full`).pipe(
      map((response: { results: any[] }) => response.results || [])
    );
  } 
  
  submitEncounter(payload: any): Observable<any> {
    return this.apiService.post('encounter', payload);  
  }
  submitEnrollment(payload: any): Observable<any> {
    return this.apiService.post('programenrollment', payload);
  }

  getIdentifier(payload: any): Observable<any> {
    return this.apiService.post('idgen/identifiersource/fb034aac-2353-4940-abe2-7bc94e7c1e71/identifier', payload);
  }

  submitPatient(payload: any): Observable<any> {
    return this.apiService.post('patient', payload);
  }

  getPatientProgramEnrollments(patientUuid: string): Observable<any> {
    return this.apiService.get(`programenrollment?patient=${patientUuid}&v=full`);
  }
  getPatientsVisits(patientUuids: string[]): Observable<any[]> {
    if (patientUuids.length === 0) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  
    const uuidQuery = patientUuids.map((uuid) => `patient=${uuid}`).join("&");
  
    return this.apiService.get(`visit?${uuidQuery}&v=full`).pipe(
      map((response: { results: any[] }) => response.results || [])
    );
  }
  

  searchPatients(query: string): Observable<any> {  
    return this.apiService.get(`patient?q=${query}&v=full`);
  }

  async saveScreenedPatient(id: string, name: string, isEligible: boolean) {
    const patientData = {
      name: name,
      id: id,
      isEligible: isEligible
    };
    await this._storage?.set(id, JSON.stringify(patientData));
  }
  

  async isPatientScreened(patientid: string): Promise<boolean> {
    return (await this._storage?.get(patientid)) || false;
  }

  async getAllScreenedPatients(): Promise<{ id: string; name: string; isEligible: boolean }[]> {
    const keys = await this._storage?.keys() || [];
    const patients: { id: string; name: string; isEligible: boolean }[] = [];
  
    for (const key of keys) {
      const patientData = await this._storage?.get(key);
      if (patientData) {
        const parsedData = JSON.parse(patientData);
        patients.push({
          id: parsedData.id, 
          name: parsedData.name, 
          isEligible: parsedData.isEligible 
        });
      }
    }
  
    return patients;
  }
  
}
