import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private apiService: ApiService) {}

  sendPersonData(personData: any): Observable<any> {
    return this.apiService.post('person', personData).pipe(
      catchError(err => {
        console.error('API error when creating a person', err);
        return throwError(err);
      })
    );
  }

  updatePerson(personId: string, personData: any): Observable<any> {
    return this.apiService.post(`person/${personId}`, personData).pipe(
      catchError(err => {
        console.error('API error when updating a person', err);
        return throwError(err);
      })
    );
  }
  
  deletePerson(personId: string): Observable<any> {
    return this.apiService.delete(`person/${personId}?purge=true`).pipe(
      catchError(err => {
        console.error('API error when deleting a person', err);
        return throwError(err);
      })
    );
  }

  getPersonAttributeTypes(): Observable<any> {
    return this.apiService.get('personattributetype').pipe(
      catchError((err) => {
        console.error('API error while fetching person attributes', err);
        return throwError(err);
      })
    );
  }
  
}
