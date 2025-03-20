import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreeningPageRoutingModule } from './screening-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { ScreeningPage } from './screening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ScreeningPageRoutingModule
  ],
  declarations: [ScreeningPage]
})
export class ScreeningPageModule {}
