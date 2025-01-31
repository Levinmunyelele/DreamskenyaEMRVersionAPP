import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { ProviderService } from '../services/provider.service';

interface ScreeningData {
  patient: { uuid: string; name?: string };
  provider: { uuid: string };
  location: { uuid: string };
  obs: any[];
}

interface Location {
  uuid: string;
  display: string;
}

interface Provider {
  uuid: string;
  uuis: string;
  display: string; 
}

@Component({
  selector: 'app-screened-agwy',
  templateUrl: './screened-agwy.page.html',
  styleUrls: ['./screened-agwy.page.scss'],
})
export class ScreenedAGWYPage implements OnInit {
  screeningDataList: ScreeningData[] = []; 
  locations: Location[] = []; 
  loadingLocations = false; 
  errorLoadingLocations = false; 
  providers: Provider[] = []; 
  loadingProviders = false; 
  errorLoadingProviders = false; 

  constructor(
    private locationService: LocationService,
    private providerService: ProviderService
  ) {}

  ngOnInit() {
    this.loadScreeningData();
    this.loadLocations();
    this.loadProviders();
  }

  loadScreeningData(): void {
    const storedData = localStorage.getItem('screeningData'); 
    if (storedData) {
      try {
        this.screeningDataList = JSON.parse(storedData); 
        console.log('Screening data loaded:', this.screeningDataList);
      } catch (error) {
        console.error('Error parsing screening data from localStorage:', error);
      }
    }
  }

  loadLocations(): void {
    this.loadingLocations = true; 
    this.locationService.getLocations().subscribe(
      (response) => {
        this.locations = response.results || []; 
        this.loadingLocations = false; 
      },
      (error) => {
        this.loadingLocations = false; 
        this.errorLoadingLocations = true;
        console.error('Error fetching locations:', error);
      }
    );
  }

  getLocationName(locationUuid: string | undefined): string {
    console.log('Location UUID:', locationUuid); 
    if (!locationUuid) {
      return 'Unknown Location';  
    }
    
    console.log('Available Locations:', this.locations);
  
    const location = this.locations.find(loc => loc.uuid === locationUuid);
    
    console.log('Found Location:', location);  
    return location ? location.display : 'Unknown Location'; 
  }

  loadProviders(): void {
    this.loadingProviders = true; 
    this.providerService.getProviders().subscribe(
      (response) => {
        this.providers = response.results || []; 
        this.loadingProviders = false; 
      },
      (error) => {
        this.loadingProviders = false; 
        this.errorLoadingProviders = true;
        console.error('Error fetching locations:', error);
      }
    );
  }
  
  getProviderName(providerUuid: string | undefined): string {
    console.log('Provider UUID:', providerUuid); 
    if (!providerUuid) {
      return 'Unknown Provider';  
    }
    
    console.log('Available Providers:', this.providers);
  
    const provider = this.providers.find(prov => prov.uuid === providerUuid);
    
    console.log('Found Provider:', provider);  
    return provider ? provider.display : 'Unknown Provider'; 
  }
  
  getEligibility(obs: any[]): string {
    const eligibleObs = obs?.find(o => o.concept?.uuid === 'ccf759b9-bdd4-4265-a71a-67a894d89dec');
    if (eligibleObs) {
      const options = [
        { value: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'Yes' },
        { value: '1066AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', label: 'No' },
      ];
      const selectedOption = options.find(option => option.value === eligibleObs.value?.uuid);
      return selectedOption ? selectedOption.label : 'Unknown';
    }
    return 'Unknown';
  }
}
