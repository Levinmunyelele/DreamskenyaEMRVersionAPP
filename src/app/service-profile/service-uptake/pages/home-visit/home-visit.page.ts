import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HomeVisitComponent } from 'src/app/service-profile/service-uptake/modals/home-visit/home-visit.component';
import { ActivatedRoute } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';


@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.page.html',
  styleUrls: ['./home-visit.page.scss'],
})
export class HomeVisitPage implements OnInit {
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  encounters: any[] = [];
  activeVisit: any;


  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private encounterService: EncounterService
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal(encounter?: any) { 
      const modal = await this.modalCtrl.create({
      component: HomeVisitComponent,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
      componentProps: {
        patientData: this.patientData,
        activeVisit: this.activeVisit,
        encounter: encounter,
        encounterType: this.encounterType,
        obsData: encounter?.obs || {},  
        form: this.form,
        visitType: this.activeVisit?.visitType,
        location: this.activeVisit?.location,
        patientUuid: this.patientData?.uuid || this.activeVisit?.patient?.uuid
      }
    
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Response from modal:', result.data);
        if (result.data.refresh) {
          this.fetchEncounters();
        } else {
          this.updateEncounterDetails(result.data);
        }
      }
    });

    await modal.present();
  }


  updateEncounterDetails(response: any) {
    this.encounterData = response;
  }



  getInterventionDate(encounter: any): string {
    return encounter.encounterDatetime ? encounter.encounterDatetime : 'No Date Available';
  }


  fetchEncounters() {
    if (!this.patientData?.uuid || !this.encounterType) {
      console.warn("Missing patient UUID or encounter type");
      return;
    }

    this.encounterService.getEncounters(this.patientData.uuid, this.encounterType).subscribe(
      (encounters) => {
        if (encounters.length > 0) {
          this.encounters = encounters;
          console.log("Fetched Encounters:", this.encounters);
        } else {
          console.log("No encounters found for this patient.");
          this.encounters = [];
        }
      },
      (error) => {
        console.error("Error fetching encounters:", error);
      }
    );
  }


  ngOnInit() {
    const navState = window.history.state;
    this.activeVisit = navState.activeVisit;
    this.encounterType = navState.encounterType;
    this.form = navState.form
    this.patientData = navState.patientData,


    console.log("Active Visit:", this.activeVisit);
    console.log("Patient UUID from Active Visit:", this.activeVisit?.patient?.uuid);
    console.log("Encounter Type:", this.encounterType);
    console.log('patient data', this.patientData)

    this.fetchEncounters();
  }
}
