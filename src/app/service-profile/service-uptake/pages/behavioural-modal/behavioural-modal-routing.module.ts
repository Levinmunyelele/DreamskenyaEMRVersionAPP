import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BehaviouralModalPage } from './behavioural-modal.page';

const routes: Routes = [
  {
    path: '',
    component: BehaviouralModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BehaviouralModalPageRoutingModule {}
