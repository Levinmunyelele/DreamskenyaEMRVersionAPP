import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HtsEligibilityPageRoutingModule } from './hts-eligibility-routing.module';

import { HtsEligibilityPage } from './hts-eligibility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HtsEligibilityPageRoutingModule
  ],
  declarations: [HtsEligibilityPage]
})
export class HtsEligibilityPageModule {}
