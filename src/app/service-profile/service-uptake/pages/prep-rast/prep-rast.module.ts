import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrepRastPageRoutingModule } from './prep-rast-routing.module';

import { PrepRastPage } from './prep-rast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrepRastPageRoutingModule
  ],
  declarations: [PrepRastPage]
})
export class PrepRastPageModule {}
