import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  private formDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);  
  formData$: Observable<any> = this.formDataSubject.asObservable();  

  constructor(private apiService: ApiService) {}

  getForm(): Observable<any> {
    return this.apiService.get('form');
  }

  createForm(formData: any): Observable<any> {
    return this.apiService.post('form', formData);
  }

  setFormData(data: any): void {
    this.formDataSubject.next(data);  
    console.log('Form Data has been set:', data);
  }

  getFormData(): Observable<any> {
    return this.formData$;  
  }
}
