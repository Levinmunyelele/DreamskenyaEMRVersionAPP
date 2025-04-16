import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomyPageRoutingModule } from './homy-routing.module';

import { HomyPage } from './homy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomyPageRoutingModule
  ],
  declarations: [HomyPage]
})
export class HomyPageModule {}
