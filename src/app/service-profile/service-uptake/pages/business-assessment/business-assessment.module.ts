import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessAssessmentPageRoutingModule } from './business-assessment-routing.module';

import { BusinessAssessmentPage } from './business-assessment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessAssessmentPageRoutingModule
  ],
  declarations: [BusinessAssessmentPage]
})
export class BusinessAssessmentPageModule {}
