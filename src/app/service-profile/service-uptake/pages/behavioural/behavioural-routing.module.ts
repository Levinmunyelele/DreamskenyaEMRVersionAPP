import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BehaviouralPage } from './behavioural.page';

const routes: Routes = [
  {
    path: '',
    component: BehaviouralPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BehaviouralPageRoutingModule {}
