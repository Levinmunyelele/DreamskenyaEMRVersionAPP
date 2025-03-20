import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncounterService } from '../services/encounter.service';


@Component({
  selector: 'app-screening',
  templateUrl: './screening.page.html',
  styleUrls: ['./screening.page.scss']
})
export class ScreeningPage implements OnInit {
  loading!: boolean;
  patientSearchResults: any[] = [];
  noResults!: boolean;
  searchQuery: string = '';

  constructor( private router: Router,
    private encounterService: EncounterService,
    
  ) {}

  ngOnInit() { }

  searchPatients() {
    if (!this.searchQuery.trim()) return;
  
    console.log("Searching for:", this.searchQuery); // Debugging
  
    this.loading = true;
    this.encounterService.searchPatients(this.searchQuery).subscribe(
      (results: any) => {
        console.log("API Response:", results); // Debugging
  
        this.patientSearchResults = (results.results || []).map((patient: any) => {
          // Split "display" to get Dreams ID and Name
          const displayParts = patient.display?.split(" - ") || [];
          const dreamsId = displayParts[0] || 'N/A';
          const fullName = displayParts[1] || patient.person?.display || 'Unknown';
  
          // Extract and format DOB (YYYY-MM-DD)
          let rawDob = patient.person?.birthdate || 'Unknown';
          let formattedDob = rawDob !== 'Unknown' ? rawDob.split('T')[0] : 'Unknown';
  
          return {
            uuid: patient.uuid,
            dreamsId: dreamsId,  // Extracted Dreams ID
            name: fullName,      // Extracted Name
            dob: formattedDob,   // Formatted DOB (YYYY-MM-DD)
            rawData: patient,    // Store full API response for navigation
          };
        });
  
        this.noResults = this.patientSearchResults.length === 0;
        this.loading = false;
      },
      (error) => {
        console.error("Error searching patients:", error);
        this.loading = false;
      }
    );
  }
  
  viewPatient(patient: any) {
    this.router.navigate(['/service-uptake', patient.uuid], {
      queryParams: { data: JSON.stringify(patient.rawData) }, 
    });
  }
  
  
  
  getAge(dob: string): number {
    if (!dob) return 0; 
  
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
      console.error("Invalid date format:", dob);
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
