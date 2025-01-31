import { Injectable } from '@angular/core';
import { ApiService } from './api.service';  
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private apiService: ApiService
  ) { }

  getLocations(params?: any): Observable<any> {
    return this.apiService.get('location', params);  
  }
}
