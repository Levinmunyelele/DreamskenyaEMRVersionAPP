import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ServiceUptakePageRoutingModule } from './service-uptake-routing.module';

import { ServiceUptakePage } from './service-uptake.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ServiceUptakePageRoutingModule
  ],
  declarations: [ServiceUptakePage]
})
export class ServiceUptakePageModule {}
