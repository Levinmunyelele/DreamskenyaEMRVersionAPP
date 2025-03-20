import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostViolencePageRoutingModule } from './post-violence-routing.module';

import { PostViolencePage } from './post-violence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostViolencePageRoutingModule
  ],
  declarations: [PostViolencePage]
})
export class PostViolencePageModule {}
