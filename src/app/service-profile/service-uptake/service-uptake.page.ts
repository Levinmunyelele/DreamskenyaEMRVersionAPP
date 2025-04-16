import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { VisitService } from 'src/app/services/visit.service';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service-uptake',
  templateUrl: './service-uptake.page.html',
  styleUrls: ['./service-uptake.page.scss'],
  providers: [DatePipe]
})
export class ServiceUptakePage implements OnInit {
  visitId: string | null = null;
  date: string | null = null;
  location: string | null = null;
  visitType: string | null = null;
  cleanName: string | null = null;
  patientData: any;
  patientDataStringified: string | null = null;
  enrollmentData: any;
  enrollmentDataStringified: string | null = null;
  encounterData: any;
  encounterDataStringified: string | null = null;
  birthDate: string | null = null;
  age: number | null = null;
  selectedSegment: string = 'service-uptake';
  encounterType: string = "de556fe5-9dea-4187-bd6f-1e15b43e2ca3";
  form: string = "d37919b7-a2e4-4683-9271-a29024b4f329";
  activeVisit: any;

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private visitService: VisitService,
    private actionSheetCtrl: ActionSheetController,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.patientData = window.history.state.patientData;
    this.activeVisit = window.history.state.activeVisit || window.history.state.visitData;
    console.log('✅ Patient Data:', this.patientData);
    console.log('📌 Active Visit:', this.activeVisit);
    
  
    if (this.activeVisit) {
      this.visitId = this.activeVisit.uuid;
      this.visitType = this.activeVisit.visitType?.uuid;
      this.location = this.activeVisit.location?.uuid;
    }
  
    
    this.extractDOB();
  }
  
  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }
  getPatientName(): string {
    // Check if 'name' exists in patientData
    if (this.patientData?.name) {
      return this.patientData.name;  // Return name from patientData if available
    }
  
    // Check if 'person' exists in patientData and return display name
    if (this.patientData?.person?.display) {
      return this.patientData.person.display;  // Fallback to person display name if available
    }
  
    return 'N/A';  // Return 'N/A' if no data is found
  }
  
  getDreamsId(): string {
    // Check if 'dreamsId' exists in patientData
    if (this.patientData?.dreamsId) {
      return this.patientData.dreamsId;  // Return 'dreamsId' if available
    }
  
    // Fallback to patientData identifiers for the DREAMS ID
    if (this.patientData?.identifiers?.[0]?.display) {
      return this.patientData.identifiers[0].display.split(" = ")[1] || 'N/A';
    }
  
    return 'N/A';  // Return 'N/A' if no data is available
  }
  
  formatDate(dateString: string | null): string {
    return dateString ? this.datePipe.transform(dateString, 'dd/MM/yyyy') || 'N/A' : 'N/A';
  }
  
  extractDOB(): void {
    // Check if 'dob' is available in patientData
    if (this.patientData?.dob) {
      this.birthDate = this.patientData.dob;
    } else if (this.patientData?.person?.birthdate) {
      // If not found in dob, fallback to patientData person birthdate
      this.birthDate = this.patientData.person.birthdate;
    } else {
      // If no date of birth is found, check encounter data
      let dobObs = this.encounterData?.obs?.find((obs: any) => obs.display?.includes("Date of birth"));
      if (dobObs) {
        this.birthDate = dobObs.display.split(": ")[1];  // Extract date from encounter data
      } else {
        this.birthDate = null;  // If no date is found, set to null
      }
    }
  
    // Calculate age if birthDate exists
    this.age = this.calculateAge(this.birthDate);
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


  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Checkout',
          handler: () => {
            console.log('Checkout clicked');
            this.checkout();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async checkout() {
    const visitUuid = this.activeVisit?.uuid || this.visitId;
    const locationUuid = this.activeVisit?.location?.uuid || this.location;
    const visitTypeUuid = this.activeVisit?.visitType?.uuid || this.visitType;
    const startDatetime = this.activeVisit?.startDatetime;
  
    console.log('Visit UUID:', visitUuid);
    console.log('Location UUID:', locationUuid);
    console.log('Visit Type UUID:', visitTypeUuid);
    console.log('Start DateTime:', startDatetime);
  
    if (!visitUuid || !locationUuid || !visitTypeUuid || !startDatetime) {
      console.error("Missing required data for checkout!", {
        visitUuid,
        locationUuid,
        visitTypeUuid,
        startDatetime
      });
      return;
    }
  
    this.visitService.checkoutVisit(visitUuid, locationUuid, visitTypeUuid, startDatetime).subscribe(
      async response => {
        console.log("Checkout Successful:", response);
  
        const toast = await this.toastController.create({
          message: 'Checkout successful!',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
  
        setTimeout(() => {
          window.location.href = '/homy';
        }, 100);
      },
      async error => {
        console.error("Checkout Failed:", error);
  
        const toast = await this.toastController.create({
          message: 'Checkout failed! Please try again.',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        await toast.present();
      }
    );
  }
  

  goToPage(page: string) {
    this.router.navigate([`/${page}`], {
      state: {
        patientData: this.patientData,
        activeVisit: this.activeVisit,
        visitType: this.visitType,
        form: this.form,
        encounterType: this.encounterType
      }
    });
  }

  goToPages(page: string, form: string, encounterType: string) {
    this.router.navigate([`/${page}`], {
      state: {
        patientData: this.patientData,
        activeVisit: this.activeVisit,
        visitType: this.visitType,
        form: form,              
        encounterType: encounterType  
      }
    });
  }
}  