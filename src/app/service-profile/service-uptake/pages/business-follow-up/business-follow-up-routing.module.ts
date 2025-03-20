import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessFollowUpPage } from './business-follow-up.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessFollowUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessFollowUpPageRoutingModule {}
