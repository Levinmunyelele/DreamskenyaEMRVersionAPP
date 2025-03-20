import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PrepRastComponent } from '../../modals/prep-rast/prep-rast.component';


@Component({
  selector: 'app-prep-rast',
  templateUrl: './prep-rast.page.html',
  styleUrls: ['./prep-rast.page.scss'],
})
export class PrepRastPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PrepRastComponent ,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }

}