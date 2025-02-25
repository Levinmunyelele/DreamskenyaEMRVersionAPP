import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgrammesService {

  constructor(private api: ApiService) { }
  login(username: string, password: string): Observable<any> {
    // Encode the username and password to base64 for Basic Authentication
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    console.log('Authorization Header:', authHeader);  // Log header to verify its content
  
    const headers = new HttpHeaders().set('Authorization', authHeader);
  
    // Make the API call to the session endpoint
    return this.api.get('session', {}, false, { headers, withCredentials: true }).pipe(
      tap((response) => {
        console.log('Login response:', response);  // Log the entire response for debugging
  
        if (response.authenticated) {
          // Store the session ID in sessionStorage for persistence across page reloads
          sessionStorage.setItem('JSESSIONID', response.sessionId);
          // Save the entire response in localStorage
          localStorage.setItem('loginResponse', JSON.stringify(response));
          console.log('Authentication successful.');
        } else {
          console.log('Authentication failed. Response:', response);
        }
      })
    );
  }
  
  
  // Check if the user is logged in by checking if JSESSIONID exists in sessionStorage
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('JSESSIONID');
  }

  // Logout the user by removing the JSESSIONID from sessionStorage
  logout(): void {
    sessionStorage.removeItem('JSESSIONID');
  }

  // Fetch eligible programs for a patient (example of another API call)
  getEligiblePrograms(patientUuid: string): Observable<any> {
    return this.api.get('kenyaemr/eligiblePrograms', { patientUuid });
  }
}
