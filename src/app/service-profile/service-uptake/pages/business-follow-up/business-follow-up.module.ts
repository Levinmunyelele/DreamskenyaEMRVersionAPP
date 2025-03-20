import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessFollowUpPageRoutingModule } from './business-follow-up-routing.module';

import { BusinessFollowUpPage } from './business-follow-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessFollowUpPageRoutingModule
  ],
  declarations: [BusinessFollowUpPage]
})
export class BusinessFollowUpPageModule {}
