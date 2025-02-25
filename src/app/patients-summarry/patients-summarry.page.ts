import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitService } from '../services/visit.service';

@Component({
  selector: 'app-patients-summarry',
  templateUrl: './patients-summarry.page.html',
  styleUrls: ['./patients-summarry.page.scss'],
})
export class PatientsSummarryPage implements OnInit {
  patientUuid!: string;
  patientId!: string;
  patientName!: string;
  conditions: any[] = [];
  allergies: any[] = [];
  immunizations: any[] = [];
  medications: any[] = [];
  patientAge!: string;

  constructor(
    private route: ActivatedRoute,
    private visitService: VisitService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameters
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
    });
  }

  getInitials(name: string): string {
    if (!name) return 'NA';
    const parts = name.split(' ');
    const initials = parts.map(part => part.charAt(0)).join('').toUpperCase();
    return initials.length > 2 ? initials.substring(0, 2) : initials;
  }
  

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
