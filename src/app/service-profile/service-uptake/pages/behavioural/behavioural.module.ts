import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BehaviouralPageRoutingModule } from './behavioural-routing.module';

import { BehaviouralPage } from './behavioural.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BehaviouralPageRoutingModule
  ],
  declarations: [BehaviouralPage]
})
export class BehaviouralPageModule {}
