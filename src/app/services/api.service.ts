import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8080/openmrs/ws/rest/v1/';

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const sessionId = sessionStorage.getItem('JSESSIONID');
    if (sessionId) {
      headers = headers.set('Authorization', `Basic ${sessionId}`);
    } else {
    }
    return headers;
  }    

  setSessionId(sessionId: string): void {
    sessionStorage.setItem('JSESSIONID', sessionId);
    console.log('Session ID set:', sessionId); 
  }

  private createAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:Admin123')
    });
    return headers;
  }

  get(endpoint: string, params?: any, reqOpts?: any): Observable<any> {
    if (!reqOpts) {
      reqOpts = { params: new HttpParams() };
    }

    if (params) {
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    reqOpts.headers = this.createAuthorizationHeader();  
    reqOpts.withCredentials = true;  
    console.log('GET Request Options:', reqOpts); // Log the request options
    return this.http.get(this.url + endpoint, reqOpts);
  }

  post(endpoint: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('POST Headers:', headers); // Log the headers
    return this.http.post(this.url + endpoint, JSON.stringify(body), {
      headers,
      withCredentials: true  
    });
  }

 
  put(endpoint: string, body: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    console.log('PUT Headers:', headers); // Log the headers
    return this.http.put(this.url + endpoint, JSON.stringify(body), {
      headers,
      withCredentials: true  
    });
  }

 
  delete(endpoint: string, reqOpts?: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    reqOpts = { headers, withCredentials: true };  
    console.log('DELETE Request Options:', reqOpts); // Log the request options
    return this.http.delete(this.url + endpoint, reqOpts);
  }

  // PATCH request
  patch(endpoint: string, body: any, reqOpts?: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    console.log('PATCH Headers:', headers); // Log the headers
    return this.http.patch(this.url + endpoint, JSON.stringify(body), {
      headers,
      withCredentials: true  
    });
  }
}
