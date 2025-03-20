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

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private encounterService: EncounterService

  ) { }

  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: BehaviouralModalPage,
      cssClass: 'popup-modal',
      backdropDismiss: true,
      componentProps: {
        patientData: this.patientData,
        enrollmentData: this.enrollmentData,
        encounterData: this.encounterData,
        visitType: this.visitType,
        encounterType: this.encounterType,
        form: this.form
      }
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Response from modal:', result.data);
        this.updateEncounterDetails(result.data);
      }
    });
  
    await modal.present();
  }
  
  updateEncounterDetails(response: any) {
    this.encounterData = response;
  }
  
  getIntervention(obs: any[]): string {
    const intervention = obs.find(o => o.display.includes('DREAMS Behavioural Intervention'));
    return intervention ? intervention.display : 'No Behavioural Intervention';
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
          this.encounters = encounters;
          console.log("Fetched Encounters:", this.encounters);
        } else {
          console.log("No encounters found for this patient.");
        }
      },
      (error) => {
        console.error("Error fetching encounters:", error);
      }
    );
  }
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.patientData = JSON.parse(params['data']);
      }
      if (params['enrollmentData']) {
        this.enrollmentData = JSON.parse(params['enrollmentData']);
      }
      if (params['encounterData']) {
        this.encounterData = JSON.parse(params['encounterData']);
      }
      if (params['visit']) {
        this.visitType = params['visit'];
      }
      if (params['encounterType']) {
        this.encounterType = params['encounterType'];
      }
      if (params['form']) {
        this.form = params['form'];
      }
      console.log("Received Data in Behavioural Page:", {
        patientData: this.patientData,
        enrollmentData: this.enrollmentData,
        encounterData: this.encounterData,
        visitType: this.visitType,
        encounterType: this.encounterType,
        form: this.form
      });
    });

    this.fetchEncounters();

  }
}
