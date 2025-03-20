import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StiScreeningPageRoutingModule } from './sti-screening-routing.module';

import { StiScreeningPage } from './sti-screening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StiScreeningPageRoutingModule
  ],
  declarations: [StiScreeningPage]
})
export class StiScreeningPageModule {}
