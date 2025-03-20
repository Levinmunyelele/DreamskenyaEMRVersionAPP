import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 

import { IonicModule } from '@ionic/angular';

import { SocialProtectionModalPageRoutingModule } from './social-protection-modal-routing.module';
import { SocialProtectionModalPage } from './social-protection-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SocialProtectionModalPageRoutingModule
  ],
  declarations: [SocialProtectionModalPage]
})
export class SocialProtectionModalPageModule {}
