import { RoleService } from './../services/role.service';
import { Component, OnInit } from '@angular/core';
import { EncounterService } from '../services/encounter.service';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  greeting: string = '';
  temperature: number | string = 'Loading...';
  condition: string = '';
  iconUrl: string = '';
  locationError: string = '';
  locationName: string = 'Fetching location...';
  currentDate: string = '';
  patientSearchResults: any[] = []; 
  patientQuery: string = '';

  constructor(
    private roleService: RoleService,
    private encounterService: EncounterService,
    private navCtrl: NavController
    ) {}

  ngOnInit() {
    this.setGreeting();
    this.setDate();
    this.getWeatherByLocation();
  }

  setGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  setDate() {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    this.currentDate = new Date().toLocaleDateString(undefined, options);
  }

  getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.roleService.getWeatherByCoordinates(latitude, longitude).subscribe({
            next: (response) => {
              this.temperature = response.current.temp_c;
              this.condition = response.current.condition.text;
              this.iconUrl = `https:${response.current.condition.icon}`;
              this.locationName = response.location.name; 
            },
            error: () => {
              this.temperature = 'Unavailable';
              this.condition = 'Unavailable';
              this.iconUrl = '';
              this.locationName = 'Location not found';
            },
          });
        },
        (error) => {
          this.locationError = 'Location access denied. Please allow location access.';
          console.error('Geolocation error:', error);
        }
      );
    } else {
      this.locationError = 'Geolocation is not supported by this browser.';
    }
  }

  searchPatients(query: string) {
    this.encounterService.searchPatients(query).subscribe(
      (results) => {
        this.patientSearchResults = results.results;  
        console.log('Search results:', this.patientSearchResults);
      },
      (error) => {
        console.error('Error searching patients:', error);
      }
    );
  }

  goToScreeningPage(uuid: string, name: string) {
    this.navCtrl.navigateForward(`/vulnerability-screening/${uuid}/${name}`); 
  }
}
