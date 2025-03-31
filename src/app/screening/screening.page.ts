import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncounterService } from '../services/encounter.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss']
})
export class ScreeningPage implements OnInit {
  loading: boolean = false;
  patientSearchResults: any[] = [];
  noResults: boolean = false;
  searchQuery: string = '';
  dreamsProgramUuid = 'c6a2e0c1-38b1-4474-9bfe-fe4df3680183';

  constructor(private router: Router, private encounterService: EncounterService) { }

  ngOnInit() { }

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
    this.patientSearchResults = [];

    patients.forEach((patient, index) => {
      const enrollments = enrollmentResults[index]?.results || [];
      const isEnrolledInDreams = enrollments.some((enrollment: any) =>
        enrollment.program?.uuid === this.dreamsProgramUuid
      );

      if (isEnrolledInDreams) {
        this.patientSearchResults.push(this.formatPatientData(patient));
      }
    });

    this.noResults = this.patientSearchResults.length === 0;
    this.loading = false;
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

  viewPatient(patient: any) {
    console.log('Patient Data:', patient); 

    const idPart = patient.dreamsId?.trim() || 'N/A';  
    const cleanName = encodeURIComponent(patient.name?.trim() || 'Unknown'); 

    console.log('Navigating to:', `/visit/${patient.uuid}/${idPart}/${cleanName}`); 

    this.router.navigate(['/visit', patient.uuid, idPart, cleanName], {
      queryParams: { patientData: JSON.stringify(patient.rawData) }, // Changed to patientData
    });
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
}
