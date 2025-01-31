import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleManagementPageRoutingModule } from './role-management-routing.module';

import { RoleManagementPage } from './role-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleManagementPageRoutingModule
  ],
  declarations: [RoleManagementPage]
})
export class RoleManagementPageModule {}
