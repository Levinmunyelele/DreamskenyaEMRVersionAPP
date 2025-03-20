import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentFormPageRoutingModule } from './enrollment-form-routing.module';

import { EnrollmentFormPage } from './enrollment-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnrollmentFormPageRoutingModule
  ],
  declarations: [EnrollmentFormPage]
})
export class EnrollmentFormPageModule {}
