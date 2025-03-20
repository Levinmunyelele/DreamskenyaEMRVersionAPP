import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { OtherModalPageRoutingModule } from './other-modal-routing.module';
import { OtherModalPage } from './other-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    IonicModule,
    OtherModalPageRoutingModule
  ],
  declarations: [OtherModalPage]
})
export class OtherModalPageModule {}
