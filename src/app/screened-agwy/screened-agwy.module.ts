import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenedAGWYPageRoutingModule } from './screened-agwy-routing.module';

import { ScreenedAGWYPage } from './screened-agwy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenedAGWYPageRoutingModule
  ],
  declarations: [ScreenedAGWYPage]
})
export class ScreenedAGWYPageModule {}
