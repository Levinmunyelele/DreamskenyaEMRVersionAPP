import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PostViolenceModalPage } from '../post-violence-modal/post-violence-modal.page';

@Component({
  selector: 'app-post-violence',
  templateUrl: './post-violence.page.html',
  styleUrls: ['./post-violence.page.scss'],
})
export class PostViolencePage implements OnInit {

  constructor(private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }
  goBack() {
    this.navCtrl.back();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PostViolenceModalPage,
      cssClass: 'popup-modal', 
      backdropDismiss: true, 
    });
  
    return await modal.present();
  }

  ngOnInit() {
  }

}

