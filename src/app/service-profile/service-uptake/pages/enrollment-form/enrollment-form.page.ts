import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { EnrollmentFormComponent } from 'src/app/service-profile/service-uptake/modals/enrollment-form/enrollment-form.component';

@Component({
  selector: 'app-enrollment-form',
  templateUrl: './enrollment-form.page.html',
  styleUrls: ['./enrollment-form.page.scss'],
})
export class EnrollmentFormPage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EnrollmentFormComponent,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }
  
  ngOnInit() {
  }

}


