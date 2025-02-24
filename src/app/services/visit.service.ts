import { Injectable } from '@angular/core';
import { ApiService } from './api.service';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor(private apiService: ApiService) { }

  getVisits(locationId: string): Observable<any> {
    const params = {
      v: 'custom:(uuid,patient:(uuid,identifiers:(identifier,uuid,identifierType:(name,uuid)),person:(age,display,gender,uuid,attributes:(value,attributeType:(uuid,display)))),visitType:(uuid,name,display),location:(uuid,name,display),startDatetime,stopDatetime)',
      includeInactive: 'false',
      totalCount: 'true',
      location: locationId
    };
    return this.apiService.get('visit', params);  
  }

  postVisitQueueEntry(visitPayload: any): Observable<any> {
    return this.apiService.post('visit', visitPayload);
  }
}
