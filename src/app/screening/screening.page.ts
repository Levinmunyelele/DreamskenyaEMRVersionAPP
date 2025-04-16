import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { EncounterService } from '../services/encounter.service';
import { VisitPage } from '../visit/visit.page';
import { forkJoin, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss'],
})
export class ScreeningPage implements OnInit {
  loading: boolean = false;
  patientSearchResults: any[] = [];
  noResults: boolean = false;
  searchQuery: string = '';
  dreamsProgramUuid = 'c6a2e0c1-38b1-4474-9bfe-fe4df3680183';

  constructor(
    private encounterService: EncounterService,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  searchPatients() {
    if (!this.searchQuery.trim()) return;

    console.log('Searching for:', this.searchQuery);
    this.loading = true;

    this.encounterService.searchPatients(this.searchQuery).subscribe(
      (results: any) => {
        console.log('API Response:', results);
        const patients = results.results || [];
        const patientUuids = patients.map((patient: any) => patient.uuid);

        if (patientUuids.length === 0) {
          this.handleNoResults();
          return;
        }

        const enrollmentObservables: Observable<any>[] = patientUuids.map((uuid: string) =>
          this.encounterService.getPatientProgramEnrollments(uuid)
        );

        forkJoin(enrollmentObservables).subscribe(
          (enrollmentResults: any[]) => {
            this.processEnrollmentResults(patients, enrollmentResults);
          },
          (error) => {
            console.error('Error fetching program enrollments:', error);
            this.loading = false;
          }
        );
      },
      (error) => {
        console.error('Error searching patients:', error);
        this.loading = false;
      }
    );
  }

  private handleNoResults() {
    this.patientSearchResults = [];
    this.noResults = true;
    this.loading = false;
  }

  private processEnrollmentResults(patients: any[], enrollmentResults: any[]) {
    const dreamsPatients: any[] = [];

    patients.forEach((patient, index) => {
      const enrollments = enrollmentResults[index]?.results || [];
      const isEnrolledInDreams = enrollments.some((enrollment: any) =>
        enrollment.program?.uuid === this.dreamsProgramUuid
      );

      if (isEnrolledInDreams) {
        dreamsPatients.push(patient);
      }
    });

    if (dreamsPatients.length === 0) {
      this.handleNoResults();
      return;
    }

    const dreamsPatientUuids = dreamsPatients.map(p => p.uuid);

    this.encounterService.getPatientsVisits(dreamsPatientUuids).subscribe((visits: any[]) => {
      this.patientSearchResults = dreamsPatients.map(patient => {
        const visit = visits.find(v => v.patient.uuid === patient.uuid);
        const hasActiveVisit = visit ? !visit.stopDatetime : false;

        return {
          ...this.formatPatientData(patient),
          hasActiveVisit,
          activeVisit: visit || null,
        };
      });

      this.noResults = this.patientSearchResults.length === 0;
      this.loading = false;
    }, (err) => {
      console.error('Error loading visit data:', err);
      this.loading = false;
    });
  }

  private formatPatientData(patient: any) {
    const displayParts = patient.display?.split(' - ') || [];
    return {
      uuid: patient.uuid,
      dreamsId: displayParts[0] || 'N/A',
      name: displayParts[1] || patient.person?.display || 'Unknown',
      dob: this.formatDate(patient.person?.birthdate),
      rawData: patient,
    };
  }

  private formatDate(date: string): string {
    return date ? date.split('T')[0] : 'Unknown';
  }

  async checkIn(patientUuid: string, name: string, patient: any) {
    console.log('Patient Data (in checkIn):', patient);

    const cleanName = name.split(' - ')[1] || name;

    const modal = await this.modalCtrl.create({
      component: VisitPage,
      componentProps: {
        patientUuid,
        patientName: cleanName,
        patientData: patient,
      },
      breakpoints: [0, 0.5, 1],
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data?.checkedIn && data?.visit) {
      console.log('✅ Patient Data:', patient);
      console.log('📌 Updated visit data:', data.visit);
    
      this.navCtrl.navigateForward(`/service-uptake/${patientUuid}`, {
        state: { 
          patientData: patient,
          activeVisit: data.visit
        },
      });
    
    } else if (data?.checkedIn) {
      console.log('✅ Patient Data:', patient);
      console.log('⚠️ No visit data returned, but patient was checked in.');
    
      this.navCtrl.navigateForward(`/service-uptake/${patientUuid}`, {
        state: { 
          patientData: patient,
          activeVisit: data.visit // could be null or undefined
        },
      });
    
    } else {
      console.log('❌ Patient was not checked in.');
    }
  }

  // Updated viewPatient method with check for active visit
  viewPatient(patient: any) {
    console.log('Viewing patient:', patient);

    // Check if the patient has an active visit
    if (patient.hasActiveVisit) {
      console.log('Patient has an active visit, navigating to service uptake...');
      this.navCtrl.navigateForward(`/service-uptake/${patient.uuid}`, {
        state: { 
          patientData: patient.rawData, // Passing the patient data
          visitData: patient.activeVisit // Passing the active visit data
        },
      });
    } else {
      console.log('No active visit, opening VisitPage modal...');
      this.checkIn(patient.uuid, patient.name, patient);
    }
  }

  getAge(dob: string): number {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      console.error('Invalid date format:', dob);
      return 0;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Debounce search on input
  onSearchChange(event: any): void {
    const query = event.target.value;
    this.searchQuery = query;

    // Implement debounce by delaying the search for 300ms
    if (query.trim()) {
      this.loading = true;
      this.searchPatients();  // Call searchPatients when query changes
    } else {
      this.patientSearchResults = [];  // Clear results if query is empty
      this.noResults = false;
      this.loading = false;
    }
  }
}
