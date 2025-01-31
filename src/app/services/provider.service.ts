import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(
    private apiService: ApiService
  ) { }
   

getProviders() {
    return this.apiService.get('provider');
  }

}
