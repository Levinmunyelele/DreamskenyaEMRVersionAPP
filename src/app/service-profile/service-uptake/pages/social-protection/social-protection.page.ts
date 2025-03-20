import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { OtherModalPage } from '../other-modal/other-modal.page';
@Component({
  selector: 'app-social-protection',
  templateUrl: './social-protection.page.html',
  styleUrls: ['./social-protection.page.scss'],
})
export class SocialProtectionPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: OtherModalPage,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }

  ngOnInit() {
  }

}

