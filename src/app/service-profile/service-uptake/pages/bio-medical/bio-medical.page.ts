import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BiomedicalModalPage } from '../biomedical-modal/biomedical-modal.page';

@Component({
  selector: 'app-bio-medical',
  templateUrl: './bio-medical.page.html',
  styleUrls: ['./bio-medical.page.scss'],
})
export class BioMedicalPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
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
  }

}

