import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AgywGraduationComponent } from '../../modals/agyw-graduation/agyw-graduation.component';


@Component({
  selector: 'app-agyw-graduation',
  templateUrl: './agyw-graduation.page.html',
  styleUrls: ['./agyw-graduation.page.scss'],
})
export class AgywGraduationPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AgywGraduationComponent,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }
}
