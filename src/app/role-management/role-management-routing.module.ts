import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoleManagementPage } from './role-management.page';

const routes: Routes = [
  {
    path: '',
    component: RoleManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleManagementPageRoutingModule {}
