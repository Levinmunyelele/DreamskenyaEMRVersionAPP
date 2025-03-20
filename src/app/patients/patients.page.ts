import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitService } from '../services/visit.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  
  patientUuid!: string;
  patientId!: string;
  patientName!: string;
  patientAge!: string;
  selectedSection: string = 'summary';

  constructor(
    private route: ActivatedRoute,
    private visitService: VisitService
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
    });
  }
  getInitials(name: string): string {
    if (!name) return 'NA';
    const parts = name.split(' ');
    const initials = parts.map(part => part.charAt(0)).join('').toUpperCase();
    return initials.length > 2 ? initials.substring(0, 2) : initials;
  }

  showSection(section: string) {
    this.selectedSection = section;
  }
}
