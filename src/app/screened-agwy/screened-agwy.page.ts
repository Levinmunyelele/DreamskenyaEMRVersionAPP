import { Component, OnInit } from '@angular/core';
import { EncounterService } from '../services/encounter.service';

@Component({
  selector: 'app-screened-agwy',
  templateUrl: './screened-agwy.page.html',
  styleUrls: ['./screened-agwy.page.scss'],
})
export class ScreenedAGWYPage implements OnInit {
  eligiblePatients: { id: string; name: string }[] = [];
  ineligiblePatients: { id: string; name: string }[] = [];
  activeTab: string = 'eligible';

  constructor(private encounterService: EncounterService) {}

  async ngOnInit() {
    await this.loadScreenedPatients();
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  async loadScreenedPatients() {
    const patients = await this.encounterService.getAllScreenedPatients();
  
    this.eligiblePatients = [];
    this.ineligiblePatients = [];
  
    for (const patient of patients) {
      if (patient.isEligible) {
        this.eligiblePatients.push({ id: patient.id, name: patient.name });
      } else {
        this.ineligiblePatients.push({ id: patient.id, name: patient.name });
      }
    }
  }
  
}
