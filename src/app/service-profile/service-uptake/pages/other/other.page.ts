import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OtherModalPage } from '../other-modal/other-modal.page';
import { ActivatedRoute } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-other',
  templateUrl: './other.page.html',
  styleUrls: ['./other.page.scss'],
})
export class OtherPage implements OnInit {
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  encounters: any[] = [];
  interventionDisplay = 'DREAMS Other Intervention';
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
      component: OtherModalPage,
      cssClass: 'popup-modal',
      backdropDismiss: true,
      componentProps: {
        patientData: this.patientData,
        activeVisit: this.activeVisit,
        encounter: encounter,
        encounterType: this.encounterType,
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

  getIntervention(obs: any[]): string {
    const intervention = obs.find(o => o.display.includes(this.interventionDisplay));
    if (intervention) {
      const parts = intervention.display.split(':');
      if (parts.length > 1) {
        return parts.slice(1).join(':').trim();
      } else {
        return 'No intervention details found';
      }
    } else {
      return `No ${this.interventionDisplay}`;
    }
  }

  getInterventionDate(obs: any[]): string {
    const interventionDate = obs.find(o => o.display.includes('DREAMS Intervention Date'));
    return interventionDate ? interventionDate.obsDatetime : 'No Date Available';
  }

  fetchEncounters() {
    if (!this.patientData?.uuid || !this.encounterType) {
      console.warn("Missing patient UUID or encounter type");
      return;
    }

    this.encounterService.getEncounters(this.patientData.uuid, this.encounterType).subscribe(
      (encounters) => {
        if (encounters.length > 0) {
          this.encounters = encounters.filter(encounter => {
            return encounter.obs && encounter.obs.some((obs: { display: string | string[]; }) => obs.display.includes(this.interventionDisplay));
          });

          console.log("Fetched and Filtered Encounters:", this.encounters);
        } else {
          this.encounters = [];
          console.log("No encounters found for this patient.");
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
