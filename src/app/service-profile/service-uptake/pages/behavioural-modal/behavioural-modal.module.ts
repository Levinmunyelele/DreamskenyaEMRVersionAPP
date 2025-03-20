import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BehaviouralModalPageRoutingModule } from './behavioural-modal-routing.module';

import { BehaviouralModalPage } from './behavioural-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BehaviouralModalPageRoutingModule
  ],
  declarations: [BehaviouralModalPage]
})
export class BehaviouralModalPageModule {}
