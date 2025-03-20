import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StiScreeningComponent } from '../../modals/sti-screening/sti-screening.component';


@Component({
  selector: 'app-sti-screening',
  templateUrl: './sti-screening.page.html',
  styleUrls: ['./sti-screening.page.scss'],
})
export class StiScreeningPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: StiScreeningComponent ,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }

}
