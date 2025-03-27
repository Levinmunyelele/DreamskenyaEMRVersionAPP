import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { VisitService } from 'src/app/services/visit.service';
import { ActionSheetController, ToastController } from '@ionic/angular';


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
  visitType: any;
  patientData: any;
  encounterType: string = "de556fe5-9dea-4187-bd6f-1e15b43e2ca3";
  form: string = "d37919b7-a2e4-4683-9271-a29024b4f329";

  patientDataStringified: string | null = null;
  enrollmentDataStringified: string | null = null;
  encounterDataStringified: string | null = null;



  constructor
  (private route: ActivatedRoute,
    private datePipe: DatePipe,
    private visitService: VisitService,
    private actionSheetCtrl: ActionSheetController,
    private toastController: ToastController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.patientData = JSON.parse(params['data']);
        this.patientDataStringified = JSON.stringify(this.patientData);
      }
      if (params['enrollmentData']) {
        this.enrollmentData = JSON.parse(params['enrollmentData']);
        this.enrollmentDataStringified = JSON.stringify(this.enrollmentData);
      }
      if (params['encounterData']) {
        this.encounterData = JSON.parse(params['encounterData']);
        this.encounterDataStringified = JSON.stringify(this.encounterData);
      }
      if (params['visit']) {
        this.visitType = params['visit'];
      }
    });

  }
  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  getPatientName(): string {
    return this.enrollmentData?.patient?.display?.split(" - ")[1] ||
      this.patientData?.person?.display ||
      "N/A";
  }

  getDreamsId(): string {
    return this.enrollmentData?.patient?.display?.split(" - ")[0] ||
      this.patientData?.identifiers?.[0]?.display?.split(" = ")[1] ||
      "N/A";
  }

  formatDate(dateString: string | null): string {
    return dateString ? this.datePipe.transform(dateString, 'dd/MM/yyyy') || 'N/A' : 'N/A';
  }

  extractDOB(): void {
    let dobObs = this.encounterData?.obs?.find((obs: any) => obs.display?.includes("Date of birth"));

    if (!dobObs && this.patientData?.person?.birthdate) {
      this.birthDate = this.patientData.person.birthdate;
    } else if (dobObs) {
      this.birthDate = dobObs.display.split(": ")[1];
    } else {
      this.birthDate = null;
    }

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
    const visitUuid = this.encounterData?.visit?.uuid;
    const locationUuid = this.encounterData?.location?.uuid;
    const visitTypeUuid = this.visitType;

    if (!visitUuid || !locationUuid || !visitTypeUuid) {
      console.error("Missing required data for checkout!", { visitUuid, locationUuid, visitTypeUuid });
      return;
    }

    this.visitService.checkoutVisit(locationUuid, visitTypeUuid).subscribe(
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
          window.location.href = '/home';
        }, 2000);
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
}  