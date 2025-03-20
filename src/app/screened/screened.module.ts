import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScreenedPageRoutingModule } from './screened-routing.module';

import { ScreenedPage } from './screened.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScreenedPageRoutingModule
  ],
  declarations: [ScreenedPage]
})
export class ScreenedPageModule {}
