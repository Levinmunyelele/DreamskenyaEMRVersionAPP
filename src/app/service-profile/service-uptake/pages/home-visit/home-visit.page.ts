import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { HomeVisitComponent } from 'src/app/service-profile/service-uptake/modals/home-visit/home-visit.component';


@Component({
  selector: 'app-home-visit',
  templateUrl: './home-visit.page.html',
  styleUrls: ['./home-visit.page.scss'],
})
export class HomeVisitPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HomeVisitComponent,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }

}