import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public formUuid = '719d095f-bc24-4609-8209-8ffb9fece40e';
  private patientUuid = '546ce21a-1274-425e-abb0-45a1bd83d757'; 
  private locationUuid = '2d04e048-1861-4b9f-a765-8aaeb7431b4f'; 

  constructor(private apiService: ApiService) {}

  getForm(): Observable<any> {
    return this.apiService.get(`form/${this.formUuid}`);
  }

  submitForm(formData: any): Observable<any> {
    const endpoint = `form/${this.formUuid}`;
    console.log('API Endpoint:', endpoint);
    return this.apiService.post(endpoint, formData);
  }
   getLocations(): Observable<any> {
    return this.apiService.get('locations');
  }

  getLocationById(locationId: string): Observable<any> {
    return this.apiService.get(`locations/${locationId}`);
  }

  getProviders(): Observable<any> {
    return this.apiService.get('providers');
  }

  getProviderById(providerId: string): Observable<any> {
    return this.apiService.get(`providers/${providerId}`);
  }
}
