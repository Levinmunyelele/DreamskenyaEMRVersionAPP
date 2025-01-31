
import { Component, OnInit } from '@angular/core';
import { ProgrammesService } from '../services/programmes.service';  // Import your service

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  programmes: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private programmesService: ProgrammesService) {}

  ngOnInit() {
    this.getEligiblePrograms('546ce21a-1274-425e-abb0-45a1bd83d757');
  }

  getEligiblePrograms(patientUuid: string) {
    this.programmesService.getEligiblePrograms(patientUuid).subscribe(
      (data) => {
        console.log('API Response:', data);  

        if (Array.isArray(data)) {
          this.programmes = data;  
        } else {
          this.programmes = [];
        }

        console.log('Programmes array:', this.programmes); 

        this.loading = false;
      },
      (error) => {
        console.error('Error fetching programs:', error);
        this.error = 'Error fetching programs';
        this.loading = false;
      }
    );
  }
}
