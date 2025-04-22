import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private url = '  https://dreams-kenyaemr.healthstrat.co.ke/openmrs/ws/rest/v1/';
//  private url = 'http://localhost:8080/openmrs/ws/rest/v1/';
//  private url2 = 'http://localhost:8080/openmrs/ws/fhir2/R4/';
 private url2 = '  https://dreams-kenyaemr.healthstrat.co.ke/openmrs/ws/fhir2/R4/';

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

  private isFullUrl(endpoint: string): boolean {
    // Check if the endpoint is already a full URL
    const regex = /^(http|https):\/\//i;
    return regex.test(endpoint);
  }

  private constructUrl(endpoint: string, useFhir: boolean): string {
    // If the endpoint is already a full URL, return it as is
    return this.isFullUrl(endpoint) ? endpoint : this.getBaseUrl(useFhir) + endpoint;
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

    const url = this.constructUrl(endpoint, useFhir); // Get the correct URL

    console.log('GET Request to:', url, reqOpts);
    return this.http.get(url, reqOpts);
  }

  post(endpoint: string, body: any, useFhir: boolean = false): Observable<any> {
    const url = this.constructUrl(endpoint, useFhir);
    const headers = this.createAuthorizationHeader();
    return this.http.post(url, JSON.stringify(body), { headers, withCredentials: true });
  }

  put(endpoint: string, body: any, useFhir: boolean = false): Observable<any> {
    const url = this.constructUrl(endpoint, useFhir);
    const headers = this.createAuthorizationHeader();
    return this.http.put(url, JSON.stringify(body), { headers, withCredentials: true });
  }

  delete(endpoint: string, useFhir: boolean = false): Observable<any> {
    const url = this.constructUrl(endpoint, useFhir);
    const headers = this.createAuthorizationHeader();
    return this.http.delete(url, { headers, withCredentials: true });
  }

  patch(endpoint: string, body: any, useFhir: boolean = false): Observable<any> {
    const url = this.constructUrl(endpoint, useFhir);
    const headers = this.createAuthorizationHeader();
    return this.http.patch(url, JSON.stringify(body), { headers, withCredentials: true });
  }
}
