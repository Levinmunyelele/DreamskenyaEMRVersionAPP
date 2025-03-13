import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientsPageRoutingModule } from './patients-routing.module';

import { PatientsPage } from './patients.page';
import { PatientsSummaryComponent } from '../components/patients-summary/patients-summary.component';
import { VitalsComponent } from '../components/vitals/vitals.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientsPageRoutingModule
  ],
  declarations: [
    PatientsPage,
    PatientsSummaryComponent,
    VitalsComponent ],

    exports: [
      PatientsSummaryComponent ,
      VitalsComponent
    ]
})
export class PatientsPageModule {}
