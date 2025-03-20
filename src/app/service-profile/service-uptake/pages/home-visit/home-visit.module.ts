import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeVisitPageRoutingModule } from './home-visit-routing.module';

import { HomeVisitPage } from './home-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeVisitPageRoutingModule
  ],
  declarations: [HomeVisitPage]
})
export class HomeVisitPageModule {}
