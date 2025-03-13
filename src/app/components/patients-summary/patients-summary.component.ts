import { Component, OnInit } from '@angular/core';
import { VisitService } from '../../services/visit.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-patients-summary',
  templateUrl: './patients-summary.component.html',
  styleUrls: ['./patients-summary.component.scss'],
})
export class PatientsSummaryComponent  implements OnInit {

  patientUuid!: string;
  patientId!: string;
  patientName!: string;
  conditions: any[] = [];
  allergies: any[] = [];
  immunizations: any[] = [];
  medications: any[] = [];
  patientAge!: string;

  constructor(
    private visitService: VisitService,
    private route: ActivatedRoute,


  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.patientUuid = params.get('uuid')!;
      this.patientId = params.get('id')!;
      this.patientAge =params.get('age')!;
      this.patientName = decodeURIComponent(params.get('name')!);

      console.log("Extracted UUID:", this.patientUuid);
      console.log("Extracted ID:", this.patientId);
      console.log("Extracted Name:", this.patientName);

      // Load patient data after parameters are set
      this.loadPatientSummaryData();
    });  }

  loadPatientSummaryData(): void {
    // Fetch Conditions
    this.visitService.getConditions(this.patientUuid).subscribe({
      next: (response: any) => {
        this.conditions = response.entry?.map((item: any) => item.resource) || [];
      },
      error: (err: any) => {
        console.error('Failed to load conditions:', err);
      }
    });

    // Fetch Allergies
    this.visitService.getAllergies(this.patientUuid).subscribe({
      next: (response: any) => {
        this.allergies = response.entry?.map((item: any) => item.resource) || [];
      },
      error: (err: any) => {
        console.error('Failed to load allergies:', err);
      }
    });

    // Fetch Immunizations
    this.visitService.getImmunizations(this.patientUuid).subscribe({
      next: (response: any) => {
        this.immunizations = response.entry?.map((item: any) => item.resource) || [];
      },
      error: (err: any) => {
        console.error('Failed to load immunizations:', err);
      }
    });

    // Fetch Medications
    this.visitService.getMedications(this.patientUuid).subscribe({
      next: (response: any) => {
        this.medications = response.entry?.map((item: any) => item.resource) || [];
      },
      error: (err: any) => {
        console.error('Failed to load medications:', err);
      }
    });
  }

}
