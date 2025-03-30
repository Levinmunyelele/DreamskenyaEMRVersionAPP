import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private url = '  https://dreams-kenyaemr.healthstrat.co.ke/openmrs/ws/rest/v1/';
  private url = 'http://localhost:8080/openmrs/ws/rest/v1/';
  private url2 = 'http://localhost:8080/openmrs/ws/fhir2/R4/';

  constructor(private http: HttpClient) {}

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:Admin123'),
      'Content-Type': 'application/json'
    });
  }

  private getBaseUrl(useFhir: boolean): string {
    return useFhir ? this.url2 : this.url;
  }

  get(endpoint: string, params?: any, useFhir: boolean = false, httpOptions: any = {}): Observable<any> {
    let reqOpts: any = { 
      params: new HttpParams(),
      headers: this.createAuthorizationHeader(),
      withCredentials: true,
      ...httpOptions 
    };
  
    if (params) {
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
  
    console.log('GET Request to:', this.getBaseUrl(useFhir) + endpoint, reqOpts);
    return this.http.get(this.getBaseUrl(useFhir) + endpoint, reqOpts);
  }
  

  post(endpoint: string, body: any, useFhir: boolean = false): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(this.getBaseUrl(useFhir) + endpoint, JSON.stringify(body), { headers, withCredentials: true });
  }

  put(endpoint: string, body: any, useFhir: boolean = false): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.put(this.getBaseUrl(useFhir) + endpoint, JSON.stringify(body), { headers, withCredentials: true });
  }

  delete(endpoint: string, useFhir: boolean = false): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete(this.getBaseUrl(useFhir) + endpoint, { headers, withCredentials: true });
  }

  patch(endpoint: string, body: any, useFhir: boolean = false): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.patch(this.getBaseUrl(useFhir) + endpoint, JSON.stringify(body), { headers, withCredentials: true });
  }
}
