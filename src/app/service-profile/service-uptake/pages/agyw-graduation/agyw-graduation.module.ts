import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgywGraduationPageRoutingModule } from './agyw-graduation-routing.module';

import { AgywGraduationPage } from './agyw-graduation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgywGraduationPageRoutingModule
  ],
  declarations: [AgywGraduationPage]
})
export class AgywGraduationPageModule {}
