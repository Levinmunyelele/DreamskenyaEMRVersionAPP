import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BioMedicalPageRoutingModule } from './bio-medical-routing.module';

import { BioMedicalPage } from './bio-medical.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BioMedicalPageRoutingModule
  ],
  declarations: [BioMedicalPage]
})
export class BioMedicalPageModule {}
