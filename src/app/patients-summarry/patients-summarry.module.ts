import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientsSummarryPageRoutingModule } from './patients-summarry-routing.module';

import { PatientsSummarryPage } from './patients-summarry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientsSummarryPageRoutingModule
  ],
  declarations: [PatientsSummarryPage]
})
export class PatientsSummarryPageModule {}
