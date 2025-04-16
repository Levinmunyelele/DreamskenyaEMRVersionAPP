import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { BehaviouralModalPage } from '../behavioural-modal/behavioural-modal.page';
import { ActivatedRoute } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';

@Component({
  selector: 'app-behavioural',
  templateUrl: './behavioural.page.html',
  styleUrls: ['./behavioural.page.scss'],
})
export class BehaviouralPage implements OnInit {
  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  encounters: any[] = [];
  interventionDisplay = 'DREAMS Behavioural Intervention';
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
      component: BehaviouralModalPage,
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
      if (result.data?.refresh) {
        this.fetchEncounters();
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
    const patientUuid = this.activeVisit?.patient?.uuid;
    const encounterType = this.encounterType;
    console.log('pat',patientUuid)

    if (!patientUuid || !encounterType) {
      console.warn("Missing patient UUID from activeVisit or encounter type", {
        patientUuid,
        encounterType,
      });
      return;
    }

    console.log("Fetching encounters for patient UUID:", patientUuid);
    this.encounterService.getEncounters(patientUuid, encounterType).subscribe(
      (encounters) => {
        if (encounters.length > 0) {
          this.encounters = encounters.filter(encounter =>
            encounter.obs && encounter.obs.some((obs: { display: string | string[] }) => {
              if (Array.isArray(obs.display)) {
                return obs.display.some((d) => d.includes(this.interventionDisplay));
              }
              return obs.display.includes(this.interventionDisplay);
            })
          );
          

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
