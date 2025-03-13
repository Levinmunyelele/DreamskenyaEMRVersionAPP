import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-uptake',
  templateUrl: './service-uptake.page.html',
  styleUrls: ['./service-uptake.page.scss'],
  providers: [DatePipe] 
})
export class ServiceUptakePage implements OnInit {
  enrollmentData: any;
  encounterData: any;
  birthDate: string | null = null;
  age: number | null = null;
  selectedSegment: string = 'service-uptake';

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['enrollmentData']) {
        this.enrollmentData = JSON.parse(params['enrollmentData']);
        console.log("Received Enrollment Data:", this.enrollmentData);
      }
      if (params['encounterData']) {
        this.encounterData = JSON.parse(params['encounterData']);
        console.log("Received Encounter Data:", this.encounterData);
        this.extractDOB();  
      }
    });
  }
  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value; 
  }

  getPatientName(): string {
    return this.enrollmentData?.patient?.display?.split(" - ")[1] || "N/A";
  }
  
  getDreamsId(): string {
    return this.enrollmentData?.patient?.display?.split(" - ")[0] || "N/A";
  }

  formatDate(dateString: string | null): string {
    return dateString ? this.datePipe.transform(dateString, 'dd/MM/yyyy') || 'N/A' : 'N/A';
  }

  extractDOB(): void {
    const dobObs = this.encounterData?.obs?.find((obs: any) => obs.display?.includes("Date of birth"));

    if (dobObs) {
      this.birthDate = dobObs.display.split(": ")[1]; 
      this.age = this.calculateAge(this.birthDate);
    } else {
      this.birthDate = null;
      this.age = null;
    }
  }

  calculateAge(dob: string | null): number | null {
    if (!dob) return null;

    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return null;  

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;  
    }
    return age;
  }
}
