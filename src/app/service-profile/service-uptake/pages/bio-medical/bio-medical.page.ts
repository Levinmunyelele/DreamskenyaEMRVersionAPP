import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BiomedicalModalPage } from '../biomedical-modal/biomedical-modal.page';
import { ActivatedRoute } from '@angular/router';
import { EncounterService } from 'src/app/services/encounter.service';



@Component({
  selector: 'app-bio-medical',
  templateUrl: './bio-medical.page.html',
  styleUrls: ['./bio-medical.page.scss'],
})
export class BioMedicalPage implements OnInit {

  patientData: any;
  enrollmentData: any;
  encounterData: any;
  visitType: any;
  encounterType: string = "";
  form: string = "";
  encounters: any[] = [];


  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private encounterService: EncounterService


  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: BiomedicalModalPage,
      cssClass: 'popup-modal',
      backdropDismiss: true,
    });

    return await modal.present();
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
  }
}

