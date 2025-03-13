import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BehaviouralModalPage } from '../behavioural-modal/behavioural-modal.page';


@Component({
  selector: 'app-behavioural',
  templateUrl: './behavioural.page.html',
  styleUrls: ['./behavioural.page.scss'],
})
export class BehaviouralPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: BehaviouralModalPage,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }

}
