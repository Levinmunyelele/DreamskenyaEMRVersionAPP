import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { BiomedicalModalPageRoutingModule } from './biomedical-modal-routing.module';

import { BiomedicalModalPage } from './biomedical-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,     
    IonicModule,
    BiomedicalModalPageRoutingModule
  ],
  declarations: [BiomedicalModalPage]
})
export class BiomedicalModalPageModule {}
