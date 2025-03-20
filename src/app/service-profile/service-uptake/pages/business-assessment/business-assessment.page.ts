import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BusinessAssessmentComponent } from '../../modals/business-assessment/business-assessment.component';

@Component({
  selector: 'app-business-assessment',
  templateUrl: './business-assessment.page.html',
  styleUrls: ['./business-assessment.page.scss'],
})
export class BusinessAssessmentPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: BusinessAssessmentComponent,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }

}