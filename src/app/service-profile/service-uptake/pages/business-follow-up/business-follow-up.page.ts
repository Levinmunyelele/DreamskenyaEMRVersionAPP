import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BusinessFollowUpComponent } from '../../modals/business-follow-up/business-follow-up.component';

@Component({
  selector: 'app-business-follow-up',
  templateUrl: './business-follow-up.page.html',
  styleUrls: ['./business-follow-up.page.scss'],
})
export class BusinessFollowUpPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: BusinessFollowUpComponent,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }

}