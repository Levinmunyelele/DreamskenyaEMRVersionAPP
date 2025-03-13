import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostViolenceModalPageRoutingModule } from './post-violence-modal-routing.module';

import { PostViolenceModalPage } from './post-violence-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostViolenceModalPageRoutingModule
  ],
  declarations: [PostViolenceModalPage]
})
export class PostViolenceModalPageModule {}
