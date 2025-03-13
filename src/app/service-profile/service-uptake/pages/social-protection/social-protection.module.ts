import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialProtectionPageRoutingModule } from './social-protection-routing.module';

import { SocialProtectionPage } from './social-protection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialProtectionPageRoutingModule
  ],
  declarations: [SocialProtectionPage]
})
export class SocialProtectionPageModule {}
