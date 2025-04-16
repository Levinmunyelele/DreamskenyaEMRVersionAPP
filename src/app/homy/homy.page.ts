import { RoleService } from './../services/role.service';
import { Component, OnInit } from '@angular/core';
import { EncounterService } from '../services/encounter.service';
import { NavController } from '@ionic/angular';
import { VisitService } from '../services/visit.service';
import { ModalController } from '@ionic/angular';
import { VisitPage } from '../visit/visit.page';
import { LocationService } from '../services/location.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-homy',
  templateUrl: './homy.page.html',
  styleUrls: ['./homy.page.scss'],
})
export class HomyPage implements OnInit {
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
  isPatientCheckedIn: boolean = false;

  constructor(
    private roleService: RoleService,
    private encounterService: EncounterService,
    private navCtrl: NavController,
    private visit: VisitService,
    private modalCtrl: ModalController,
    private locationService: LocationService,
    private alertController: AlertController

  ) {}

  ngOnInit() {
    this.setGreeting();
    this.setDate();
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
        console.log('Search results:', this.patientSearchResults);

        const patientUuids = this.patientSearchResults.map((patient) => patient.uuid);

        this.encounterService.getPatientsVisits(patientUuids).subscribe((visits: any[]) => {
          this.patientSearchResults = this.patientSearchResults.map((patient) => {
            const visit = visits.find((v) => v.patient.uuid === patient.uuid);
            return {
              ...patient,
              hasActiveVisit: visit ? !visit.stopDatetime : false,
              activeVisit: visit || null // Store the visit object
            };
          });

          this.loading = false;
        });

        this.noResults = false;
      },
      (error) => {
        console.error('Error searching patients:', error);
        this.loading = false;
      }
    );
  }

  async presentEligibilityAlert() {
    const alert = await this.alertController.create({
      header: 'Eligibility Status',
      message: 'The girl was screened and found eligible. Proceeding to enrollment.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async analyzeEncounters(patient: any): Promise<string> {
    try {
      console.log('Analyzing encounters for patient:', patient);
  
      // Fetch all encounters for the patient
      const fetchedEncounters = await this.encounterService.getAllPatientEncounters(patient.uuid).toPromise();
      console.log('Fetched all encounters:', fetchedEncounters);
  
      // Ensure encounters exist and is an array
      const encounters = fetchedEncounters || [];
      console.log('All encounters for the patient:', encounters);
  
      // Utility function to parse date from encounter display string
      const parseEncounterDate = (display: string): Date | null => {
        const dateMatch = display.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (dateMatch) {
          const day = parseInt(dateMatch[1], 10);
          const month = parseInt(dateMatch[2], 10) - 1; // Month is 0-indexed
          const year = parseInt(dateMatch[3], 10);
          return new Date(year, month, day);
        }
        return null;
      };
  
      // Check if a Registration encounter exists (latest)
      const latestRegistration = encounters
        .filter(enc => enc.display.includes('Registration'))
        .sort((a, b) => {
          const dateA = parseEncounterDate(a.display);
          const dateB = parseEncounterDate(b.display);
          return dateB && dateA ? dateB.getTime() - dateA.getTime() : 0;
        })[0];
      const hasRegistration = !!latestRegistration;
      console.log('Has Registration:', hasRegistration, 'Latest Registration:', latestRegistration);
  
      // Check for the latest DREAMS_REG encounter
      const dreamsRegEncounters = encounters.filter(enc => enc.display.includes('DREAMS_REG'));
      let latestDreamsRegEncounter: any = null;
      let latestDreamsRegDate = new Date(0); // Initialize with a very early date
  
      for (const encounter of dreamsRegEncounters) {
        const encounterDate = parseEncounterDate(encounter.display);
        if (encounterDate && encounterDate > latestDreamsRegDate) {
          latestDreamsRegDate = encounterDate;
          latestDreamsRegEncounter = encounter;
        }
      }
  
      const hasVulnerabilityScreening = !!latestDreamsRegEncounter;
      console.log('Has Vulnerability Screening:', hasVulnerabilityScreening, 'Latest DREAMS_REG Encounter:', latestDreamsRegEncounter);
  
      // Check for the latest DREAMS Enrollment encounter
      const latestEnrollment = encounters
        .filter(enc => enc.display.includes('DREAMS Enrollment'))
        .sort((a, b) => {
          const dateA = parseEncounterDate(a.display);
          const dateB = parseEncounterDate(b.display);
          return dateB && dateA ? dateB.getTime() - dateA.getTime() : 0;
        })[0];
      const hasEnrollment = !!latestEnrollment;
      console.log('Has Enrollment:', hasEnrollment, 'Latest Enrollment:', latestEnrollment);
  
      // Check for the latest DREAMS Service Application encounter
      const latestServiceApplication = encounters
        .filter(enc => enc.display.includes('DREAMS Service Application'))
        .sort((a, b) => {
          const dateA = parseEncounterDate(a.display);
          const dateB = parseEncounterDate(b.display);
          return dateB && dateA ? dateB.getTime() - dateA.getTime() : 0;
        })[0];
      const hasServiceUptake = !!latestServiceApplication;
      console.log('Has Service Uptake:', hasServiceUptake, 'Latest Service Application:', latestServiceApplication);
  
      // Analyze based on encounter types
      // Priority Order: Service Uptake > Enrollment > Vulnerability
      if (hasServiceUptake) {
        return 'service'; // Take to Service Uptake first
      }
  
      if (hasEnrollment) {
        return 'service'; // If Service Uptake exists but Enrollment exists too, take to Service Uptake
      }
  
      if (hasRegistration && hasVulnerabilityScreening && latestDreamsRegEncounter) {
        // Expand the latest Vulnerability Screening Encounter to check eligibility
        const expandedEncounter = await this.encounterService.getEncounterByUuid(latestDreamsRegEncounter.uuid).toPromise();
        console.log('Expanded Vulnerability Screening Encounter:', expandedEncounter);
        console.log('Checking expandedEncounter.obs:', expandedEncounter?.obs);
  
        const vulnerabilityScreeningObs = expandedEncounter?.obs?.find((obs: { display: string | string[]; }) => {
          return Array.isArray(obs.display) ? obs.display.some(d => d.includes('Eligible')) : obs.display?.includes('Eligible');
        });
  
        console.log('Vulnerability Screening Obs (Eligible):', vulnerabilityScreeningObs);
  
        if (vulnerabilityScreeningObs) {
          if (vulnerabilityScreeningObs.display.includes('Eligible: Yes')) {
            this.presentEligibilityAlert();
            return 'enrollment'; // If eligible, navigate to enrollment
          } else if (vulnerabilityScreeningObs.display.includes('Eligible: No')) {
            return 'vulnerability';
          }
        }
        return 'vulnerability';
      }
  
      return 'vulnerability'; // If none of the above, default to vulnerability
    } catch (error) {
      console.error('Error analyzing encounters:', error);
      throw error;
    }
  }
  
  
  goToPatientSummary(patient: any): void {
    if (!patient || !patient.uuid || !patient.person) {
      console.error("Invalid patient data:", patient);
      return;
    }

    const uuid = patient.uuid;
    const name = patient.person.display || "Unknown";

    this.isPatientCheckedIn = patient.hasActiveVisit;

    if (this.isPatientCheckedIn) {
      this.analyzeEncounters(patient).then((nextStep) => {
        if (nextStep === 'vulnerability') {
          this.goToScreeningPage(uuid, name, patient, patient.activeVisit); // Pass activeVisit
        } else if (nextStep === 'enrollment') {
          this.navCtrl.navigateForward(`/enrollment`, {
            state: { patientData: patient, activeVisit: patient.activeVisit } // Pass activeVisit
          });
        } else if (nextStep === 'service') {
          this.navCtrl.navigateForward(`/service-uptake/${uuid}`, {
            state: { patientData: patient, activeVisit: patient.activeVisit } // Pass activeVisit
          });
        }
      }).catch((error) => {
        console.error('Error analyzing encounters:', error);
      });
    } else {
      this.checkIn(patient.uuid, name, patient);
    }
  }
  goToScreeningPage(patientUuid: string, name: string, patient?: any, activeVisit?: any): void {
    const idPart = name.split(' - ')[0];
    const cleanName = name.split(' - ')[1] || name;

    console.log('ID Part:', idPart);
    console.log('Name:', cleanName);
    console.log('Patient UUID:', patientUuid);
    console.log('Patient Data (in goToScreeningPage):', patient);
    console.log('Active Visit Data (in goToScreeningPage):', activeVisit);

    this.navCtrl.navigateForward(`/vulnerability-screening/${patientUuid}/${patient?.identifiers?.[0]?.identifier || 'N/A'}/${cleanName}`, {
      state: { patientData: patient, activeVisit: activeVisit } 
    });
  }

  async checkIn(patientUuid: string, name: string, patient: any) {
    console.log('Patient Data (in checkIn):', patient);

    const cleanName = name.split(' - ')[1] || name;

    const modal = await this.modalCtrl.create({
      component: VisitPage,
      componentProps: {
        patientUuid,
        patientName: cleanName,
        patientData: patient
      },
      breakpoints: [0, 0.5, 1]
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.checkedIn && data?.visit) { // Assuming VisitPage returns visit data on check-in
      this.analyzeEncounters(patient).then((nextStep) => {
        if (nextStep === 'vulnerability') {
          this.goToScreeningPage(patientUuid, cleanName, patient, data.visit); // Pass new visit data
        } else if (nextStep === 'enrollment') {
          this.navCtrl.navigateForward(`/enrollment`, {
            state: { patientData: patient, visitData: data.visit } // Pass new visit data
          });
        } else if (nextStep === 'service') {
          this.navCtrl.navigateForward(`/service-uptake/${patientUuid}`, {
            state: { patientData: patient, visitData: data.visit } // Pass new visit data
          })
        }
      }).catch((error) => {
        console.error('Error analyzing encounters after check-in:', error);
      });
    } else if (data?.checkedIn) {
      this.analyzeEncounters(patient).then((nextStep) => {
        if (nextStep === 'vulnerability') {
          this.goToScreeningPage(patientUuid, cleanName, patient, null); // Pass null for visit data
        } else if (nextStep === 'enrollment') {
          this.navCtrl.navigateForward(`/enrollment`, {
            state: { patientData: patient, visitData: null } // Pass null for visit data
          });
        } else if (nextStep === 'service') {
          this.navCtrl.navigateForward(`/service-uptake/${patientUuid}`, {
            state: { patientData: patient, visitData: null } // Pass null for visit data
          });
        }
      }).catch((error) => {
        console.error('Error analyzing encounters after check-in:', error);
      });
    } else {
      console.log('Patient was not checked in.');
    }
  }
  goToRegistration() {
    this.navCtrl.navigateForward(['/registration']);  
  }

  
}
