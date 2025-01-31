import { Injectable } from '@angular/core';
import { ApiService } from './api.service';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private apiService: ApiService) { }

  getVisits(params?: any): Observable<any> {
    return this.apiService.get('visit', params);  
  }
}
