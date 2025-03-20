import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViolenceScreeningPageRoutingModule } from './violence-screening-routing.module';

import { ViolenceScreeningPage } from './violence-screening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViolenceScreeningPageRoutingModule
  ],
  declarations: [ViolenceScreeningPage]
})
export class ViolenceScreeningPageModule {}
