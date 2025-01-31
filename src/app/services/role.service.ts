import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiKey = '66f12243623045239b4125258251301'; 
  private baseUrl = 'http://api.weatherapi.com/v1/current.json';

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&q=${lat},${lon}`;
    return this.http.get<any>(url);
  }
  

  getRoles(): Observable<any> {
    return this.apiService.get('role?limit=20&v=default');
  }

  saveRole(role: any): Observable<any> {
    return this.apiService.post('role', role);
  }

  updateRole(roleUuid: string, role: any): Observable<any> {
    return this.apiService.put(`role/${roleUuid}`, role);
  }

  deleteRole(roleUuid: string): Observable<any> {
    return this.apiService.delete(`role/${roleUuid}`);
  }

  getPrivileges(): Observable<any> {
    return this.apiService.get('privilege');
  }
}