import { RoleService } from './../services/role.service';
import { Component, OnInit } from '@angular/core';
import { EncounterService } from '../services/encounter.service';
import { NavController } from '@ionic/angular'; 
import { VisitService } from '../services/visit.service';
import { ModalController } from '@ionic/angular';
import { VisitPage } from '../visit/visit.page';
import { LocationService } from '../services/location.service';  


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
  noResults!: boolean;
  loading!: boolean;
  visits: any[] = [];
  selectedLocationId: string = ''; 
  locations: any[] = [];
  hideSearchButton!: boolean;

  constructor(
    private roleService: RoleService,
    private encounterService: EncounterService,
    private navCtrl: NavController,
    private visit: VisitService,
    private modalCtrl: ModalController,
    private locationService: LocationService 
    ) {}

  ngOnInit() {
    this.setGreeting();
    this.setDate();
    // this.getWeatherByLocation();
    this.loadVisits();
    this.loadLocations(); 

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

  // getWeatherByLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         this.roleService.getWeatherByCoordinates(latitude, longitude).subscribe({
  //           next: (response) => {
  //             this.temperature = response.current.temp_c;
  //             this.condition = response.current.condition.text;
  //             this.iconUrl = `https:${response.current.condition.icon}`;
  //             this.locationName = response.location.name; 
  //           },
  //           error: () => {
  //             this.temperature = 'Unavailable';
  //             this.condition = 'Unavailable';
  //             this.iconUrl = '';
  //             this.locationName = 'Location not found';
  //           },
  //         });
  //       },
  //       (error) => {
  //         this.locationError = 'Location access denied. Please allow location access.';
  //         console.error('Geolocation error:', error);
  //       }
  //     );
  //   } else {
  //     this.locationError = 'Geolocation is not supported by this browser.';
  //   }
  // }

  loadLocations() {
    this.locationService.getLocations().subscribe({
      next: (response) => {
        this.locations = response.results; 
        if (this.locations.length > 0) {
          this.selectedLocationId = this.locations[0].uuid; 
          this.loadVisits(); 
        }
        console.log('Locations:', this.locations);

      },
      error: (error) => {
        console.error('Error loading locations:', error);
      }
    });
  }

  searchPatients(query: string) {
    this.loading = true;
  
    this.encounterService.searchPatients(query).subscribe(
      (results) => {
        if (results.results.length === 0) {
          this.patientSearchResults = [];
          this.noResults = true;
          this.loading = false;
          return;
        }
  
        this.patientSearchResults = results.results;
        console.log("Search results:", this.patientSearchResults);
  
        const patientUuids = this.patientSearchResults.map((patient) => patient.uuid);
  
        this.encounterService.getPatientsVisits(patientUuids).subscribe((visits: any[]) => {
          this.patientSearchResults = this.patientSearchResults.map((patient) => {
            const visit = visits.find((v) => v.patient.uuid === patient.uuid);
            return {
              ...patient,
              hasActiveVisit: visit ? !visit.stopDatetime : false, 
            };
          });
  
          this.loading = false;
        });
  
        this.noResults = false;
      },
      (error) => {
        console.error("Error searching patients:", error);
        this.loading = false;
      }
    );
  }  
  
  
  goToRegistration() {
    this.navCtrl.navigateForward(['/registration']);  
  }
  
  goToPatientSummary(patient: any): void {
    if (!patient || !patient.uuid || !patient.person) {
      console.error("Invalid patient data:", patient);
      return;
    }
  
    const uuid = patient.uuid;
    const name = patient.person.display || "Unknown";
    const age = patient.person.age 
    
    let idPart = "N/A"; 
    if (patient.identifiers && patient.identifiers.length > 0) {
      idPart = patient.identifiers[0].identifier; 
    }
  
    this.navCtrl.navigateForward(`/patients/${uuid}/${idPart}/${age}/${encodeURIComponent(name)}`);
  }
  
  
  
  goToScreeningPage(patientUuid: string, name: string): void {
    const idPart = name.split(' - ')[0]; 
    const cleanName = name.split(' - ')[1] || name; 
  
    console.log('ID Part:', idPart);  
    console.log('Name:', cleanName);  
    console.log('Patient UUID:', patientUuid); 
  
    this.navCtrl.navigateForward(`/vulnerability-screening/${patientUuid}/${idPart}/${cleanName}`);
  }
  
  onLocationChange(event: any) {
    this.selectedLocationId = event.detail.value;
    this.loadVisits(); 
  }

  loadVisits() {
    if (!this.selectedLocationId) return; 
    this.visit.getVisits(this.selectedLocationId).subscribe({
      next: (data) => {
        this.visits = data.results; 
        console.log('Visits:', this.visits);
      },
      error: (error) => {
        console.error('Error loading visits:', error);
        this.visits = []; 
      }
    });
  }
  

  async checkIn(patientUuid: string, name: string, patient: any) {
    console.log('Patient Data:', patient);  // Log the patient data to ensure it's correct
  
    const cleanName = name.split(' - ')[1] || name;
  
    const modal = await this.modalCtrl.create({
      component: VisitPage,
      componentProps: {
        patientUuid,      // Pass the patient UUID
        patientName: cleanName,  // Pass the clean patient name
        patientData: patient // Pass the entire patient data object
      },
      breakpoints: [0, 0.5, 1]
    });
  
    await modal.present();
  }
  
  
}
